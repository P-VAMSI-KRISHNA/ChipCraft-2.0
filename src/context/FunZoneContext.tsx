import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { socket } from "@/lib/socket";

interface FunZoneContextValue {
  funZoneEnabled: boolean;
  setFunZoneEnabled: (enabled: boolean) => void;
}

const FunZoneContext = createContext<FunZoneContextValue | undefined>(undefined);

export function FunZoneProvider({ children }: { children: ReactNode }) {
  const [funZoneEnabled, setFunZoneEnabled] = useState(false);

  useEffect(() => {
    // Fetch initial state
    fetch("http://localhost:3001/api/state/funzone")
      .then(res => res.json())
      .then(data => setFunZoneEnabled(data.enabled))
      .catch(console.error);

    // Listen for real-time changes
    const handler = (data: { enabled: boolean }) => setFunZoneEnabled(data.enabled);
    socket.on("funzone-updated", handler);

    return () => {
      socket.off("funzone-updated", handler);
    };
  }, []);

  const handleSetFunZoneEnabled = async (enabled: boolean) => {
    // Optimistic local update
    setFunZoneEnabled(enabled);
    try {
      await fetch("http://localhost:3001/api/state/funzone", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled })
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FunZoneContext.Provider value={{ funZoneEnabled, setFunZoneEnabled: handleSetFunZoneEnabled }}>
      {children}
    </FunZoneContext.Provider>
  );
}

export function useFunZone() {
  const ctx = useContext(FunZoneContext);
  if (!ctx) throw new Error("useFunZone must be used within FunZoneProvider");
  return ctx;
}
