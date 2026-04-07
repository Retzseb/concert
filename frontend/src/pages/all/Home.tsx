import { useEffect, useMemo, useState } from "react";
import { Search, SearchFilters } from "../../components/Search";
import { Footer } from "../../components/Footer";
import { useConcerts } from "../../hooks/useConcerts";
import { usePlaces } from "../../hooks/usePlaces";
import { useGenres } from "../../hooks/useGenres";
import { ConcertSlider } from "../../components/ConcertSlider";

function getWindowSize() {
  const w = window.innerWidth;
  if (w <= 520) return 1;     // mobil
  if (w <= 980) return 2;     // tablet
  if (w <= 1280) return 3;    // laptop
  return 4;                   // PC
}

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

  const [windowSize, setWindowSize] = useState<number>(() => getWindowSize());

  useEffect(() => {
    const onResize = () => setWindowSize(getWindowSize());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const q = filters.q.trim().toLowerCase();
  const date = filters.date.trim();

  const filtered = useMemo(() => {
    return concerts.filter((c: any) => {
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
  }, [concerts, filters.placeId, filters.genreId, q, date]);

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

      {filtered.length === 0 ? (
        <div className="noResults">Nincs a keresésnek megfelelő találat!</div>
      ) : (
        <>
          <div className="sliderLabel">Koncertek</div>

          <ConcertSlider
            items={filtered}
            windowSize={windowSize}
          />
        </>
      )}

      <Footer />
    </>
  );
}