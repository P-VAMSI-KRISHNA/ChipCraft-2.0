import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { socket } from "@/lib/socket";
import { API_BASE } from "@/lib/api";
import type { RoundNumber } from "@/types/hackathon";

type MarksMap = Record<string, Partial<Record<RoundNumber, number>>>;

interface MarksContextValue {
  marksMap: MarksMap;
  setMark: (teamId: string, round: RoundNumber, score: number | null) => void;
  getTotal: (teamId: string) => number;
}

const MarksContext = createContext<MarksContextValue | undefined>(undefined);

export function MarksProvider({ children }: { children: ReactNode }) {
  const [marksMap, setMarksMap] = useState<MarksMap>({});

  const fetchMarks = useCallback(() => {
    fetch(`${API_BASE}/api/marks`)
      .then(res => res.json())
      .then(data => {
        const newMap: MarksMap = {};
        for (const row of data) {
          if (!newMap[row.teamId]) newMap[row.teamId] = {};
          newMap[row.teamId][row.round as RoundNumber] = row.score;
        }
        setMarksMap(newMap);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetchMarks();

    socket.on("marks-updated", fetchMarks);
    return () => {
      socket.off("marks-updated", fetchMarks);
    };
  }, [fetchMarks]);

  const setMark = async (teamId: string, round: RoundNumber, score: number | null) => {
    try {
      await fetch(`${API_BASE}/api/marks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamId, round, score })
      });
      fetchMarks();
    } catch (err) { console.error(err); }
  };

  const getTotal = (teamId: string) => {
    const scores = marksMap[teamId] ?? {};
    return Object.values(scores).reduce<number>((sum, v) => sum + (v ?? 0), 0);
  };

  return (
    <MarksContext.Provider value={{ marksMap, setMark, getTotal }}>
      {children}
    </MarksContext.Provider>
  );
}

export function useMarksContext() {
  const ctx = useContext(MarksContext);
  if (!ctx) throw new Error("useMarksContext must be used within MarksProvider");
  return ctx;
}
