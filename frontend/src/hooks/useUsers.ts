import { useCallback, useEffect, useState } from "react";
import { API_BASE } from "../utility/config";

const API = `${API_BASE}/api/users`;

export type Role = "Admin" | "Jegykezelő" | "Felhasználó";

export type UserRow = {
  id: number;
  email: string;
  name: string;
  role: Role;
};

export type NewUserInput = Omit<UserRow, "id"> & {
  password: string;
};

const roleFromApi = (r: unknown): Role => {
  if (r === 0 || r === "0") return "Admin";
  if (r === 1 || r === "1") return "Jegykezelő";
  if (r === 2 || r === "2") return "Felhasználó";
  return "Felhasználó";
};

const roleToApi = (role: Role): number => {
  if (role === "Admin") return 0;
  if (role === "Jegykezelő") return 1;
  return 2;
};

function authHeaders(): HeadersInit {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function useUsers() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API}/all`, {
        method: "GET",
        headers: { Accept: "application/json", ...authHeaders() },
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      const list = Array.isArray(data) ? data : data.users ?? data.data ?? [];
      setUsers(
        list.map((u: any) => ({
          id: Number(u.id),
          username: u.username ?? u.name ?? "",
          email: u.email ?? "",
          name: u.name ?? u.username ?? "",
          role: roleFromApi(u.role),
        }))
      );
    } catch (err) {
      console.error(err);
      setError("Nem sikerült betölteni a felhasználókat.");
    } finally {
      setLoading(false);
    }
  }, []);

  const addUser = useCallback(
    async (user: NewUserInput) => {
      const res = await fetch(`${API}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...authHeaders(),
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          password: user.password,
          role: roleToApi(user.role),
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Hiba a felhasználó létrehozásakor.");
      }
      await load();
    },
    [load]
  );

  const updateRole = useCallback(
    async (id: number, role: Role) => {
      const res = await fetch(`${API}/${id}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...authHeaders(),
        },
        body: JSON.stringify({ role: roleToApi(role) }),
      });

      if (!res.ok) throw new Error("Hiba a szerepkör módosításakor.");
      await load();
    },
    [load]
  );

  const removeUser = useCallback(
    async (id: number) => {
      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: { Accept: "application/json", ...authHeaders() },
      });

      if (!res.ok) throw new Error("Hiba a törléskor.");
      await load();
    },
    [load]
  );

  useEffect(() => {
    load();
  }, [load]);

  return { users, loading, error, reload: load, addUser, updateRole, removeUser };
}
