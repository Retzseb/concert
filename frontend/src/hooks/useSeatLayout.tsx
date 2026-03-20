import { useCallback, useEffect, useState } from "react";
import { API_BASE } from "../utility/config";

export type MultiplierKey = "M1" | "M2" | "M3" ;

export type SeatLayout = {
  multipliers: Record<MultiplierKey, number>;
  seatMap: Record<string, MultiplierKey>;
};

const DEFAULT_LAYOUT: SeatLayout = {
  multipliers: { M1: 0.8, M2: 1, M3: 1.3 },
  seatMap: {},
};

function seatId(r: number, c: number) {
  return `R${r}C${c}`;
}

export function useSeatLayout(roomId: number | "") {
  const [layout, setLayout] = useState<SeatLayout>(DEFAULT_LAYOUT);
  const [seatIds, setSeatIds] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [originalSeatMap, setOriginalSeatMap] = useState<
    Record<string, MultiplierKey>
  >({});

  const token = localStorage.getItem("token");

  const load = useCallback(async () => {
    const wantedRoomId = Number(roomId);

    if (!wantedRoomId) {
      setLayout(DEFAULT_LAYOUT);
      setSeatIds({});
      setError("");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const seatsRes = await fetch(`${API_BASE}/api/seats`, {
        headers: {
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (!seatsRes.ok) {
        throw new Error(`Seat load failed: ${seatsRes.status}`);
      }

      const seats = await seatsRes.json();

      const seatMap: Record<string, MultiplierKey> = {};
      const ids: Record<string, number> = {};

      for (const s of seats) {
        if (Number(s.room_id) !== wantedRoomId) continue;

        const key = seatId(Number(s.row_number), Number(s.column_number));
        ids[key] = Number(s.id);

        const mult = Number(s.price_multiplier);
        if (mult < 1) seatMap[key] = "M1";
        else if (mult > 1) seatMap[key] = "M3";
        else seatMap[key] = "M2";
      }

      setSeatIds(ids);
      setOriginalSeatMap(seatMap);
      setLayout({ ...DEFAULT_LAYOUT, seatMap });
    } catch (e) {
      console.error(e);
      setError("Seatmap betöltése nem sikerült.");
      setSeatIds({});
      setOriginalSeatMap({});
      setLayout(DEFAULT_LAYOUT);
    } finally {
      setLoading(false);
    }
  }, [roomId, token]);

  const save = useCallback(async () => {
    const changedEntries = Object.entries(layout.seatMap).filter(
      ([pos, multKey]) => originalSeatMap[pos] !== multKey,
    );

    if (changedEntries.length === 0) {
      return;
    }
    try {
      setError("");

      if (Object.keys(seatIds).length === 0) {
        throw new Error("Nincsenek betöltött székazonosítók.");
      }

      const requests = changedEntries.map(async ([pos, multKey]) => {
        const id = seatIds[pos];
        if (!id) return;

        const multiplier = layout.multipliers[multKey];

        const res = await fetch(`${API_BASE}/api/seats/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({
            price_multiplier: multiplier,
          }),
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Seat save failed (${res.status}): ${text}`);
        }
      });

      await Promise.all(requests);
      setOriginalSeatMap(layout.seatMap);
    } catch (e) {
      console.error(e);
      setError("Mentés nem sikerült.");
      throw e;
    }
  }, [layout, originalSeatMap, seatIds, token]);

  useEffect(() => {
    load();
  }, [load]);

  return { layout, setLayout, loading, error, save, seatIds };
}
