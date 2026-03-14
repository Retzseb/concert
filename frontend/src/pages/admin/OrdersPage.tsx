import { useEffect, useState } from "react";
import { API_BASE } from "../../utility/config";

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

function seatsText(reservation: Reservation) {
  return (reservation.tickets || [])
    .map((ticket) => {
      const row = ticket.seat?.row_number;
      const column = ticket.seat?.column_number;
      const seat = row && column ? `${row}/${column}` : "-";
      const discount = ticket.discount?.type || "normál";
      return `${seat} (${discount})`;
    })
    .join(", ");
}

export function OrdersPage() {
  const [orders, setOrders] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <section className="adminCard">
      <div className="adminCardHead">
        <h2>Rendelések</h2>
        <button className="adminBtn adminBtn--solid" type="button" onClick={load}>
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
                <th>Székek</th>
                <th>Összeg</th>
                <th>Státusz</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7}>Nincs még rendelés.</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>
                      <div>{order.user?.name || "-"}</div>
                      <div className="adminMuted">{order.user?.email || ""}</div>
                    </td>
                    <td>{order.concert?.name || "-"}</td>
                    <td>{order.concert?.date || order.reservation_date || "-"}</td>
                    <td>{seatsText(order)}</td>
                    <td>{money(order.total_price)}</td>
                    <td>{order.status === 0 ? "aktív" : String(order.status ?? "-")}</td>
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
