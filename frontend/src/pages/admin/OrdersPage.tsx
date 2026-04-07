import { useEffect, useState } from "react";
import { API_BASE } from "../../utility/config";
import { formatDate } from "../../utility/date";

type Reservation = {
  id: number;
  reservation_date?: string;
  total_price?: number;
  status?: number;
  user?: {
    id: number;
    name?: string;
    email?: string;
  };
  concert?: {
    id: number;
    name?: string;
    date?: string;
  };
  tickets: Array<{
    id: number;
    final_price?: number;
    seat?: {
      row_number?: number;
      column_number?: number;
    };
    discount?: {
      type?: string;
    };
  }>;
};

function money(value?: number) {
  return `${Math.round(Number(value || 0))} Ft`;
}

export function OrdersPage() {
  const [orders, setOrders] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState<string>("");

  const load = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setOrders([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${API_BASE}/api/admin/reservations`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setError("A rendelések betöltése nem sikerült.");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const deleteReservation = async (reservationId: number) => {
    const token = localStorage.getItem("token");
    if (!token || !window.confirm("Biztosan törlöd a teljes foglalást?")) return;
    try {
      setBusy(`reservation-${reservationId}`);
      const res = await fetch(`${API_BASE}/api/reservations/${reservationId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await load();
    } catch (e) {
      console.error(e);
      alert("A foglalás törlése nem sikerült.");
    } finally {
      setBusy("");
    }
  };

  const deleteTicket = async (ticketId: number) => {
    const token = localStorage.getItem("token");
    if (!token || !window.confirm("Biztosan törlöd ezt a jegyet?")) return;
    try {
      setBusy(`ticket-${ticketId}`);
      const res = await fetch(`${API_BASE}/api/tickets/${ticketId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.message || `HTTP ${res.status}`);
      if (data?.message) alert(data.message);
      await load();
    } catch (e) {
      console.error(e);
      alert("A jegy törlése nem sikerült.");
    } finally {
      setBusy("");
    }
  };

  return (
    <section className="panel">
      <div className="panelHead">
        <h2>Rendelések</h2>
        <button className="actionBtn actionBtn--solid" type="button" onClick={load}>
          Frissítés
        </button>
      </div>

      {loading ? (
        <p className="adminMuted">Betöltés...</p>
      ) : error ? (
        <p className="adminMuted">{error}</p>
      ) : (
        <div className="adminTableWrap">
          <table className="adminTable">
            <thead>
              <tr>
                <th>ID</th>
                <th>Felhasználó</th>
                <th>Koncert</th>
                <th>Dátum</th>
                <th>Jegyek</th>
                <th>Összeg</th>
                <th>Státusz</th>
                <th>Művelet</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={8}>Nincs még rendelés.</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td data-label="ID">#{order.id}</td>
                    <td data-label="Felhasználó">
                      <div>{order.user?.name || "-"}</div>
                      <div className="adminMuted">{order.user?.email || ""}</div>
                    </td>
                    <td data-label="Koncert">{order.concert?.name || "-"}</td>
                    <td data-label="Dátum">{formatDate(order.concert?.date || order.reservation_date)}</td>
                    <td data-label="Jegyek">
                      {(order.tickets || []).map((ticket) => {
                        const row = ticket.seat?.row_number;
                        const column = ticket.seat?.column_number;
                        const seat = row && column ? `${row}/${column}` : "-";
                        const discount = ticket.discount?.type || "normál";
                        return (
                          <div key={ticket.id} style={{ marginBottom: 6 }}>
                            {seat} ({discount}) – {money(ticket.final_price)}{" "}
                            <button onClick={() => deleteTicket(ticket.id)} disabled={busy === `ticket-${ticket.id}`}>
                              Jegy törlése
                            </button>
                          </div>
                        );
                      })}
                    </td>
                    <td data-label="Összeg">{money(order.total_price)}</td>
                    <td data-label="Státusz">{order.status === 0 ? "aktív" : String(order.status ?? "-")}</td>
                    <td data-label="Művelet">
                      <button onClick={() => deleteReservation(order.id)} disabled={busy === `reservation-${order.id}`}>
                        Foglalás törlése
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
