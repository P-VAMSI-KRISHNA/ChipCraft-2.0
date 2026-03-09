import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { socket } from "@/lib/socket";
import { API_BASE } from "@/lib/api";

interface FunZoneContextValue {
  funZoneEnabled: boolean;
  setFunZoneEnabled: (enabled: boolean) => void;
}

const FunZoneContext = createContext<FunZoneContextValue | undefined>(undefined);

export function FunZoneProvider({ children }: { children: ReactNode }) {
  const [funZoneEnabled, setFunZoneEnabled] = useState(false);

  const fetchFunZone = useCallback(() => {
    fetch(`${API_BASE}/api/state/funzone`)
      .then(res => res.json())
      .then(data => setFunZoneEnabled(data.enabled))
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetchFunZone();

    socket.on("funzone-updated", fetchFunZone);
    return () => {
      socket.off("funzone-updated", fetchFunZone);
    };
  }, [fetchFunZone]);

  const handleSetFunZoneEnabled = async (enabled: boolean) => {
    try {
      await fetch(`${API_BASE}/api/state/funzone`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled })
      });
      fetchFunZone();
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
