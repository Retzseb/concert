import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { API_BASE } from "../utility/config";

const API = `${API_BASE}/api`;

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

type AuthState = {
  user: any | null;
  authChecked: boolean;
  refresh: () => Promise<any | null>;
  login: (email: string, password: string) => Promise<any>;
  register: (payload: RegisterPayload) => Promise<any>;
  logout: () => Promise<void>;
};

const AuthCtx = createContext<AuthState | null>(null);

async function extractErrorMessage(res: Response): Promise<string> {
  try {
    const data = await res.json();

    const firstField = data?.errors ? Object.keys(data.errors)[0] : null;
    const firstErr = firstField ? data.errors[firstField]?.[0] : null;

    return (
      firstErr ||
      data?.message ||
      data?.error ||
      `HTTP ${res.status}`
    );
  } catch {
    return `HTTP ${res.status}`;
  }
}

export function AuthProvider(props: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  const refresh = useCallback(async (): Promise<any | null> => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setAuthChecked(true);
      return null;
    }

    try {
      const res = await fetch(`${API}/me`, {
        method: "GET",
        headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const message = await extractErrorMessage(res);

        if (res.status === 401 || res.status === 403 || res.status === 419) {
          localStorage.removeItem("token");
          setUser(null);
        }

        throw new Error(message);
      }

      const me = await res.json();
      setUser(me);
      return me;
    } catch (e) {
      console.error(e);
      return null;
    } finally {
      setAuthChecked(true);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error(await extractErrorMessage(res));

      const data = await res.json();
      if (data?.access_token) localStorage.setItem("token", data.access_token);

      const me = await refresh();
      if (!me) throw new Error("Nem sikerült betölteni a felhasználót belépés után.");

      return me;
    },
    [refresh]
  );

  const register = useCallback(
    async (payload: RegisterPayload) => {
      const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(await extractErrorMessage(res));

      const data = await res.json();
      if (data?.access_token) localStorage.setItem("token", data.access_token);

      const me = await refresh();
      if (!me) throw new Error("Nem sikerült betölteni a felhasználót regisztráció után.");

      return me;
    },
    [refresh]
  );

  const logout = useCallback(async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        await fetch(`${API}/logout`, {
          method: "POST",
          headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        });
      }
    } finally {
      localStorage.removeItem("token");
      setUser(null);
      setAuthChecked(true);
    }
  }, []);

  return <AuthCtx.Provider value={{ user, authChecked, refresh, login, register, logout }}>{props.children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
