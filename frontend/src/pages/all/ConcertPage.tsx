import { Link } from "react-router-dom";
import { useConcerts } from "../../hooks/useConcerts";
import { formatDate } from "../../utility/date";

export function ConcertPage() {
  const { concerts, loading, error, reload } = useConcerts();

  return (
    <section className="section">
      <div className="sectionHead">
          <h2>Összes koncert</h2>
          <button className="btn" onClick={reload}>
            Frissítés
          </button>
        {loading && <p>Betöltés…</p>}
        {error && <p>{error}</p>}
      </div>
        {!loading && !error && (
          <ul className="c_list">
            {concerts.map((c: any) => (
              <li className="c_element" key={c.id}>
                <div
                  className="c_element_thumb"
                  style={{ backgroundImage: c.picture ? `url(${c.picture})` : undefined }}
                >
                  <Link className="btn" to={`/concerts/${c.id}`}>Tovább</Link>
                </div>
                <div className="c_element_data">
                  <h3 className="cardTitle">{c.name}</h3>
                  <ul>
                    <li>Előadó: {c.performer_name}</li>
                    <li>Időpont: {formatDate(c.date)} </li>
                    <li>Ár: {c.base_price} forinttól</li>
                    <li>Helyszín: {c.place_name}</li>
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        )}
    </section>
  );
}
