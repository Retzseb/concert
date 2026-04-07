import { useEffect, useMemo, useState } from "react";
import { ConcertCard } from "./ConcertCard";

type Props = {
  items: any[];        
  windowSize: number;  
};

export function ConcertSlider({ items, windowSize }: Props) {
  const [start, setStart] = useState(0);

  useEffect(() => {
    setStart(0);
  }, [items.length, windowSize]);

  const maxStart = Math.max(0, items.length - windowSize);
  const canSlide = items.length > windowSize;

  const prev = () => {
    if (!canSlide) return;
    setStart((s) => (s <= 0 ? maxStart : s - 1));
  };

  const next = () => {
    if (!canSlide) return;
    setStart((s) => (s >= maxStart ? 0 : s + 1));
  };

  const visible = useMemo(
    () => items.slice(start, start + windowSize),
    [items, start, windowSize]
  );

  return (
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
  );
}