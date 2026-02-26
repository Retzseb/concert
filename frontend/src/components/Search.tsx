import { useEffect, useState } from "react";

export type SearchFilters = {
  q: string;
  date: string;
  placeId: string;
  genreId: string;
};

export function Search(props: { onSearch: (f: SearchFilters) => void }) {
  const PLACES_API = "http://localhost:8000/api/place/all";
  const GENRES_API = "http://localhost:8000/api/genre/all";

  const [places, setPlaces] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([]);

  const [q, setQ] = useState("");
  const [date, setDate] = useState("");
  const [placeId, setPlaceId] = useState("");
  const [genreId, setGenreId] = useState("");

  useEffect(() => {
    async function loadPlaces() {
      try {
        const res = await fetch(PLACES_API, {
          headers: { Accept: "application/json" },
        });
        const data = await res.json();
        setPlaces(data);
      } catch {
        console.log("Nem sikerült betölteni a helyszíneket");
      }
    }
    loadPlaces();
  }, []);

  useEffect(() => {
    async function loadGenres() {
      try {
        const res = await fetch(GENRES_API, {
          headers: { Accept: "application/json" },
        });
        const data = await res.json();
        setGenres(data);
        console.log("GENRES[0] =", data?.[0]);
      } catch {
        console.log("Nem sikerült betölteni a műfajokat");
      }
    }
    loadGenres();
  }, []);

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
    <div className="searchPanel" aria-label="Kereső">
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
            <option key={p.id} value={String(p.id)}>
              {p.name} ({p.city})
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
            <option key={g.id} value={String(g.name)}>
              {g.name}
            </option>
          ))}
        </select>
      </div>
<div>
      <button className="searchBtn" type="button" onClick={doSearch}>
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
    </div>
  );
}
