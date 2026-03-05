import { useCallback, useEffect, useState } from "react";
import { API_BASE } from "../utility/config";

export type ShowStatus = "Ongoing" | "Cancelled" | "Sold out";

export type ShowRow = {
  id: string;
  title: string;
  performer_name: string;
  place_name: string;
  room: string;
  status: ShowStatus;
  basePrice: number;
};

const statusFromApi = (x: any): ShowStatus => {
  if (x === 0 || x === "0") return "Ongoing";
  if (x === 1 || x === "1") return "Cancelled";
  if (x === 2 || x === "2") return "Sold out";
  return "Ongoing";
};

export function useShows() {
  const [shows, setShows] = useState<ShowRow[]>([]);
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
      const list = Array.isArray(raw) ? raw : raw.shows ?? raw.data ?? raw.concerts ?? [];

      setShows(
        list.map((s: any) => {
          const performer = s.performer ?? s.performer_data;
          const place = s.place ?? s.venue;
          const room = s.room;

          return {
            id: String(s.id ?? ""),
            title: String(s.title ?? s.name ?? ""),
            performer_name: String(s.performer_name ?? s.performerName ?? performer?.name ?? ""),
            place_name: String(s.place_name ?? s.placeName ?? place?.name ?? ""),
            room: String(s.room_name ?? s.roomName ?? room?.name ?? room?.id ?? s.room ?? ""),
            status: statusFromApi(s.status),
            basePrice: Number(s.basePrice ?? s.base_price ?? s.price ?? 0),
          };
        })
      );
    } catch (e) {
      console.error(e);
      setError("Nem sikerült betölteni az előadásokat.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { shows, loading, error, reload: load };
}
