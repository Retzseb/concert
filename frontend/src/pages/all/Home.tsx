import { useEffect, useMemo, useState } from "react";
import { Search, SearchFilters } from "../../components/Search";
import { ConcertCard } from "../../components/ConcertCard";
import { Footer } from "../../components/Footer";
import { useConcerts } from "../../hooks/useConcerts";
import { usePlaces } from "../../hooks/usePlaces";
import { useGenres } from "../../hooks/useGenres";
import { Concert } from "../../types";

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

  const filtered = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    const date = filters.date.trim();

    return concerts.filter((concert) => {
      const name = String(concert.name ?? "").toLowerCase();
      const performer = String(concert.performer_name ?? "").toLowerCase();
      const placeOk = !filters.placeId || String(concert.place_id ?? "") === filters.placeId;
      const genreOk = !filters.genreId || String(concert.genre_id ?? "") === filters.genreId;
      const qOk = !q || name.includes(q) || performer.includes(q);
      const dateOk = !date || String(concert.date ?? "").startsWith(date);

      return placeOk && genreOk && qOk && dateOk;
    });
  }, [concerts, filters]);

  useEffect(() => {
    setStart(0);
  }, [filters]);


  const featuredConcert = useMemo(() => {
    if (concerts.length === 0) return null;
    return concerts[0] ?? null;
  }, [concerts]);

  const maxStart = Math.max(0, filtered.length - WINDOW);
  const canSlide = filtered.length > WINDOW;
  const visibleConcerts = canSlide ? filtered.slice(start, start + WINDOW) : filtered;

  const prev = () => {
    if (!canSlide) return;
    setStart((value) => (value <= 0 ? maxStart : value - 1));
  };

  const next = () => {
    if (!canSlide) return;
    setStart((value) => (value >= maxStart ? 0 : value + 1));
  };

  if (loading) return <p>Betöltés…</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="heroCard">
        <Search concerts={concerts} places={places} genres={genres} onSearch={setFilters} />
      </div>

      {filtered.length > 0 ? (
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
              {visibleConcerts.map((concert: Concert) => (
                <ConcertCard key={concert.id} concert={concert} />
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
      ) : (
        <p className="emptyState">Nincs találat a megadott szűrésre.</p>
      )}

      <Footer />
    </>
  );
}
