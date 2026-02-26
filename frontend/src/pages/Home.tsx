import { useState } from "react";
import { Search, SearchFilters } from "../components/Search";
import { Concerts } from "../components/Concert";
import { ConcertCard } from "../components/ConcertCard";
import { Footer } from "../components/Footer";

export function Home() {
  const [filters, setFilters] = useState<SearchFilters>({
    q: "",
    date: "",
    placeId: "",
    genreId: "",
  });
  return (
    <>
      <div className="heroCard">
        <Search onSearch={setFilters} />
      </div>

      <Concerts>
        {({ concerts, loading, error }) => {
          if (loading) return <p>Betöltés…</p>;
          if (error) return <p>{error}</p>;

          const filtered = concerts.filter((c: any) => {
            const q = filters.q.trim().toLowerCase();
            const date = filters.date.trim();
            const genre = filters.genreId.toLowerCase();

            return (
              (!q || String(c?.name ?? "").toLowerCase() .includes(q) || String(c?.performer_name ?? "") .toLowerCase() .includes(q)) &&
              (!date || String(c?.date ?? "").startsWith(date)) &&
              (!filters.placeId || String(c?.place_id ?? "") === filters.placeId) &&
              (!filters.genreId || String(c?.genre_name ?? "").toLowerCase() === genre)
            );
          });

          return (
            <div className="cards">
              {filtered.map((c: any) => (
                <ConcertCard key={c.id} concert={c} />
              ))}
            </div>
          );
        }}
      </Concerts>
      <Footer />
    </>
  );
}
