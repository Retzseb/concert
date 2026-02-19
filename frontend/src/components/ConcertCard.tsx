export function ConcertCard({ concert }: { concert: any }) {
  return (
    <article className="card">
      <div className="thumb" />
      <div className="cardBody">
        <h3 className="cardTitle">{concert.name}</h3>
        <p className="meta">
          {concert.date} <br />
          Alapár: {concert.base_price} Ft
        </p>
      </div>
    </article>
  );
}