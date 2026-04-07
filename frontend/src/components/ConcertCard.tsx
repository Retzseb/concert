import { Link } from "react-router-dom";
import { Concert } from "../types";
import { formatDate } from "../utility/date";

type ConcertCardProps = {
  concert: Concert;
};

export function ConcertCard({ concert }: ConcertCardProps) {
  return (
    <Link to={`/concerts/${concert.id}`} className="cardLink">
      <article className="card" role="button">
        <div
          className="thumb concertThumb"
          style={{ backgroundImage: concert.picture ? `url(${concert.picture})` : "none" }}
        />
        <div className="cardBody">
          <h3 className="cardTitle">{concert.name}</h3>
          <p className="meta">
            {formatDate(concert.date)} <br />
            Alapár: {concert.base_price} Ft
          </p>
        </div>
      </article>
    </Link>
  );
}
