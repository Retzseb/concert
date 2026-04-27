import { useMemo } from "react";
import { useConcerts } from "../../hooks/useConcerts";
import { formatDate } from "../../utility/date";
import { toAbsoluteUrl } from "../../utility/picsMedia";

export function Favorites() {
  const { concerts, loading, error } = useConcerts();
  const featured = concerts?.[0];

  const pictureUrl = useMemo(
    () => toAbsoluteUrl(featured?.picture),
    [featured?.picture]
  );

  if (loading) return <p>Betöltés…</p>;
  if (error) return <p>{error}</p>;
  if (!featured) return <p>Nincs megjeleníthető kedvenc.</p>;

  return (
    <section className="section">
      <div className="sectionHead">
        <h2>Válogatásunkban kiemelt előadó és koncert.</h2>
      </div>

      <div className="featuredCopy">
        <h3>{featured.performer_name || featured.name}</h3>
        <p>{featured.performer_description}</p>

        <div
          className="thumb favoriteThumb"
          style={{
            backgroundImage: pictureUrl ? `url(${pictureUrl})` : "none",
          }}
        />

        <h3>{featured.name}</h3>
        <p>{featured.description}</p>
        <p>Helyszín: {featured.place_name}</p>
        <p>Időpont: {formatDate(featured.date)}</p>
        <p>Alapár: {featured.base_price} Ft</p>
        
      </div>
    </section>
  );
}