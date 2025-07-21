import { createClient } from "@libsql/client";

if (!import.meta.env.VITE_TURSO_DB_URL) {
  throw new Error("VITE_TURSO_DB_URL is not defined");
}

if (!import.meta.env.VITE_TURSO_DB_AUTH_TOKEN) {
  throw new Error("VITE_TURSO_DB_AUTH_TOKEN is not defined");
}

export const db = createClient({
  url: import.meta.env.VITE_TURSO_DB_URL,
  authToken: import.meta.env.VITE_TURSO_DB_AUTH_TOKEN,
});

// Helper function to parse JSON fields
export const parseJsonField = <T = unknown>(field: string | null): T[] => {
  if (!field) return [];
  try {
    return JSON.parse(field) as T[];
  } catch {
    return [];
  }
};

// Helper function to stringify JSON fields
export const stringifyJsonField = <T = unknown>(field: T[]): string => {
  return JSON.stringify(field);
};

// Error handler wrapper
export const dbErrorHandler = (error: unknown, operation: string): never => {
  console.error(`Database ${operation} error:`, error);
  throw new Error(`Database operation failed: ${operation}`);
};
