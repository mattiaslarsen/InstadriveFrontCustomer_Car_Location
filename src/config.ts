// src/config.ts
export const API_BASE_URL = import.meta.env.MODE === 'production'
  ? import.meta.env.VITE_BACKEND_URL_PROD 
  : import.meta.env.VITE_BACKEND_URL_DEV;