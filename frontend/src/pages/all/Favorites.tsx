import { ConcertCard } from "../../components/ConcertCard";
import { useConcerts } from "../../hooks/useConcerts";

export function Favorites() {
  const { concerts, loading, error } = useConcerts();
  const featured = concerts[0];

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
          className="thumb concertThumb"
          style={{
            backgroundImage: featured.picture
              ? `url(${featured.picture})`
              : "none",
          }}
        />
              <p>{featured.name}</p>
      <p>{featured.place_name}</p>

      <p>{featured.date}</p>
      <p>Alapár: {featured.base_price} Ft</p>
      <p>{featured.description} </p>
      </div>

    </section>
  );
}
