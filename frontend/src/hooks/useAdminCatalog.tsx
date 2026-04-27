import { useCallback, useEffect, useState } from "react";
import { API_BASE } from "../utility/config";

const API = `${API_BASE}/api/admin`;

function authHeaders(): HeadersInit {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function parseJson(res: Response) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return text;
  }
}

async function ensureOk(res: Response, fallback: string) {
  if (res.ok) return;
  const body = await parseJson(res);
  const msg =
    body?.message ||
    body?.error ||
    (typeof body === "string" ? body : "") ||
    fallback;
  throw new Error(msg);
}

export type PlaceRow = { id: number; name: string; city: string; address: string };
export type RoomRow = { id: number; place_id: number; serial_number: number; total_rows: number; total_columns: number };
export type PerformerRow = { id: number; name: string; genre?: number | null; description?: string; country?: string };
export type GenreRow = { id: number; name: string };
export type ConcertRow = {
  id: number;
  name: string;
  performer_id: number;
  performer_name?: string;
  genre_id?: number | null;
  genre_name?: string;
  room_id: number;
  serial_number?: string;
  place_id?: number;
  place_name?: string;
  date: string;
  base_price: number;
  description?: string;
  picture?: string;
};

export type NewPlace = Omit<PlaceRow, "id">;
export type NewRoom = Omit<RoomRow, "id">;
export type NewPerformer = { name: string; genre: number | ""; description?: string; country: string; id?: string };
export type NewGenre = Omit<GenreRow, "id">;
export type NewConcert = Omit<ConcertRow, "id">;

const mapPlace = (p: any): PlaceRow => ({
  id: Number(p.id),
  name: String(p.name ?? ""),
  city: String(p.city ?? ""),
  address: String(p.address ?? ""),
});

const mapRoom = (r: any): RoomRow => ({
  id: Number(r.id),
  place_id: Number(r.place_id),
  serial_number: Number(r.serial_number),
  total_rows: Number(r.total_rows),
  total_columns: Number(r.total_columns),
});

const mapPerformer = (p: any): PerformerRow => ({
  id: Number(p.id),
  name: String(p.name ?? p.performer_name ?? ""),
  genre: p.genre == null ? null : Number(p.genre),
  description: String(p.description ?? ""),
  country: String(p.country ?? ""),
});

const mapGenre = (g: any): GenreRow => ({
  id: Number(g.id),
  name: String(g.name ?? ""),
});

const mapConcert = (c: any): ConcertRow => ({
  id: Number(c.id),
  name: String(c.name ?? ""),
  performer_id: Number(c.performer_id),
  performer_name: c.performer_name ?? undefined,
  genre_id: c.genre_id == null ? null : Number(c.genre_id),
  genre_name: c.genre_name ?? undefined,
  room_id: Number(c.room_id),
  serial_number: c.room_serial_number ?? c.serial_number ?? undefined,
  place_id: c.place_id == null ? undefined : Number(c.place_id),
  place_name: c.place_name ?? undefined,
  date: String(c.date ?? ""),
  base_price: Number(c.base_price),
  description: String(c.description ?? ""),
  picture: String(c.picture ?? ""),
});

function useCrudList<T>(endpoint: string, mapFn: (item: any) => T) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API}/${endpoint}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          ...authHeaders(),
        },
      });

      await ensureOk(res, `Nem sikerült betölteni: ${endpoint}`);
      const data = await res.json();
      const list = Array.isArray(data) ? data : (data.data ?? []);
      setItems(list.map((item: any) => mapFn(item)));
    } catch (e: any) {
      console.error(e);
      setError(e?.message ?? "Ismeretlen hiba");
    } finally {
      setLoading(false);
    }
  }, [endpoint]); 

  useEffect(() => {
    load();
  }, [load]);

  const createItem = useCallback(
    async (payload: any) => {
      const isFormData = typeof FormData !== "undefined" && payload instanceof FormData;

      const res = await fetch(`${API}/${endpoint}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          ...authHeaders(),
          ...(isFormData ? {} : { "Content-Type": "application/json" }),
        },
        body: isFormData ? payload : JSON.stringify(payload),
      });

      await ensureOk(res, `Nem sikerült létrehozni: ${endpoint}`);
      const body = await res.json().catch(() => null);
      await load();
      return body;
    },
    [endpoint, load]
  );

  const deleteItem = useCallback(
    async (id: number) => {
      const res = await fetch(`${API}/${endpoint}/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          ...authHeaders(),
        },
      });

      const body = await parseJson(res);
      if (!res.ok) {
        const msg =
          body?.message ||
          body?.error ||
          (typeof body === "string" ? body : "") ||
          `Nem sikerült törölni: ${endpoint}`;
        throw new Error(msg);
      }
      await load();
      return body;
    },
    [endpoint, load]
  );

  return { items, loading, error, reload: load, createItem, deleteItem };
}

export function useAdminPlaces() {
  return useCrudList<PlaceRow>("places", mapPlace);
}
export function useAdminRooms() {
  return useCrudList<RoomRow>("rooms", mapRoom);
}
export function useAdminPerformers() {
  return useCrudList<PerformerRow>("performers", mapPerformer);
}
export function useAdminGenres() {
  return useCrudList<GenreRow>("genres", mapGenre);
}
export function useAdminConcerts() {
  return useCrudList<ConcertRow>("concerts", mapConcert);
}