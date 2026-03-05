import { useCallback, useEffect, useState } from "react";
import { API_BASE } from "../utility/config";

const API = `${API_BASE}/api/genre`;

export type Genre = {
  id: number;
  name: string;
};

export function useGenres() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API}/all`, {
        method: "GET",
        credentials: "include",
        headers: { Accept: "application/json" },
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      const list = Array.isArray(data) ? data : (data.data ?? []);
      setGenres(list.map((g: any) => ({ id: Number(g.id), name: String(g.name ?? g.genre_name ?? "") })));
    } catch (e) {
      console.error(e);
      setError("Nem sikerült betölteni a műfajokat.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return { genres, loading, error, reload: load };
}