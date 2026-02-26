import React, { ReactNode, useCallback, useEffect, useState } from "react";

const API = "http://localhost:8000/api/concerts/all";

type Props = {
  children: (args: {
    concerts: any[];
    loading: boolean;
    error: string;
    reload: () => void;
  }) => ReactNode;
};

export function Concerts({ children }: Props) {
  const [concerts, setConcerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
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
      setConcerts(data);
    } catch {
      setError("Nem sikerült betölteni a koncerteket.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let alive = true;

    (async () => {
      if (!alive) return;
      await load();
    })();

    return () => {
      alive = false;
    };
  }, [load]);

  return <>{children({ concerts, loading, error, reload: load })}</>;
}