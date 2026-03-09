import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { socket } from "@/lib/socket";
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
    fetch("http://localhost:3001/api/problems")
      .then(res => res.json())
      .then(data => setProblemStatements(data))
      .catch(console.error);

    const onAdd = (ps: ProblemStatement) => setProblemStatements(prev => [...prev, ps]);
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
    setProblemStatements(prev => [...prev, newPs]);
    try {
      await fetch("http://localhost:3001/api/problems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPs)
      });
    } catch (err) { console.error(err); }
  };

  const updateProblem = async (id: string, updates: Partial<Omit<ProblemStatement, "id">>) => {
    setProblemStatements(prev => prev.map(ps => ps.id === id ? { ...ps, ...updates } : ps));
    try {
      const existingRes = await fetch("http://localhost:3001/api/problems");
      const currentPs = await existingRes.json();
      const existing = currentPs.find((p: ProblemStatement) => p.id === id) || problemStatements.find(p => p.id === id);
      if (!existing) return;
      const updated = { ...existing, ...updates };

      await fetch(`http://localhost:3001/api/problems/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
      });
    } catch (err) { console.error(err); }
  };

  const deleteProblem = async (id: string) => {
    setProblemStatements(prev => prev.filter(ps => ps.id !== id));
    try {
      await fetch(`http://localhost:3001/api/problems/${id}`, {
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
