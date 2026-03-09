import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
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

  const fetchTeams = useCallback(() => {
    fetch(`${API_BASE}/api/teams`)
      .then(res => res.json())
      .then(data => setTeams(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetchTeams();

    socket.on("team-added", fetchTeams);
    socket.on("team-updated", fetchTeams);
    socket.on("team-deleted", fetchTeams);

    return () => {
      socket.off("team-added", fetchTeams);
      socket.off("team-updated", fetchTeams);
      socket.off("team-deleted", fetchTeams);
    };
  }, [fetchTeams]);

  const addTeam = async (team: Omit<Team, "id">) => {
    const tempId = `t${Date.now()}`;
    const newTeam = { ...team, id: tempId };
    try {
      await fetch(`${API_BASE}/api/teams`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTeam)
      });
      fetchTeams();
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
      fetchTeams();
    } catch (err) { console.error(err); }
  };

  const deleteTeam = async (id: string) => {
    try {
      await fetch(`${API_BASE}/api/teams/${id}`, { method: "DELETE" });
      fetchTeams();
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
