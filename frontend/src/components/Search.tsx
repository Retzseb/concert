import { useEffect, useState } from "react";

export function Search() {
  const PLACES_API = "http://localhost:8000/api/placeList";
  const GENRES_API = "http://localhost:8000/api/genreList"
  const [places, setPlaces] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([]);

  useEffect(() => {
    async function loadPlaces() {
      try {
        const res = await fetch(PLACES_API);
        const data = await res.json();
        setPlaces(data);
      } catch {
        console.log("Nem sikerült betölteni");
      }
    }

    loadPlaces();
  }, 
  []);

    useEffect(() => {
    async function loadGenres() {
      try {
        const res = await fetch(GENRES_API);
        const data = await res.json();
        setGenres(data);
      } catch {
        console.log("Nem sikerült betölteni");
      }
    }

    loadGenres();
  }, 
  []);

  return (
        <div className="searchPanel" aria-label="Kereső (placeholder)">

          <div className="field">
            <div className="label">Keresés</div>
            <input className="input" placeholder="Koncert / előadó" />
          </div>

          <div className="field">
            <div className="label">Dátum</div>
            <input className="input" placeholder="YYYY-MM-DD" />
          </div>

          <div className="field">
            <div className="label">Helyszín</div>
            <select className="select" defaultValue="Összes">
              <option value="">Összes</option>
              {places.map((place) => (
                <option key={place.id} value={place.id}>
                  {place.name} ({place.city})
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <div className="label">Műfaj</div>
            <select className="select" defaultValue="Összes">
              <option value="">Összes</option>
              {genres.map((genres) => (
                <option key={genres.id} value={genres.id}>
                  {genres.name}
                </option>
              ))}
            </select>
          </div>

          <button className="searchBtn" type="button">Keresés</button>
        </div>
  );
}
