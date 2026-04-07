import { useCallback, useEffect, useState } from "react";
import { API_BASE } from "../utility/config";

export type Concert = {
  id: number;
  name: string;
  picture?: string;

  date?: string;
  base_price?: number;
  status?: number;
  soft_delete?: boolean;
  description?: string;

  performer_id?: number;
  performer_name?: string;
  performer_description?: string;

  place_id?: number;
  place_name?: string;
  place_city?: string;

  genre_id?: number;
  genre_name?: string;

  room_id?: number;
  serial_number?: string | number;
  room_total_rows?: number;
  room_total_columns?: number;
};

function num(x: any): number | undefined {
  const n = Number(x);
  return Number.isFinite(n) ? n : undefined;
}

function str(x: any): string | undefined {
  if (x === null || x === undefined) return undefined;
  const s = String(x);
  return s.length ? s : undefined;
}

function mapConcert(c: any): Concert {
  const performer = c.performer ?? c.performer_data ?? undefined;
  const place = c.place ?? c.venue ?? undefined;
  const genre = c.genre ?? undefined;
  const room = c.room ?? undefined;

  return {
    id: Number(c.id),
    name: String(c.name ?? c.title ?? ""),
    picture: str(c.picture ?? c.pict ?? c.kep),

    date: str(c.date ?? c.datetime),
    base_price: num(c.base_price ?? c.basePrice),
    status: num(c.status ?? c.state),
    soft_delete: Boolean(c.soft_delete ?? false),
    description: str(c.description ?? c.description),

    performer_id: num(c.performer_id ?? c.performerId ?? performer?.id),
    performer_name: str(c.performer_name ?? c.performerName ?? performer?.name),
    performer_description: str(c.performer_description ?? c.performerDescripion ?? performer?.description),

    place_id: num(c.place_id ?? c.placeId ?? place?.id),
    place_name: str(c.place_name ?? c.placeName ?? place?.name),
    place_city: str(c.place_city ?? c.placeCity ?? place?.city),

    genre_id: num(c.genre_id ?? c.genreId ?? genre?.id),
    genre_name: str(c.genre_name ?? c.genreName ?? genre?.name),

    room_id: num(c.room_id ?? c.roomId ?? room?.id),
    serial_number: str(c.serial_number ?? c.roomName ?? room?.name ?? room?.id),
    room_total_rows: num(
      c.room_total_rows ??
        c.roomTotalRows ??
        room?.total_rows ??
        room?.totalRows ??
        c.total_rows ??
        c.totalRows
    ),
    room_total_columns: num(
      c.room_total_columns ??
        c.roomTotalColumns ??
        room?.total_columns ??
        room?.totalColumns ??
        c.total_columns ??
        c.totalColumns
    ),
  };
}

export function useConcerts() {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API_BASE}/api/concerts/all`, {
        method: "GET",
        credentials: "include",
        headers: { Accept: "application/json" },
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const raw = await res.json();
      const list = Array.isArray(raw) ? raw : raw.data ?? raw.concerts ?? raw.shows ?? [];
      setConcerts(list.map(mapConcert));
    } catch (err) {
      console.error(err);
      setError("Nem sikerült betölteni a koncerteket.");
    } finally {
      setLoading(false);
    }

  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { concerts, loading, error, reload: load };
}
