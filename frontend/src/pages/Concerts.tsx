import { Concerts } from "../components/Concert";

export function ConcertPage() {
  return (
    <Concerts>
      {({ concerts, loading, error, reload }) => (
        <section className="section">
          <div className="container">
            <div className="sectionHead">
              <h2>Összes koncert</h2>
              <button className="btn" onClick={reload}>Frissítés</button>
            </div>

            {loading && <p>Betöltés…</p>}
            {error && <p>{error}</p>}

            {!loading && !error && (
              <ul>
                {concerts.map((c) => (
                  <li key={c.id}>
                    {c.name} – {c.date} – {c.base_price} Ft
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}
    </Concerts>
  );
}