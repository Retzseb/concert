import React from "react";

export type ConcertStatus = 0 | 1 | 2;

export type Concert = {
  id: number;
  name: string;
  performer_id: number;
  room_id: number;
  date: string; 
  base_price: number;
  description: string;
  status: ConcertStatus;
  created_at: string;
  updated_at: string;
};

const API_BASE = "http://localhost:8000/api";

export function Concerts(props: {
  children: (args: {
    concerts: Concert[];
    loading: boolean;
    error: string;
  }) => React.ReactNode;
}) {
  const [concerts, setConcerts] = React.useState<Concert[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(`${API_BASE}/concerts`, {
          method: "GET",
          credentials: "include",
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as Concert[];
        if (alive) setConcerts(data);
      } catch {
        if (alive) setError("Nem sikerült betölteni a koncerteket.");
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  return <>{props.children({ concerts, loading, error })}</>;
}
