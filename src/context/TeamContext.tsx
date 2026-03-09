import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { socket } from "@/lib/socket";
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
    fetch("http://localhost:3001/api/teams")
      .then(res => res.json())
      .then(data => setTeams(data))
      .catch(console.error);

    const onAdd = (team: Team) => setTeams(prev => [...prev, team]);
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
    setTeams(prev => [...prev, newTeam]);
    try {
      await fetch("http://localhost:3001/api/teams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTeam)
      });
    } catch (err) { console.error(err); }
  };

  const updateTeam = async (id: string, updates: Partial<Omit<Team, "id">>) => {
    setTeams(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    try {
      const existingRes = await fetch("http://localhost:3001/api/teams");
      const currentTeams = await existingRes.json();
      const existing = currentTeams.find((t: Team) => t.id === id) || teams.find(t => t.id === id);
      if (!existing) return;
      const updated = { ...existing, ...updates };

      await fetch(`http://localhost:3001/api/teams/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
      });
    } catch (err) { console.error(err); }
  };

  const deleteTeam = async (id: string) => {
    setTeams(prev => prev.filter(t => t.id !== id));
    try {
      await fetch(`http://localhost:3001/api/teams/${id}`, {
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
