import { Link } from "react-router-dom";

export function ConcertCard({ concert }: { concert: any }) {
  return (
    <Link
      to={`/concerts/${concert.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <article className="card" role="button">
        <div
          className="thumb"
          style={{
            backgroundImage: concert.picture ? `url(${concert.picture})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: 180,
          }}
        />
        <div className="cardBody">
          <h3 className="cardTitle">{concert.name}</h3>
          <p className="meta">
            {concert.date} <br />
            Alapár: {concert.base_price} Ft
          </p>
        </div>
      </article>
    </Link>
  );
}
