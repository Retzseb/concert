import { useEffect, useState } from "react";
import { useShows, ShowRow, ShowStatus } from "../../hooks/useShows";
import { logAction } from "../../utility/logger";

export function ShowsPage() {
  const { shows: serverShows, loading, error, reload } = useShows();

  const [shows, setShows] = useState<ShowRow[]>([]);

  useEffect(() => {
    setShows(serverShows);
  }, [serverShows]);

  const handleDelete = (id: string) => {
    if (!window.confirm("Biztosan törlöd?")) return;
    setShows((prev) => prev.filter((s) => s.id !== id));
    logAction({ type: "SHOW_DELETE", payload: { id } });
  };

  const handleStatusChange = (id: string, status: ShowStatus) => {
    setShows((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
    logAction({ type: "SHOW_STATUS_UPDATE", payload: { id, status } });
  };

  return (
      <section className="adminCard">
        <div className="adminCardHead">
          <h2>Előadások</h2>
          <div style={{ display: "flex", gap: 10 }}>
          <button className="adminBtn adminBtn--solid" type="button">
            + Új előadás felvétele
          </button>
            <button className="adminBtn adminBtn--solid" type="button">
              Mentés
            </button>
            <button className="adminBtn" type="button">
              Mégse
            </button>
          </div>
        </div>

      {loading && <p>Betöltés...</p>}
      {error && (
        <div>
          <p style={{ color: "red" }}>{error}</p>
          <button onClick={reload}>Újratöltés</button>
        </div>
      )}
        <div className="adminTableWrap">
        <table className="adminTable">
        <thead>
          <tr>
            <th>Cím</th>
            <th>Előadók</th>
            <th>Helyszín</th>
            <th>Státusz</th>
            <th>Ár</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {shows.map((s) => (
            <tr key={s.id}>
              <td>{s.title}</td>
              <td>{s.performer_name}</td>
              <td>{s.place_name}</td>
              <td>
                <select
                  value={s.status}
                  onChange={(e) =>
                    handleStatusChange(s.id, e.target.value as ShowStatus)
                  }
                >
                  <option value="Ongoing">Ongoing</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Sold out">Sold out</option>
                </select>
              </td>
              <td>{s.basePrice} Ft</td>
              <td>
                <button onClick={() => handleDelete(s.id)}>Törlés</button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
