import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface AuthContextValue {
  isAdmin: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const ADMIN_STORAGE_KEY = "chipcraft_admin";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(ADMIN_STORAGE_KEY) === "true";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isAdmin) {
      window.localStorage.setItem(ADMIN_STORAGE_KEY, "true");
    } else {
      window.localStorage.removeItem(ADMIN_STORAGE_KEY);
    }
  }, [isAdmin]);

  const login = (username: string, password: string) => {
    // NOTE: Frontend-only auth for hackathon use. Replace with real backend in production.
    const ok = username === "admin" && password === "chipcraft24";
    if (ok) {
      setIsAdmin(true);
    }
    return ok;
  };

  const logout = () => {
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}

export function RequireAdmin({ children }: { children: ReactNode }) {
  const { isAdmin } = useAuth();
  const location = useLocation();

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}

