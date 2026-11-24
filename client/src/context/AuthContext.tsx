import { useEffect, useState, type ReactNode } from "react";
import axios from "axios";
import { AuthContext } from "./authContext";
import {
  getCurrentUser,
  loginUser,
  registerUser,
  type AuthUser,
} from "../api/auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [sessionError, setSessionError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const handleUnauthorized = () => {
      localStorage.removeItem("auth_token");
      setUser(null);
      setSessionError(null);
    };

    window.addEventListener("auth:unauthorized", handleUnauthorized);

    async function restoreSession() {
      if (!localStorage.getItem("auth_token")) {
        setLoading(false);
        return;
      }

      try {
        const currentUser = await getCurrentUser();
        if (active) setUser(currentUser);
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          localStorage.removeItem("auth_token");
          if (active) setUser(null);
        } else if (active) {
          const responseMessage = axios.isAxiosError(error)
            ? error.response?.data
            : null;
          setSessionError(
            typeof responseMessage === "string"
              ? responseMessage
              : "Unable to restore your session. Check your connection and try again.",
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void restoreSession();

    return () => {
      active = false;
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
    };
  }, []);

  async function login(email: string, password: string) {
    const result = await loginUser({ email, password });
    localStorage.setItem("auth_token", result.token);
    setSessionError(null);
    setUser(result.user);
  }

  async function register(name: string, email: string, password: string) {
    await registerUser({ name, email, password });
  }

  function logout() {
    localStorage.removeItem("auth_token");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, sessionError, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
