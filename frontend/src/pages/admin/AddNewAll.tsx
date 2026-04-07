import { Dispatch, SetStateAction, useMemo, Fragment, useState } from "react";
import { formatDate } from "../../utility/date";
import {
  useAdminPlaces,
  useAdminRooms,
  useAdminPerformers,
  useAdminGenres,
  useAdminConcerts,
} from "../../hooks/useAdminCatalog";

type SectionKey = "places" | "rooms" | "performers" | "genres" | "concerts" | null;

type PlaceDraft = { name: string; city: string; address: string };
type RoomDraft = { place_id: string; serial_number: string; total_rows: string; total_columns: string };
type PerformerDraft = { id: string; name: string; genre: string; country: string; description: string };
type GenreDraft = { name: string };
function formatNotifyList(data: any) {
  const list = data?.notify_buyers;
  if (!Array.isArray(list) || list.length === 0) return "Nincs értesítendő vásárló.";
  return [
    "Az alábbi vásárlókat kell értesíteni:",
    ...list.map((row: any) => `- ${row.name || "Ismeretlen"} (${row.email || "nincs email"})`),
  ].join("\n");
}

type ConcertDraft = {
  name: string;
  performer_id: string;
  place_id: string;
  room_id: string;
  date: string;
  base_price: string;
  description: string;
  picture: string;
};

const NEW_PLACE: PlaceDraft = { name: "", city: "", address: "" };
const NEW_ROOM: RoomDraft = { place_id: "", serial_number: "", total_rows: "", total_columns: "" };
const NEW_PERFORMER: PerformerDraft = {
  id: "",
  name: "",
  genre: "",
  country: "magyar",
  description: "",
};
const NEW_GENRE: GenreDraft = { name: "" };
const NEW_CONCERT: ConcertDraft = {
  name: "",
  performer_id: "",
  place_id: "",
  room_id: "",
  date: "",
  base_price: "",
  description: "",
  picture: "",
};

function updateDraft<T>(setState: Dispatch<SetStateAction<T>>, key: keyof T) {
  return (value: string) => {
    setState((current) => ({ ...current, [key]: value }));
  };
}

export function AddNewPage() {
  const [open, setOpen] = useState<SectionKey>(null);

  const placesApi = useAdminPlaces();
  const roomsApi = useAdminRooms();
  const performersApi = useAdminPerformers();
  const genresApi = useAdminGenres();
  const concertsApi = useAdminConcerts();

  const [placeDraft, setPlaceDraft] = useState<PlaceDraft>(NEW_PLACE);
  const [roomDraft, setRoomDraft] = useState<RoomDraft>(NEW_ROOM);
  const [performerDraft, setPerformerDraft] = useState<PerformerDraft>(NEW_PERFORMER);
  const [genreDraft, setGenreDraft] = useState<GenreDraft>(NEW_GENRE);
  const [concertDraft, setConcertDraft] = useState<ConcertDraft>(NEW_CONCERT);

  const [openId, setOpenId] = useState<number | null>(null);
  const [openConcertId, setOpenConcertId] = useState<number | null>(null);

  const filteredRooms = useMemo(
    () => roomsApi.items.filter((room) => String(room.place_id) === String(concertDraft.place_id)),
    [concertDraft.place_id, roomsApi.items],
  );

  const selectedPerformer = performersApi.items.find(
    (performer) => String(performer.id) === String(concertDraft.performer_id),
  );
  const selectedGenreName =
    genresApi.items.find((genre) => genre.id === selectedPerformer?.genre)?.name ?? "-";

  const handleConcertDelete = async (concertId: number) => {
    if (!window.confirm("Biztosan törlöd a koncertet?")) return;

    try {
      const data = await concertsApi.deleteItem(concertId);
      if (data && Object.prototype.hasOwnProperty.call(data, "notify_buyers")) {
        window.alert(formatNotifyList(data));
      }
    } catch (e: any) {
      window.alert(e?.message || "A koncert törlése nem sikerült.");
    }
  };

  return (
    <section className="panel">
      <div className="panelHead">
        <h2>Adatok felvétele/törlése</h2>
      </div>

      <div className="toolbar">
        <button className="actionBtn" onClick={() => setOpen(open === "places" ? null : "places")}>Új helyszín</button>
        <button className="actionBtn" onClick={() => setOpen(open === "rooms" ? null : "rooms")}>Új terem</button>
        <button className="actionBtn" onClick={() => setOpen(open === "performers" ? null : "performers")}>Új előadó</button>
        <button className="actionBtn" onClick={() => setOpen(open === "genres" ? null : "genres")}>Új műfaj</button>
        <button className="actionBtn actionBtn--solid" onClick={() => setOpen(open === "concerts" ? null : "concerts")}>Új koncert</button>
      </div>

      {open === "places" && (
        <div className="adminTableWrap">
          <h3>Helyszínek</h3>
          <table className="adminTable">
            <thead>
              <tr>
                <th>Név</th>
                <th>Város</th>
                <th>Cím</th>
                <th>Művelet</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Név">
                  <input className="adminInput" placeholder="helyszín neve" value={placeDraft.name} onChange={(e) => updateDraft(setPlaceDraft, "name")(e.target.value)} />
                </td>
                <td data-label="Város">
                  <input className="adminInput" placeholder="város" value={placeDraft.city} onChange={(e) => updateDraft(setPlaceDraft, "city")(e.target.value)} />
                </td>
                <td data-label="Cím">
                  <input className="adminInput" placeholder="cím" value={placeDraft.address} onChange={(e) => updateDraft(setPlaceDraft, "address")(e.target.value)} />
                </td>
                <td data-label="Művelet">
                  <button
                    className="actionBtn actionBtn--solid"
                    onClick={async () => {
                      await placesApi.createItem(placeDraft);
                      setPlaceDraft(NEW_PLACE);
                    }}
                  >
                    Mentés
                  </button>
                </td>
              </tr>              
              {placesApi.loading && (
                <tr>
                  <td colSpan={4}>Betöltés…</td>
                </tr>
              )}
              {!placesApi.loading &&
                placesApi.items.map((place) => (
                  <tr key={place.id}>
                    <td data-label="Név">{place.name}</td>
                    <td data-label="Város">{place.city}</td>
                    <td data-label="Cím">{place.address}</td>
                    <td data-label="Művelet">
                      <button className="adminDanger" onClick={() => placesApi.deleteItem(place.id)}>Törlés</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {open === "rooms" && (
        <div className="adminTableWrap">
          <h3>Termek</h3>
          <table className="adminTable">
            <thead>
              <tr>
                <th>Helyszín</th>
                <th>Terem</th>
                <th>Sorok</th>
                <th>Oszlopok</th>
                <th>Művelet</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Helyszín">
                  <select className="adminInput" value={roomDraft.place_id} onChange={(e) => updateDraft(setRoomDraft, "place_id")(e.target.value)}>
                    <option value="">helyszín választása</option>
                    {placesApi.items.map((place) => (
                      <option key={place.id} value={place.id}>
                        {place.name} – {place.city}
                      </option>
                    ))}
                  </select>
                </td>
                <td data-label="Terem">
                  <input className="adminInput" type="number" placeholder="terem sorszáma" value={roomDraft.serial_number} onChange={(e) => updateDraft(setRoomDraft, "serial_number")(e.target.value)} />
                </td>
                <td data-label="Sorok">
                  <input className="adminInput" type="number" placeholder="sorok" value={roomDraft.total_rows} onChange={(e) => updateDraft(setRoomDraft, "total_rows")(e.target.value)} />
                </td>
                <td data-label="Oszlopok">
                  <input className="adminInput" type="number" placeholder="oszlopok" value={roomDraft.total_columns} onChange={(e) => updateDraft(setRoomDraft, "total_columns")(e.target.value)} />
                </td>
                <td data-label="Művelet">
                  <button
                    className="actionBtn actionBtn--solid"
                    onClick={async () => {
                      await roomsApi.createItem({
                        place_id: Number(roomDraft.place_id),
                        serial_number: Number(roomDraft.serial_number),
                        total_rows: Number(roomDraft.total_rows),
                        total_columns: Number(roomDraft.total_columns),
                      });
                      setRoomDraft(NEW_ROOM);
                    }}
                  >
                    Mentés
                  </button>
                </td>
              </tr>              
              {roomsApi.loading && (
                <tr>
                  <td colSpan={5}>Betöltés…</td>
                </tr>
              )}
              {!roomsApi.loading &&
                roomsApi.items.map((room) => {
                  const place = placesApi.items.find((item) => item.id === room.place_id);
                  return (
                    <tr key={room.id}>
                      <td data-label="Helyszín">{place?.name ?? `#${room.place_id}`}</td>
                      <td data-label="Terem">{room.serial_number}</td>
                      <td data-label="Sorok">{room.total_rows}</td>
                      <td data-label="Oszlopok">{room.total_columns}</td>
                      <td data-label="Művelet">
                        <button className="adminDanger" onClick={() => roomsApi.deleteItem(room.id)}>Törlés</button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}

      {open === "performers" && (
        <div className="adminTableWrap">
          <h3>Előadók</h3>
          <table className="adminTable">
            <thead>
              <tr>
                <th>Név</th>
                <th>Műfaj</th>
                <th>Ország</th>
                <th>Művelet</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Név">
                  <input className="adminInput" placeholder="előadó neve" value={performerDraft.name} onChange={(e) => updateDraft(setPerformerDraft, "name")(e.target.value)} />
                </td>
                <td data-label="Műfaj">
                  <select className="adminInput" value={performerDraft.genre} onChange={(e) => updateDraft(setPerformerDraft, "genre")(e.target.value)}>
                    <option value="">műfaj választása</option>
                    {genresApi.items.map((genre) => (
                      <option key={genre.id} value={genre.id}>
                        {genre.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td data-label="Ország">
                  <input className="adminInput" placeholder="ország" value={performerDraft.country} onChange={(e) => updateDraft(setPerformerDraft, "country")(e.target.value)} />
                </td>
                <td data-label="Művelet">
                  
                  <button
                    className="actionBtn actionBtn--solid"
                    onClick={async () => {
                      await performersApi.createItem({
                        id: performerDraft.id,
                        name: performerDraft.name,
                        genre: Number(performerDraft.genre),
                        country: performerDraft.country || "magyar",
                        description: performerDraft.description || "",
                      });
                      setPerformerDraft(NEW_PERFORMER);
                    }}
                  >
                    Mentés
                  </button>
                </td>
              </tr>
              <tr>
                <td colSpan={4}>
                  <input className="adminInput" placeholder="leírás" value={performerDraft.description} onChange={(e) => updateDraft(setPerformerDraft, "description")(e.target.value)} />
                </td>
              </tr>              
              {performersApi.items.map((performer) => (
                <>
                  <tr key={performer.id}>
                    <td data-label="Név">{performer.name}</td>
                    <td data-label="Műfaj">{genresApi.items.find((genre) => genre.id === performer.genre)?.name ?? "-"}</td>
                    <td data-label="Ország">{performer.country ?? "-"}</td>
                    <td data-label="Művelet" className="performerActions">
                      <button className="actionBtn" type="button" onClick={() => setOpenId(openId === performer.id ? null : performer.id)}>ℹ</button>
                      <button className="adminDanger" onClick={() => performersApi.deleteItem(performer.id)}>Törlés</button>
                    </td>
                  </tr>
                  {openId === performer.id && (
                    <tr key={`desc-${performer.id}`}>
                      <td colSpan={4} className="adminDescriptionRow">{performer.description || "Nincs leírás megadva."}</td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {open === "genres" && (
        <div className="adminTableWrap">
          <h3>Műfajok</h3>
          <table className="adminTable">
            <thead>
              <tr>
                <th>Név</th>
                <th>Művelet</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Név">
                  <input className="adminInput" placeholder="műfaj neve" value={genreDraft.name} onChange={(e) => updateDraft(setGenreDraft, "name")(e.target.value)} />
                </td>
                <td data-label="Művelet">
                  <button
                    className="actionBtn actionBtn--solid"
                    onClick={async () => {
                      await genresApi.createItem(genreDraft);
                      setGenreDraft(NEW_GENRE);
                    }}
                  >
                    Mentés
                  </button>
                </td>
              </tr>              
              {genresApi.items.map((genre) => (
                <tr key={genre.id}>
                  <td data-label="Név">{genre.name}</td>
                  <td data-label="Művelet">
                    <button className="adminDanger" onClick={() => genresApi.deleteItem(genre.id)}>Törlés</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {open === "concerts" && (
        <div className="adminTableWrap">
          <h3>Koncertek</h3>
          <table className="adminTable">
            <tr>
              <th>Név</th>
              <th>Előadó</th>
              <th>Műfaj</th>
              <th>Helyszín</th>
              <th>Terem</th>
              <th>Dátum</th>
              <th>Alapár</th>
              <th>Leírás</th>
              <th>Művelet</th>
            </tr>
            <tbody>
<tr>
  <td data-label="Név">
    <input className="adminInput" placeholder="koncert neve" value={concertDraft.name} onChange={(e) => updateDraft(setConcertDraft, "name")(e.target.value)} />
  </td>
  <td data-label="Előadó">
    <select className="adminInput" value={concertDraft.performer_id} onChange={(e) => updateDraft(setConcertDraft, "performer_id")(e.target.value)}>
      <option value="">előadó választása</option>
      {performersApi.items.map((performer) => (
        <option key={performer.id} value={performer.id}>
          {performer.name}
        </option>
      ))}
    </select>
  </td>
  <td data-label="Műfaj">
    <span>{selectedGenreName}</span>
  </td>
  <td data-label="Helyszín">
    <select
      className="adminInput"
      value={concertDraft.place_id}
      onChange={(e) => {
        updateDraft(setConcertDraft, "place_id")(e.target.value);
        updateDraft(setConcertDraft, "room_id")("");
      }}
    >
      <option value="">helyszín választása</option>
      {placesApi.items.map((place) => (
        <option key={place.id} value={place.id}>
          {place.name} – {place.city}
        </option>
      ))}
    </select>
  </td>
  <td data-label="Terem">
    <select className="adminInput" value={concertDraft.room_id} onChange={(e) => updateDraft(setConcertDraft, "room_id")(e.target.value)} disabled={!concertDraft.place_id}>
      <option value="">terem választása</option>
      {filteredRooms.map((room) => (
        <option key={room.id} value={room.id}>
          {room.serial_number}
        </option>
      ))}
    </select>
  </td>
  <td data-label="Dátum">
    <input className="adminInput" type="datetime-local" value={concertDraft.date} onChange={(e) => updateDraft(setConcertDraft, "date")(e.target.value)} />
  </td>
  <td data-label="Alapár">
    <input className="adminInput" type="number" placeholder="alapár" value={concertDraft.base_price} onChange={(e) => updateDraft(setConcertDraft, "base_price")(e.target.value)} />
  </td>
  <td data-label="Leírás">–</td>
  <td data-label="Művelet">
    <button
      className="actionBtn actionBtn--solid"
      onClick={async () => {
        if (!concertDraft.name.trim()) return alert("Add meg a koncert nevét!");
        if (!concertDraft.performer_id) return alert("Válassz előadót!");
        if (!concertDraft.place_id) return alert("Válassz helyszínt!");
        if (!concertDraft.room_id) return alert("Válassz termet!");
        if (!concertDraft.date) return alert("Add meg a dátumot!");
        if (!concertDraft.base_price) return alert("Add meg az alapárat!");

        await concertsApi.createItem({
          name: concertDraft.name,
          performer_id: Number(concertDraft.performer_id),
          room_id: Number(concertDraft.room_id),
          date: concertDraft.date,
          base_price: Number(concertDraft.base_price),
          description: concertDraft.description || "",
          picture: concertDraft.picture || "",
        });

        setConcertDraft(NEW_CONCERT);
      }}
    >
      Mentés
    </button>
  </td>
</tr>
              <tr>
                <td colSpan={8}>
                  <div className="stack">
                    <input className="adminInput" placeholder="leírás" value={concertDraft.description} onChange={(e) => updateDraft(setConcertDraft, "description")(e.target.value)} />
                    <input className="adminInput" placeholder="kép URL" value={concertDraft.picture} onChange={(e) => updateDraft(setConcertDraft, "picture")(e.target.value)} />
                  </div>
                </td>
              </tr>              
{concertsApi.items.map((concert) => (
  <Fragment key={concert.id}>
    <tr>
      <td data-label="Név">{concert.name}</td>
      <td data-label="Előadó">
        {concert.performer_name ?? performersApi.items.find((performer) => performer.id === concert.performer_id)?.name ?? concert.performer_id}
      </td>
      <td data-label="Műfaj">
        {concert.genre_name ?? genresApi.items.find((genre) => genre.id === concert.genre_id)?.name ?? "-"}
      </td>
      <td data-label="Helyszín">
        {concert.place_name ?? placesApi.items.find((place) => place.id === concert.place_id)?.name ?? "-"}
      </td>
      <td data-label="Terem">
        {concert.serial_number ?? roomsApi.items.find((room) => room.id === concert.room_id)?.serial_number ?? concert.room_id}
      </td>
      <td data-label="Dátum">{formatDate(concert.date)}</td>
      <td data-label="Alapár">{concert.base_price}</td>
      <td data-label="Leírás">
        <button
          type="button"
          className="actionBtn actionBtn--ghost"
          onClick={() =>
            setOpenConcertId(openConcertId === concert.id ? null : concert.id)
          }
          title="Leírás megjelenítése"
        >
          ℹ
        </button>
      </td>
      <td data-label="Művelet">
        <button className="adminDanger" onClick={() => handleConcertDelete(concert.id)}>
          Törlés
        </button>
      </td>
    </tr>

    {openConcertId === concert.id && (
      <tr>
        <td colSpan={9}>
          <div className="adminDescriptionBox">
            <strong>Koncert leírás:</strong>
            <div>{concert.description || "Nincs megadott leírás."}</div>
          </div>
        </td>
      </tr>
    )}
  </Fragment>
))}            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
