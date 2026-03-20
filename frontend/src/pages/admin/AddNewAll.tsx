import { useMemo, useState } from "react";
import {
  useAdminPlaces,
  useAdminRooms,
  useAdminPerformers,
  useAdminGenres,
  useAdminConcerts,
} from "../../hooks/useAdminCatalog";

type SectionKey =
  | "places"
  | "rooms"
  | "performers"
  | "genres"
  | "concerts"
  | null;

const NEW_PLACE = { name: "", city: "", address: "" };
const NEW_ROOM = { place_id: "", name: "", total_rows: "", total_columns: "" };
const NEW_PERFORMER = {
  name: "",
  genre: "",
  country: "magyar",
  description: "",
};
const NEW_GENRE = { name: "" };
const NEW_CONCERT = {
  name: "",
  performer_id: "",
  place_id: "",
  room_id: "",
  date: "",
  base_price: "",
  description: "",
  picture: "",
};

export function AddNewPage() {
  const [open, setOpen] = useState<SectionKey>(null);

  const placesApi = useAdminPlaces();
  const roomsApi = useAdminRooms();
  const performersApi = useAdminPerformers();
  const genresApi = useAdminGenres();
  const concertsApi = useAdminConcerts();

  const [placeDraft, setPlaceDraft] = useState<any>(NEW_PLACE);
  const [roomDraft, setRoomDraft] = useState<any>(NEW_ROOM);
  const [performerDraft, setPerformerDraft] = useState<any>(NEW_PERFORMER);
  const [genreDraft, setGenreDraft] = useState<any>(NEW_GENRE);
  const [concertDraft, setConcertDraft] = useState<any>(NEW_CONCERT);

  const roomOptions = useMemo(() => roomsApi.items, [roomsApi.items]);
  const filteredRooms = roomOptions.filter(
    (r) => String(r.place_id) === String(concertDraft.place_id)
  );

  return (
    <section className="adminCard">
      <div className="adminCardHead">
        <h2>Adatok felvétele/törlése</h2>
      </div>

      <div
        style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 18 }}
      >
        <button
          className="adminBtn"
          onClick={() => setOpen(open === "places" ? null : "places")}
        >
          Új helyszín
        </button>
        <button
          className="adminBtn"
          onClick={() => setOpen(open === "rooms" ? null : "rooms")}
        >
          Új terem
        </button>
        <button
          className="adminBtn"
          onClick={() => setOpen(open === "performers" ? null : "performers")}
        >
          Új előadó
        </button>
        <button
          className="adminBtn"
          onClick={() => setOpen(open === "genres" ? null : "genres")}
        >
          Új műfaj
        </button>
        <button
          className="adminBtn adminBtn--solid"
          onClick={() => setOpen(open === "concerts" ? null : "concerts")}
        >
          Új koncert
        </button>
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
              {placesApi.loading && (
                <tr>
                  <td colSpan={4}>Betöltés…</td>
                </tr>
              )}
              {!placesApi.loading &&
                placesApi.items.map((p) => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{p.city}</td>
                    <td>{p.address}</td>
                    <td>
                      <button
                        className="adminDanger"
                        onClick={() => placesApi.deleteItem(p.id)}
                      >
                        Törlés
                      </button>
                    </td>
                  </tr>
                ))}
              <tr>
                <td>
                  <input
                    className="adminInput"
                    placeholder="helyszín neve"
                    value={placeDraft.name}
                    onChange={(e) =>
                      setPlaceDraft((d: any) => ({
                        ...d,
                        name: e.target.value,
                      }))
                    }
                  />
                </td>
                <td>
                  <input
                    className="adminInput"
                    placeholder="város"
                    value={placeDraft.city}
                    onChange={(e) =>
                      setPlaceDraft((d: any) => ({
                        ...d,
                        city: e.target.value,
                      }))
                    }
                  />
                </td>
                <td>
                  <input
                    className="adminInput"
                    placeholder="cím"
                    value={placeDraft.address}
                    onChange={(e) =>
                      setPlaceDraft((d: any) => ({
                        ...d,
                        address: e.target.value,
                      }))
                    }
                  />
                </td>
                <td>
                  <button
                    className="adminBtn adminBtn--solid"
                    onClick={async () => {
                      await placesApi.createItem(placeDraft);
                      setPlaceDraft(NEW_PLACE);
                    }}
                  >
                    Mentés
                  </button>
                </td>
              </tr>
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
              {roomsApi.loading && (
                <tr>
                  <td colSpan={5}>Betöltés…</td>
                </tr>
              )}
              {!roomsApi.loading &&
                roomsApi.items.map((r) => {
                  const place = placesApi.items.find(
                    (p) => p.id === r.place_id
                  );
                  return (
                    <tr key={r.id}>
                      <td>{place?.name ?? `#${r.place_id}`}</td>
                      <td>{r.name}</td>
                      <td>{r.total_rows}</td>
                      <td>{r.total_columns}</td>
                      <td>
                        <button
                          className="adminDanger"
                          onClick={() => roomsApi.deleteItem(r.id)}
                        >
                          Törlés
                        </button>
                      </td>
                    </tr>
                  );
                })}
              <tr>
                <td>
                  <select
                    className="adminInput"
                    value={roomDraft.place_id}
                    onChange={(e) =>
                      setRoomDraft((d: any) => ({
                        ...d,
                        place_id: e.target.value,
                      }))
                    }
                  >
                    <option value="">helyszín választása</option>
                    {placesApi.items.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} – {p.city}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    className="adminInput"
                    type="number"
                    placeholder="terem neve / sorszáma"
                    value={roomDraft.name}
                    onChange={(e) =>
                      setRoomDraft((d: any) => ({ ...d, name: e.target.value }))
                    }
                  />
                </td>
                <td>
                  <input
                    className="adminInput"
                    type="number"
                    placeholder="sorok"
                    value={roomDraft.total_rows}
                    onChange={(e) =>
                      setRoomDraft((d: any) => ({
                        ...d,
                        total_rows: e.target.value,
                      }))
                    }
                  />
                </td>
                <td>
                  <input
                    className="adminInput"
                    type="number"
                    placeholder="oszlopok"
                    value={roomDraft.total_columns}
                    onChange={(e) =>
                      setRoomDraft((d: any) => ({
                        ...d,
                        total_columns: e.target.value,
                      }))
                    }
                  />
                </td>
                <td>
                  <button
                    className="adminBtn adminBtn--solid"
                    onClick={async () => {
                      await roomsApi.createItem({
                        place_id: Number(roomDraft.place_id),
                        name: Number(roomDraft.name),
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
              {performersApi.items.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>
                    {genresApi.items.find((g) => g.id === p.genre)?.name ?? "-"}
                  </td>
                  <td>{p.country ?? "-"}</td>
                  <td>
                    <button
                      className="adminDanger"
                      onClick={() => performersApi.deleteItem(p.id)}
                    >
                      Törlés
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td>
                  <input
                    className="adminInput"
                    placeholder="előadó neve"
                    value={performerDraft.name}
                    onChange={(e) =>
                      setPerformerDraft((d: any) => ({
                        ...d,
                        name: e.target.value,
                      }))
                    }
                  />
                </td>
                <td>
                  <select
                    className="adminInput"
                    value={performerDraft.genre}
                    onChange={(e) =>
                      setPerformerDraft((d: any) => ({
                        ...d,
                        genre: e.target.value,
                      }))
                    }
                  >
                    <option value="">műfaj választása</option>
                    {genresApi.items.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    className="adminInput"
                    placeholder="ország"
                    value={performerDraft.country}
                    onChange={(e) =>
                      setPerformerDraft((d: any) => ({
                        ...d,
                        country: e.target.value,
                      }))
                    }
                  />
                </td>
                <td>
                  <button
                    className="adminBtn adminBtn--solid"
                    onClick={async () => {
                      await performersApi.createItem({
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
                  <input
                    className="adminInput"
                    placeholder="leírás"
                    value={performerDraft.description}
                    onChange={(e) =>
                      setPerformerDraft((d: any) => ({
                        ...d,
                        description: e.target.value,
                      }))
                    }
                  />
                </td>
              </tr>
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
              {genresApi.items.map((g) => (
                <tr key={g.id}>
                  <td>{g.name}</td>
                  <td>
                    <button
                      className="adminDanger"
                      onClick={() => genresApi.deleteItem(g.id)}
                    >
                      Törlés
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td>
                  <input
                    className="adminInput"
                    placeholder="műfaj neve"
                    value={genreDraft.name}
                    onChange={(e) => setGenreDraft({ name: e.target.value })}
                  />
                </td>
                <td>
                  <button
                    className="adminBtn adminBtn--solid"
                    onClick={async () => {
                      await genresApi.createItem(genreDraft);
                      setGenreDraft(NEW_GENRE);
                    }}
                  >
                    Mentés
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {open === "concerts" && (
        <div className="adminTableWrap">
          <h3>Koncertek</h3>
          <table className="adminTable">
            <thead>
              <tr>
                <th>Név</th>
                <th>Előadó</th>
                <th>Műfaj</th>
                <th>Helyszín</th>
                <th>Terem</th>
                <th>Dátum</th>
                <th>Alapár</th>
                <th>Művelet</th>
              </tr>
            </thead>
            <tbody>
              {concertsApi.items.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>
                    {c.performer_name ??
                      performersApi.items.find((p) => p.id === c.performer_id)
                        ?.name ??
                      c.performer_id}
                  </td>
                  <td>
                    {c.genre_name ??
                      genresApi.items.find((g) => g.id === c.genre_id)?.name ??
                      "-"}
                  </td>
                  <td>
                    {c.place_name ??
                      placesApi.items.find((p) => p.id === c.place_id)?.name ??
                      "-"}
                  </td>
                  <td>
                    {c.room_name ??
                      roomOptions.find((r) => r.id === c.room_id)?.name ??
                      c.room_id}
                  </td>
                  <td>{c.date}</td>
                  <td>{c.base_price}</td>
                  <td>
                    <button
                      className="adminDanger"
                      onClick={() => concertsApi.deleteItem(c.id)}
                    >
                      Törlés
                    </button>
                  </td>
                </tr>
              ))}

              <tr>
                <td>
                  <input
                    className="adminInput"
                    placeholder="koncert neve"
                    value={concertDraft.name}
                    onChange={(e) =>
                      setConcertDraft((d: any) => ({
                        ...d,
                        name: e.target.value,
                      }))
                    }
                  />
                </td>

                <td>
                  <select
                    className="adminInput"
                    value={concertDraft.performer_id}
                    onChange={(e) =>
                      setConcertDraft((d: any) => ({
                        ...d,
                        performer_id: e.target.value,
                      }))
                    }
                  >
                    <option value="">előadó választása</option>
                    {performersApi.items.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </td>

                <td>
                  <span>
                    {genresApi.items.find(
                      (g) =>
                        g.id ===
                        performersApi.items.find(
                          (p) => String(p.id) === String(concertDraft.performer_id)
                        )?.genre
                    )?.name ?? "-"}
                  </span>
                </td>

                <td>
                  <select
                    className="adminInput"
                    value={concertDraft.place_id}
                    onChange={(e) =>
                      setConcertDraft((d: any) => ({
                        ...d,
                        place_id: e.target.value,
                        room_id: "",
                      }))
                    }
                  >
                    <option value="">helyszín választása</option>
                    {placesApi.items.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} – {p.city}
                      </option>
                    ))}
                  </select>
                </td>

                <td>
                  <select
                    className="adminInput"
                    value={concertDraft.room_id}
                    onChange={(e) =>
                      setConcertDraft((d: any) => ({
                        ...d,
                        room_id: e.target.value,
                      }))
                    }
                    disabled={!concertDraft.place_id}
                  >
                    <option value="">terem választása</option>
                    {filteredRooms.map((r) => (
                      <option key={r.id} value={r.id}>
                        terem {r.name} ({r.total_rows}×{r.total_columns})
                      </option>
                    ))}
                  </select>
                </td>

                <td>
                  <input
                    className="adminInput"
                    type="datetime-local"
                    value={concertDraft.date}
                    onChange={(e) =>
                      setConcertDraft((d: any) => ({
                        ...d,
                        date: e.target.value,
                      }))
                    }
                  />
                </td>

                <td>
                  <input
                    className="adminInput"
                    type="number"
                    value={concertDraft.base_price}
                    onChange={(e) =>
                      setConcertDraft((d: any) => ({
                        ...d,
                        base_price: e.target.value,
                      }))
                    }
                  />
                </td>

                <td>
                  <button
                    className="adminBtn adminBtn--solid"
                    onClick={async () => {
                      if (!concertDraft.name.trim()) {
                        alert("Add meg a koncert nevét!");
                        return;
                      }

                      if (!concertDraft.performer_id) {
                        alert("Válassz előadót!");
                        return;
                      }

                      if (!concertDraft.place_id) {
                        alert("Válassz helyszínt!");
                        return;
                      }

                      if (!concertDraft.room_id) {
                        alert("Válassz termet!");
                        return;
                      }

                      if (!concertDraft.date) {
                        alert("Add meg a dátumot!");
                        return;
                      }

                      if (!concertDraft.base_price) {
                        alert("Add meg az alapárat!");
                        return;
                      }

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
                  <div style={{ display: "grid", gap: 8 }}>
                    <input
                      className="adminInput"
                      placeholder="leírás"
                      value={concertDraft.description}
                      onChange={(e) =>
                        setConcertDraft((d: any) => ({
                          ...d,
                          description: e.target.value,
                        }))
                      }
                    />
                    <input
                      className="adminInput"
                      placeholder="kép URL"
                      value={concertDraft.picture}
                      onChange={(e) =>
                        setConcertDraft((d: any) => ({
                          ...d,
                          picture: e.target.value,
                        }))
                      }
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}