import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { socket } from "@/lib/socket";
import { API_BASE } from "@/lib/api";
import type { Team } from "@/types/hackathon";

interface TeamContextValue {
  teams: Team[];
  addTeam: (team: Omit<Team, "id">) => void;
  updateTeam: (id: string, updates: Partial<Omit<Team, "id">>) => void;
  deleteTeam: (id: string) => void;
}

const TeamContext = createContext<TeamContextValue | undefined>(undefined);

export function TeamProvider({ children }: { children: ReactNode }) {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/teams`)
      .then(res => res.json())
      .then(data => setTeams(data))
      .catch(console.error);

    const onAdd = (team: Team) => setTeams(prev => {
      if (prev.some(t => t.id === team.id)) return prev;
      return [...prev, team];
    });
    const onUpdate = (team: Team) => setTeams(prev => prev.map(t => (t.id === team.id ? team : t)));
    const onDelete = ({ id }: { id: string }) => setTeams(prev => prev.filter(t => t.id !== id));

    socket.on("team-added", onAdd);
    socket.on("team-updated", onUpdate);
    socket.on("team-deleted", onDelete);

    return () => {
      socket.off("team-added", onAdd);
      socket.off("team-updated", onUpdate);
      socket.off("team-deleted", onDelete);
    };
  }, []);

  const addTeam = async (team: Omit<Team, "id">) => {
    const tempId = `t${Date.now()}`;
    const newTeam = { ...team, id: tempId };
    try {
      await fetch(`${API_BASE}/api/teams`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTeam)
      });
    } catch (err) { console.error(err); }
  };

  const updateTeam = async (id: string, updates: Partial<Omit<Team, "id">>) => {
    try {
      const existing = teams.find(t => t.id === id);
      if (!existing) return;
      const updated = { ...existing, ...updates };

      await fetch(`${API_BASE}/api/teams/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
      });
    } catch (err) { console.error(err); }
  };

  const deleteTeam = async (id: string) => {
    try {
      await fetch(`${API_BASE}/api/teams/${id}`, {
        method: "DELETE"
      });
    } catch (err) { console.error(err); }
  };

  return (
    <TeamContext.Provider value={{ teams, addTeam, updateTeam, deleteTeam }}>
      {children}
    </TeamContext.Provider>
  );
}

export function useTeamContext() {
  const ctx = useContext(TeamContext);
  if (!ctx) throw new Error("useTeamContext must be used within TeamProvider");
  return ctx;
}
