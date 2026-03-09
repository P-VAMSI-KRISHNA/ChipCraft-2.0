import { createContext, useContext, useState, useEffect, ReactNode } from "react";
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

  useEffect(() => {
    fetch(`${API_BASE}/api/problems`)
      .then(res => res.json())
      .then(data => setProblemStatements(data))
      .catch(console.error);

    const onAdd = (ps: ProblemStatement) => setProblemStatements(prev => {
      if (prev.some(p => p.id === ps.id)) return prev;
      return [...prev, ps];
    });
    const onUpdate = (ps: ProblemStatement) => setProblemStatements(prev => prev.map(p => (p.id === ps.id ? ps : p)));
    const onDelete = ({ id }: { id: string }) => setProblemStatements(prev => prev.filter(p => p.id !== id));

    socket.on("problem-added", onAdd);
    socket.on("problem-updated", onUpdate);
    socket.on("problem-deleted", onDelete);

    return () => {
      socket.off("problem-added", onAdd);
      socket.off("problem-updated", onUpdate);
      socket.off("problem-deleted", onDelete);
    };
  }, []);

  const addProblem = async (ps: Omit<ProblemStatement, "id">) => {
    const tempId = `ps${Date.now()}`;
    const newPs = { ...ps, id: tempId };
    try {
      await fetch(`${API_BASE}/api/problems`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPs)
      });
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
    } catch (err) { console.error(err); }
  };

  const deleteProblem = async (id: string) => {
    try {
      await fetch(`${API_BASE}/api/problems/${id}`, {
        method: "DELETE"
      });
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
