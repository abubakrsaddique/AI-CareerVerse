// src/lib/api.ts

// import axios from "axios";

// Express (Auth)
// export const authApi = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL,
// });

// FastAPI (AI)
// export const aiApi = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_AI_URL,
// });
// src/lib/api.ts
import axios from "axios";

// Base URLs (safe for Next.js)
const AUTH_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const AI_BASE_URL = process.env.NEXT_PUBLIC_AI_URL || "http://localhost:8000";

/**
 * Helper: attach token safely (client-side only)
 */
const attachToken = (config: any) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  }

  return config;
};

/**
 * AUTH API (Express backend)
 */
export const authApi = axios.create({
  baseURL: AUTH_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * AI API (FastAPI backend)
 */
export const aiApi = axios.create({
  baseURL: AI_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Interceptors (only for authApi)
 */
authApi.interceptors.request.use(attachToken);

/**
 * Optional: global error handler (clean logs)
 */
authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Auth API Error:", error?.response?.data || error.message);
    return Promise.reject(error);
  },
);

aiApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("AI API Error:", error?.response?.data || error.message);
    return Promise.reject(error);
  },
);
