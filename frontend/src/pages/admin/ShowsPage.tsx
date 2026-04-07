import { useEffect, useState } from "react";
import { useShows, ShowRow, ShowStatus } from "../../hooks/useShows";
import { API_BASE } from "../../utility/config";
import { formatDate } from "../../utility/date";

const STATUS_TO_API: Record<ShowStatus, number> = {
  Aktív: 0,
  Törölve: 1,
  Teltházas: 2,
};

function formatNotifyList(data: any) {
  const list = data?.notify_buyers;
  if (!Array.isArray(list) || list.length === 0) return "Nincs értesítendő vásárló.";
  return [
    "Az alábbi vásárlókat kell értesíteni:",
    ...list.map((row: any) => `- ${row.name || "Ismeretlen"} (${row.email || "nincs email"})`),
  ].join("\n");
}

export function ShowsPage() {
  const { shows: serverShows, loading, error, reload } = useShows();
  const [shows, setShows] = useState<ShowRow[]>([]);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    setShows(serverShows);
  }, [serverShows]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Biztosan törlöd?")) return;
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      setBusyId(id);
      const res = await fetch(`${API_BASE}/api/admin/concerts/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.message || `HTTP ${res.status}`);
      alert(formatNotifyList(data));
      await reload();
    } catch (e: any) {
      alert(e?.message || "A törlés nem sikerült.");
    } finally {
      setBusyId(null);
    }
  };

  const handleStatusChange = async (id: string, status: ShowStatus) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      setBusyId(id);
      const res = await fetch(`${API_BASE}/api/admin/concerts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: STATUS_TO_API[status] }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.message || `HTTP ${res.status}`);
      if (Array.isArray(data?.notify_buyers) && data.notify_buyers.length > 0) {
        alert(formatNotifyList(data));
      }
      await reload();
    } catch (e: any) {
      alert(e?.message || "A státusz mentése nem sikerült.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <section className="panel">
      <div className="panelHead">
        <h2>Előadások</h2>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="actionBtn actionBtn--solid" type="button" onClick={reload}>
            Frissítés
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
              <th>Lejárt</th>
              <th>Művelet</th>              
              <th></th>
            </tr>
          </thead>
          <tbody>
            {shows.map((s) => (
              <tr key={s.id}>
                <td data-label="Cím">{s.title}</td>
                <td data-label="Előadók">{s.performer_name}</td>
                <td data-label="Helyszín">{s.place_name}</td>
                <td data-label="Státusz">
                  <select
                    value={s.status}
                    disabled={busyId === s.id}
                    onChange={(e) => handleStatusChange(s.id, e.target.value as ShowStatus)}
                  >
                    <option value="Aktív">Aktív</option>
                    <option value="Törölve">Törölve</option>
                    <option value="Teltházas">Teltházas</option>
                  </select>
                </td>
                <td data-label="Ár">{s.basePrice} Ft</td>
                <td data-label="Törölve">{s.soft_delete ? "igen" : "nem"}</td>
                <td data-label="Művelet">
                  <button onClick={() => handleDelete(s.id)} disabled={busyId === s.id}>Törlés</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
