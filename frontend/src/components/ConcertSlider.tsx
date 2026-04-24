import { useEffect, useMemo, useState } from "react";
import { Concert } from "../types";
import { ConcertCard } from "./ConcertCard";

type Props = {
  items: Concert[];
  windowSize: number;
  label?: string;
};

export function ConcertSlider({ items, windowSize, label = "Koncertek" }: Props) {
  const [start, setStart] = useState(0);

  useEffect(() => {
    setStart(0);
  }, [items.length, windowSize]);

  const WINDOW = Math.max(1, windowSize);
  const maxStart = Math.max(0, items.length - WINDOW);
  const canSlide = items.length > WINDOW;

  const visible = useMemo(() => {
    return canSlide ? items.slice(start, start + WINDOW) : items;
  }, [items, start, WINDOW, canSlide]);

  const prev = () => {
    if (!canSlide) return;
    setStart((s) => (s <= 0 ? maxStart : s - 1));
  };

  const next = () => {
    if (!canSlide) return;
    setStart((s) => (s >= maxStart ? 0 : s + 1));
  };

  if (items.length === 0) return null;

  return (
    <>
      <div className="sliderLabel">{label}</div>

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
          {visible.map((c) => (
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
  );
}