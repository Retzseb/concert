import { Link } from "react-router-dom";
import { useConcerts } from "../../hooks/useConcerts";

export function ConcertPage() {
  const { concerts, loading, error, reload } = useConcerts();

  return (
    <section className="section">
      <div className="">
        <div className="sectionHead">
          <h2>Összes koncert</h2>
          <button className="btn" onClick={reload}>
            Frissítés
          </button>
        </div>

        {loading && <p>Betöltés…</p>}
        {error && <p>{error}</p>}

        {!loading && !error && (
          <ul className="c_list">
            {concerts.map((c: any) => (
              <li className="c_element" key={c.id}>
                <div className="c_element_thumb">
                  <Link className="btn" to={`/concerts/${c.id}`}>Tovább</Link>
                </div>
                <div className="c_element_data">
                  <h3 className="cardTitle">{c.name}</h3>
                  <ul>
                    <li>Előadó: {c.performer_name}</li>
                    <li>Időpont: {c.date} </li>
                    <li>Ár: {c.base_price} forinttól</li>
                    <li>Helyszín: {c.place_name}</li>
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
