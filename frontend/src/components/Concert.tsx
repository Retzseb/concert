import React, { useEffect, useState } from "react";
import { ConcertCard } from "./ConcertCard";

const API = "http://localhost:8000/api/concerts";

export function Concerts(){
  const [concerts, setConcerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(API, {
          method: "GET",
          credentials: "include",
          headers: { Accept: "application/json" },
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
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

  useEffect(() => {
    setIndex((i) => Math.min(i, Math.max(0, concerts.length - 1)));
  }, [concerts.length]);

  if (loading) return <p>Betöltés…</p>;
  if (error) return <p>{error}</p>;
  if (concerts.length === 0) return <p>Nincs koncert.</p>;

  const next = () => {
    setIndex((i) => (i + 1) % concerts.length);
  };

  return (
    <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div className="cards">
          {concerts.slice(index).map((c) => (
            <ConcertCard key={c.id} concert={c} />
          ))}
        </div>
          <button className="btn" onClick={next}>
            ▶
          </button>
        </div>
    </div>
  );
}
