// Central API base URL — reads from Vite env variable, falls back to localhost for dev
export const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";
