import { db, dbErrorHandler } from "./db";

// Simple password hashing using Web Crypto API
const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

// Verify password against hash
const verifyPassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  const passwordHash = await hashPassword(password);
  return passwordHash === hash;
};

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

// Signup function
export const signup = async (
  name: string,
  email: string,
  password: string,
): Promise<User> => {
  try {
    // Hash the password
    const passwordHash = await hashPassword(password);

    // Insert user into database
    const result = await db.execute({
      sql: "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?) RETURNING id, name, email, created_at",
      args: [name, email, passwordHash],
    });

    if (result.rows.length === 0) {
      throw new Error("Failed to create user");
    }

    const user = result.rows[0] as unknown as User;
    return user;
  } catch (error: any) {
    if (error.message.includes("UNIQUE constraint failed")) {
      throw new Error("Email already exists");
    }
    return dbErrorHandler(error, "signup");
  }
};

// Login function
export const login = async (email: string, password: string): Promise<User> => {
  try {
    // Get user from database
    const result = await db.execute({
      sql: "SELECT id, name, email, password_hash, created_at FROM users WHERE email = ?",
      args: [email],
    });

    if (result.rows.length === 0) {
      throw new Error("Invalid email or password");
    }

    const user = result.rows[0] as unknown as User & { password_hash: string };

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password_hash);

    if (!isValidPassword) {
      throw new Error("Invalid email or password");
    }

    // Return user without password hash
    const { password_hash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error: any) {
    if (error.message === "Invalid email or password") {
      throw error;
    }
    return dbErrorHandler(error, "login");
  }
};

// Get user by ID
export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const result = await db.execute({
      sql: "SELECT id, name, email, created_at FROM users WHERE id = ?",
      args: [id],
    });

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0] as unknown as User;
  } catch (error) {
    return dbErrorHandler(error, "getUserById");
  }
};

// Get user by email
export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const result = await db.execute({
      sql: "SELECT id, name, email, created_at FROM users WHERE email = ?",
      args: [email],
    });

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0] as unknown as User;
  } catch (error) {
    return dbErrorHandler(error, "getUserByEmail");
  }
};
