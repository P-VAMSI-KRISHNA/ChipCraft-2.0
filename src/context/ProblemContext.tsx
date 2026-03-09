import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { socket } from "@/lib/socket";
import { API_BASE } from "@/lib/api";
import type { ProblemStatement } from "@/types/hackathon";

interface ProblemContextValue {
  problemStatements: ProblemStatement[];
  addProblem: (ps: Omit<ProblemStatement, "id">) => void;
  updateProblem: (id: string, ps: Partial<Omit<ProblemStatement, "id">>) => void;
  deleteProblem: (id: string) => void;
}

const ProblemContext = createContext<ProblemContextValue | undefined>(undefined);

export function ProblemProvider({ children }: { children: ReactNode }) {
  const [problemStatements, setProblemStatements] = useState<ProblemStatement[]>([]);

  const fetchProblems = useCallback(() => {
    fetch(`${API_BASE}/api/problems`)
      .then(res => res.json())
      .then(data => setProblemStatements(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetchProblems();

    socket.on("problem-added", fetchProblems);
    socket.on("problem-updated", fetchProblems);
    socket.on("problem-deleted", fetchProblems);

    return () => {
      socket.off("problem-added", fetchProblems);
      socket.off("problem-updated", fetchProblems);
      socket.off("problem-deleted", fetchProblems);
    };
  }, [fetchProblems]);

  const addProblem = async (ps: Omit<ProblemStatement, "id">) => {
    const tempId = `ps${Date.now()}`;
    const newPs = { ...ps, id: tempId };
    try {
      await fetch(`${API_BASE}/api/problems`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPs)
      });
      fetchProblems();
    } catch (err) { console.error(err); }
  };

  const updateProblem = async (id: string, updates: Partial<Omit<ProblemStatement, "id">>) => {
    try {
      const existing = problemStatements.find(p => p.id === id);
      if (!existing) return;
      const updated = { ...existing, ...updates };
      await fetch(`${API_BASE}/api/problems/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
      });
      fetchProblems();
    } catch (err) { console.error(err); }
  };

  const deleteProblem = async (id: string) => {
    try {
      await fetch(`${API_BASE}/api/problems/${id}`, { method: "DELETE" });
      fetchProblems();
    } catch (err) { console.error(err); }
  };

  return (
    <ProblemContext.Provider value={{ problemStatements, addProblem, updateProblem, deleteProblem }}>
      {children}
    </ProblemContext.Provider>
  );
}

export function useProblemContext() {
  const ctx = useContext(ProblemContext);
  if (!ctx) throw new Error("useProblemContext must be used within ProblemProvider");
  return ctx;
}
