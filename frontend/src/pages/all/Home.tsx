import { useState } from "react";
import { Search, SearchFilters } from "../../components/Search";
import { ConcertCard } from "../../components/ConcertCard";
import { Footer } from "../../components/Footer";
import { useConcerts } from "../../hooks/useConcerts";
import { usePlaces } from "../../hooks/usePlaces";
import { useGenres } from "../../hooks/useGenres";

export function Home() {
  const { concerts, loading, error } = useConcerts();
  const { places } = usePlaces();
  const { genres } = useGenres();

  const [filters, setFilters] = useState<SearchFilters>({
    q: "",
    date: "",
    placeId: "",
    genreId: "",
  });

  const q = filters.q.trim().toLowerCase();
  const date = filters.date.trim();

  const filtered = concerts.filter((c: any) => {
    const name = String(c?.name ?? "").toLowerCase();
    const perf = String(c?.performer_name ?? "").toLowerCase();

    const placeOk =
      !filters.placeId || String(c?.place_id ?? "") === filters.placeId;

    const genreOk =
      !filters.genreId || String(c?.genre_id ?? "") === filters.genreId;

    const qOk = !q || name.includes(q) || perf.includes(q);
    const dateOk = !date || String(c?.date ?? "").startsWith(date);

    return placeOk && genreOk && qOk && dateOk;
  });

  if (loading) return <p>Betöltés…</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="heroCard">
        <Search
          concerts={concerts}
          places={places}
          genres={genres}
          onSearch={setFilters}
        />
      </div>

      <div className="cards">
        {filtered.map((c: any) => (
          <ConcertCard key={c.id} concert={c} />
        ))}
      </div>

      <Footer />
    </>
  );
}