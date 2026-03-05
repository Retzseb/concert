import { useCallback, useEffect, useMemo, useState } from "react";

export type MultiplierKey = "M1" | "M2" | "M3";

export type SeatLayout = {
  multipliers: Record<MultiplierKey, number>;   
  seatMap: Record<string, MultiplierKey>;       
};

const DEFAULT_LAYOUT: SeatLayout = {
  multipliers: { M1: 0.8, M2: 1.0, M3: 1.3 },
  seatMap: {},
};

export function useSeatLayout(concertId: number | "") {
  const key = useMemo(
    () => (concertId === "" ? "" : `seat_layout:concert:${concertId}`),
    [concertId]
  );

  const [layout, setLayout] = useState<SeatLayout>(DEFAULT_LAYOUT);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    if (!key) return;

    try {
      setLoading(true);
      setError("");

      const raw = localStorage.getItem(key);
      if (!raw) {
        setLayout(DEFAULT_LAYOUT);
        return;
      }

      const parsed = JSON.parse(raw);
      setLayout({
        multipliers: {
          M1: Number(parsed?.multipliers?.M1 ?? DEFAULT_LAYOUT.multipliers.M1),
          M2: Number(parsed?.multipliers?.M2 ?? DEFAULT_LAYOUT.multipliers.M2),
          M3: Number(parsed?.multipliers?.M3 ?? DEFAULT_LAYOUT.multipliers.M3),
        },
        seatMap: parsed?.seatMap ?? {},
      });
    } catch (e) {
      console.error(e);
      setError("Nem sikerült betölteni az üléskiosztást (localStorage).");
      setLayout(DEFAULT_LAYOUT);
    } finally {
      setLoading(false);
    }
  }, [key]);

  const save = useCallback(async (next?: SeatLayout) => {
    if (!key) return;

    try {
      setError("");
      const toSave = next ?? layout;
      localStorage.setItem(key, JSON.stringify(toSave));
    } catch (e) {
      console.error(e);
      setError("Nem sikerült elmenteni az üléskiosztást (localStorage).");
    }
  }, [key, layout]);

  useEffect(() => {
    if (!key) return;
    load();
  }, [key, load]);

  return { layout, setLayout, loading, error, reload: load, save };
}