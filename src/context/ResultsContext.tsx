import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { socket } from "@/lib/socket";
import { API_BASE } from "@/lib/api";

// 0: Hidden, 3: 3rd place, 2: 2nd place, 1: 1st place (both winners)
export type ResultsState = 0 | 3 | 2 | 1;

export interface WinnerEntry {
  teamName: string;
  college: string;
}

export interface Winners {
  third: WinnerEntry;
  second: WinnerEntry;
  firstA: WinnerEntry;
  firstB: WinnerEntry;
}

interface ResultsContextValue {
  resultsState: ResultsState;
  winners: Winners | null;
  setResultsState: (state: ResultsState, winners?: Winners) => Promise<void>;
}

const ResultsContext = createContext<ResultsContextValue | undefined>(undefined);

export function ResultsProvider({ children }: { children: ReactNode }) {
  const [resultsState, setResultsStateLocal] = useState<ResultsState>(0);
  const [winners, setWinners] = useState<Winners | null>(null);

  const fetchResultsState = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/api/state/results-state`);
      const data = await res.json();
      setResultsStateLocal(data.state as ResultsState);
      if (data.winners) setWinners(data.winners);
    } catch (err) {
      console.error("Failed to fetch results state", err);
    }
  }, []);

  useEffect(() => {
    fetchResultsState();

    socket.on("results-state-updated", (data: { state: ResultsState; winners?: Winners }) => {
      setResultsStateLocal(data.state);
      if (data.winners) setWinners(data.winners);
    });

    return () => {
      socket.off("results-state-updated");
    };
  }, [fetchResultsState]);

  const setResultsState = async (newState: ResultsState, newWinners?: Winners) => {
    try {
      const body: Record<string, unknown> = { state: newState };
      if (newWinners) body.winners = newWinners;

      const res = await fetch(`${API_BASE}/api/state/results-state`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setResultsStateLocal(newState);
        if (newWinners) setWinners(newWinners);
      }
    } catch (err) {
      console.error("Failed to update results state", err);
    }
  };

  return (
    <ResultsContext.Provider value={{ resultsState, winners, setResultsState }}>
      {children}
    </ResultsContext.Provider>
  );
}

export function useResultsContext() {
  const context = useContext(ResultsContext);
  if (context === undefined) {
    throw new Error("useResultsContext must be used within a ResultsProvider");
  }
  return context;
}
