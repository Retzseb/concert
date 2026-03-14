import { useEffect, useMemo, useState } from "react";
import { Search, SearchFilters } from "../../components/Search";
import { ConcertCard } from "../../components/ConcertCard";
import { Footer } from "../../components/Footer";
import { useConcerts } from "../../hooks/useConcerts";
import { usePlaces } from "../../hooks/usePlaces";
import { useGenres } from "../../hooks/useGenres";

const WINDOW = 4;

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

  const [start, setStart] = useState(0);

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

  useEffect(() => {
    setStart(0);
  }, [filtered.length]);

  const maxStart = Math.max(0, filtered.length - WINDOW);
  const canSlide = filtered.length > WINDOW;

  const prev = () => {
    if (!canSlide) return;
    setStart((s) => (s <= 0 ? maxStart : s - 1));
  };

  const next = () => {
    if (!canSlide) return;
    setStart((s) => (s >= maxStart ? 0 : s + 1));
  };

  const visible = filtered.slice(start, start + WINDOW);

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

          <div className="cardsSliderWrap">
            <button
              className="cardsArrow cardsArrow--left"
              type="button"
              onClick={prev}
              disabled={!canSlide}
              aria-label="Előző"
            >
              ‹
            </button>

            <div className="cardsSlider">
              {visible.map((c: any) => (
                <ConcertCard key={c.id} concert={c} />
              ))}
            </div>

            <button
              className="cardsArrow cardsArrow--right"
              type="button"
              onClick={next}
              disabled={!canSlide}
              aria-label="Következő"
            >
              ›
            </button>
          </div>
        </>
      )}

      <Footer />
    </>
  );
}