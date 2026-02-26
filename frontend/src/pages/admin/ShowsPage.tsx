import { useMemo, useState } from "react";
import { logAction } from "../../utility/logger"; 

type ShowStatus = "Ongoing" | "Cancelled" | "Sold out";

type ShowRow = {
  id: string;          // pl. AB001
  title: string;       // koncert neve
  performers: string;  // előadó(k)
  venue: string;       // helyszín
  room: string;        // terem
  status: ShowStatus;
  basePrice: number;   // alapár
};

type NewShowDraft = {
  id: string;
  title: string;
  performers: string;
  venue: string;
  room: string;
  status: ShowStatus;
  basePriceText: string;
};

export function ShowsPage() {
  const initial = useMemo<ShowRow[]>(
    () => [
      {
        id: "AB001",
        title: "Hans Zimmer Europe Tour",
        performers: "Lisa Gellard, (...)",
        venue: "Budapest - MVM Dome",
        room: "101",
        status: "Ongoing",
        basePrice: 15000,
      },
      {
        id: "BB101",
        title: "Metallica M72",
        performers: "James Hetfield, (...)",
        venue: "Budapest - Papp László Sportaréna",
        room: "404",
        status: "Cancelled",
        basePrice: 0,
      },
      {
        id: "CB303",
        title: "Gamer Symphony",
        performers: "Anna Felegi, Péter Magyar, (...)",
        venue: "Debrecen - HALL",
        room: "112",
        status: "Sold out",
        basePrice: 8500,
      },
    ],
    []
  );

  const [shows, setShows] = useState<ShowRow[]>(initial);

  const [isAdding, setIsAdding] = useState(false);
  const [draft, setDraft] = useState<NewShowDraft>({
    id: "",
    title: "",
    performers: "",
    venue: "",
    room: "",
    status: "Ongoing",
    basePriceText: "",
  });

  const updateStatus = (id: string, status: ShowStatus) => {
    setShows((prev) => {
      const before = prev.find((s) => s.id === id);
      const next = prev.map((s) => (s.id === id ? { ...s, status } : s));

      logAction?.({
        type: "SHOW_STATUS_UPDATE" as any,
        payload: { showId: id, before, after: next.find((s) => s.id === id) },
      } as any);

      return next;
    });
  };

  const deleteShow = (id: string) => {
    setShows((prev) => {
      const removed = prev.find((s) => s.id === id);
      logAction?.({ type: "SHOW_DELETE" as any, payload: { showId: id, removed } } as any);
      return prev.filter((s) => s.id !== id);
    });
  };

  const startAdd = () => {
    setIsAdding(true);
    setDraft({ id: "", title: "", performers: "", venue: "", room: "", status: "Ongoing", basePriceText: "" });
  };

  const cancelAdd = () => {
    setIsAdding(false);
    setDraft({ id: "", title: "", performers: "", venue: "", room: "", status: "Ongoing", basePriceText: "" });
  };

  const saveAdd = () => {
    if (!draft.id.trim() || !draft.title.trim() || !draft.venue.trim() || !draft.room.trim()) {
      alert("Töltsd ki legalább: Concert_ID, Koncert neve, Helyszín, Terem!");
      return;
    }
    const basePrice = Number(draft.basePriceText);
    if (!Number.isFinite(basePrice) || basePrice < 0) {
      alert("Az alapár legyen szám (0 is lehet, pl. cancelled esetén).");
      return;
    }

    setShows((prev) => {
      if (prev.some((s) => s.id.toLowerCase() === draft.id.trim().toLowerCase())) {
        alert("Már létezik ilyen Concert_ID!");
        return prev;
      }

      const newShow: ShowRow = {
        id: draft.id.trim(),
        title: draft.title.trim(),
        performers: draft.performers.trim(),
        venue: draft.venue.trim(),
        room: draft.room.trim(),
        status: draft.status,
        basePrice,
      };

      logAction?.({ type: "SHOW_ADD" as any, payload: newShow } as any);
      return [...prev, newShow];
    });

    setIsAdding(false);
    setDraft({ id: "", title: "", performers: "", venue: "", room: "", status: "Ongoing", basePriceText: "" });
  };

  return (
    <section className="adminCard">
      <div className="adminCardHead">
        <h2>Előadások kezelése</h2>

        {!isAdding ? (
          <button className="adminBtn adminBtn--solid" type="button" onClick={startAdd}>
            + Új előadás felvétele
          </button>
        ) : (
          <div style={{ display: "flex", gap: 10 }}>
            <button className="adminBtn adminBtn--solid" type="button" onClick={saveAdd}>
              Mentés
            </button>
            <button className="adminBtn" type="button" onClick={cancelAdd}>
              Mégse
            </button>
          </div>
        )}
      </div>

      <div className="adminTableWrap">
        <table className="adminTable">
          <thead>
            <tr>
              <th>Concert_ID</th>
              <th>Koncert neve</th>
              <th>Előadó(k)</th>
              <th>Helyszín</th>
              <th>Terem</th>
              <th>Státusz</th>
              <th>Alapár</th>
              <th>Művelet</th>
            </tr>
          </thead>

          <tbody>
            {shows.map((s) => (
              <tr key={s.id}>
                <td><b>{s.id}</b></td>
                <td>{s.title}</td>
                <td>{s.performers}</td>
                <td>{s.venue}</td>
                <td>{s.room}</td>
                <td>
                  <select className="adminSelect" value={s.status} onChange={(e) => updateStatus(s.id, e.target.value as ShowStatus)}>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Sold out">Sold out</option>
                  </select>
                </td>
                <td>{s.basePrice ? `${s.basePrice.toLocaleString("hu-HU")} HUF` : "---"}</td>
                <td>
                  <button className="adminDanger" type="button" onClick={() => deleteShow(s.id)}>
                    Törlés
                  </button>
                </td>
              </tr>
            ))}

            {isAdding && (
              <tr>
                <td>
                  <input className="adminInput" placeholder="AB001" value={draft.id} onChange={(e) => setDraft((d) => ({ ...d, id: e.target.value }))} />
                </td>
                <td>
                  <input className="adminInput" placeholder="Koncert neve" value={draft.title} onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))} />
                </td>
                <td>
                  <input className="adminInput" placeholder="Előadó(k)" value={draft.performers} onChange={(e) => setDraft((d) => ({ ...d, performers: e.target.value }))} />
                </td>
                <td>
                  <input className="adminInput" placeholder="Budapest - ..." value={draft.venue} onChange={(e) => setDraft((d) => ({ ...d, venue: e.target.value }))} />
                </td>
                <td>
                  <input className="adminInput" placeholder="112" value={draft.room} onChange={(e) => setDraft((d) => ({ ...d, room: e.target.value }))} />
                </td>
                <td>
                  <select className="adminSelect" value={draft.status} onChange={(e) => setDraft((d) => ({ ...d, status: e.target.value as ShowStatus }))}>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Sold out">Sold out</option>
                  </select>
                </td>
                <td>
                  <input className="adminInput" placeholder="15000" value={draft.basePriceText} onChange={(e) => setDraft((d) => ({ ...d, basePriceText: e.target.value }))} />
                </td>
                <td style={{ color: "rgba(243,241,255,.7)", fontWeight: 700 }}>Mentés fent ⤴</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}