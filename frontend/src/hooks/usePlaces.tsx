import { useCallback, useEffect, useState } from "react";
import { API_BASE } from "../utility/config";

const API = `${API_BASE}/api/place`;

export type Place = {
  id: number;
  name: string;
  city?: string;
};

export function usePlaces() {
  const [places, setPlaces] = useState<Place[]>([]);
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
      setPlaces(
        list.map((p: any) => ({
          id: Number(p.id),
          name: String(p.name ?? p.place_name ?? ""),
          city: p.city ?? p.place_city,
        }))
      );
    } catch (e) {
      console.error(e);
      setError("Nem sikerült betölteni a helyszíneket.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return { places, loading, error, reload: load };
}