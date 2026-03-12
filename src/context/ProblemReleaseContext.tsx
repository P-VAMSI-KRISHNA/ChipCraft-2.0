import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { socket } from "@/lib/socket";
import { API_BASE } from "@/lib/api";

interface ProblemReleaseContextValue {
  problemsReleased: boolean;
  setProblemsReleased: (released: boolean) => void;
}

const ProblemReleaseContext = createContext<ProblemReleaseContextValue | undefined>(undefined);

export function ProblemReleaseProvider({ children }: { children: ReactNode }) {
  const [problemsReleased, setProblemsReleased] = useState(false);

  const fetchState = useCallback(() => {
    fetch(`${API_BASE}/api/state/problems-released`)
      .then(res => res.json())
      .then(data => setProblemsReleased(data.released))
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetchState();

    socket.on("problems-released", fetchState);
    return () => {
      socket.off("problems-released", fetchState);
    };
  }, [fetchState]);

  const handleSetReleased = async (released: boolean) => {
    try {
      await fetch(`${API_BASE}/api/state/problems-released`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ released }),
      });
      fetchState();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ProblemReleaseContext.Provider value={{ problemsReleased, setProblemsReleased: handleSetReleased }}>
      {children}
    </ProblemReleaseContext.Provider>
  );
}

export function useProblemRelease() {
  const ctx = useContext(ProblemReleaseContext);
  if (!ctx) throw new Error("useProblemRelease must be used within ProblemReleaseProvider");
  return ctx;
}
