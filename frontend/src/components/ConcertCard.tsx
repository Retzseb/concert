import { Link } from "react-router-dom";
import { Concert } from "../types";
import { formatDate } from "../utility/date";
import { toAbsoluteUrl } from "../utility/picsMedia";

type ConcertCardProps = {
  concert: Concert;
};

export function ConcertCard({ concert }: ConcertCardProps) {
  const pictureUrl = toAbsoluteUrl(concert.picture);

  return (
    <Link to={`/concerts/${concert.id}`} className="cardLink">
      <article className="card" role="button">
        <div
          className="thumb concertThumb"
          style={{ backgroundImage: pictureUrl ? `url(${pictureUrl})` : "none" }}
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