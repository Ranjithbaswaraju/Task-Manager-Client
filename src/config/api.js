// In dev, use relative URLs so Vite proxy avoids CORS (see vite.config.js)
// In production, call the deployed API directly
export const API_BASE = import.meta.env.DEV
  ? ""
  : "https://task-manager-server-1-lei1.onrender.com";
