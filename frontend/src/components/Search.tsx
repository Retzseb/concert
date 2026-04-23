import { useState } from "react";
import type { Concert } from "../hooks/useConcerts";
import { Place } from "../hooks/usePlaces";
import { Genre } from "../hooks/useGenres";

export type SearchFilters = {
  q: string;
  date: string;
  placeId: string;
  genreId: string;
};

export function Search(props: {
  concerts: Concert[];
  places: Place[];
  genres: Genre[];
  onSearch: (f: SearchFilters) => void;
}) {
  const [q, setQ] = useState("");
  const [date, setDate] = useState("");
  const [placeId, setPlaceId] = useState("");
  const [genreId, setGenreId] = useState("");

  const activeConcerts = (props.concerts ?? []).filter((concert) => {
    const status = Number(concert.status ?? 0);
    const softDeleted = Boolean(concert.soft_delete);
    const concertTime = concert.date ? new Date(concert.date).getTime() : Number.POSITIVE_INFINITY;

    return status === 0 && !softDeleted && concertTime >= Date.now();
  });

  const activePlaceIds = new Set(
    activeConcerts
      .map((concert) => concert.place_id)
      .filter((id): id is number => Number.isFinite(Number(id))),
  );

  const activeGenreIds = new Set(
    activeConcerts
      .map((concert) => concert.genre_id)
      .filter((id): id is number => Number.isFinite(Number(id))),
  );

  const places = (props.places ?? [])
    .map((p) => ({
      id: String(p.id),
      name: String(p.name ?? ""),
      city: String(p.city ?? ""),
      disabled: !activePlaceIds.has(Number(p.id)),
    }))
    .filter((p) => p.id && p.name)
    .sort((a, b) =>
      `${a.name} ${a.city}`.localeCompare(`${b.name} ${b.city}`, "hu"),
    );

  const genres = (props.genres ?? [])
    .map((g) => ({
      id: String(g.id),
      name: String(g.name ?? ""),
      disabled: !activeGenreIds.has(Number(g.id)),
    }))
    .filter((g) => g.id && g.name)
    .sort((a, b) => a.name.localeCompare(b.name, "hu"));

  function doSearch() {
    props.onSearch({ q, date, placeId, genreId });
  }

  function clearSearch() {
    setQ("");
    setDate("");
    setPlaceId("");
    setGenreId("");

    props.onSearch({
      q: "",
      date: "",
      placeId: "",
      genreId: "",
    });
  }

  return (
    <form
      className="searchPanel"
      aria-label="Kereső"
      onSubmit={(e) => {
        e.preventDefault();
        doSearch();
      }}
    >
      <div className="field">
        <div className="label">Keresés</div>
        <input
          className="input"
          placeholder="Koncert / előadó"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      <div className="field">
        <div className="label">Dátum</div>
        <input
          className="input"
          placeholder="YYYY-MM-DD"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="field">
        <div className="label">Helyszín</div>
        <select
          className="select"
          value={placeId}
          onChange={(e) => setPlaceId(e.target.value)}
        >
          <option value="">Összes</option>
          {places.map((p) => (
            <option key={p.id} value={p.id} disabled={p.disabled}>
              {p.name} ({p.city}){p.disabled ? "" : ""}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <div className="label">Műfaj</div>
        <select
          className="select"
          value={genreId}
          onChange={(e) => setGenreId(e.target.value)}
        >
          <option value="">Összes</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id} disabled={g.disabled}>
              {g.name}{g.disabled ? "" : ""}
            </option>
          ))}
        </select>
      </div>

      <div>
        <button className="searchBtn" type="submit" onClick={doSearch}>
          Keresés
        </button>
        <button
          className="searchBtn"
          type="button"
          onClick={clearSearch}
          style={{ marginLeft: 8 }}
        >
          Törlés
        </button>
      </div>
    </form>
  );
}
