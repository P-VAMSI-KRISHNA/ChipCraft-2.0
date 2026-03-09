// Central API base URL — reads from Vite env variable, falls back to deployed Render backend
export const API_BASE = import.meta.env.VITE_API_URL || "https://chipcraft-2-0.onrender.com";
