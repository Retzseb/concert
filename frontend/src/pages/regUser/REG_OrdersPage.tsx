import { useEffect, useState } from "react";
import { API_BASE } from "../../utility/config";

type Reservation = {
  id: number;
  reservation_date?: string;
  total_price?: number;
  concert?: {
    id: number;
    name: string;
    date?: string;
    picture?: string | null;
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

function seatLabel(ticket: Reservation["tickets"][number]) {
  const row = ticket.seat?.row_number;
  const column = ticket.seat?.column_number;
  if (!row || !column) return "-";
  return `${row}. sor / ${column}. szék`;
}

export function REG_OrdersPage() {
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
      const res = await fetch(`${API_BASE}/api/my-reservations`, {
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
      setError("A foglalások betöltése nem sikerült.");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <section className="userCard">
      <div className="userCardHead">
        <h2>Foglalásai / vásárlásai</h2>
        <button className="btn" type="button" onClick={load}>
          Frissítés
        </button>
      </div>

      {loading ? (
        <div className="userEmptyText">Betöltés...</div>
      ) : error ? (
        <div className="userEmptyText">{error}</div>
      ) : orders.length === 0 ? (
        <div className="userEmpty">
          <div className="userEmptyTitle">Még nincs rendelésed</div>
          <div className="userEmptyText">
            Ha vásárolsz vagy foglalsz jegyet, itt fog megjelenni a listában.
          </div>
        </div>
      ) : (
        <div className="userOrdersGrid">
          {orders.map((order) => (
            <div key={order.id} className="userOrderTile">
              {order.concert?.picture ? (
                <img className="userOrderPoster" src={order.concert.picture} alt={order.concert?.name || "Koncert"} />
              ) : (
                <div className="userOrderPoster" />
              )}
              <div className="userOrderMeta">
                <div className="userOrderTitle">{order.concert?.name || `Foglalás #${order.id}`}</div>
                <div className="userOrderDate">{order.concert?.date || order.reservation_date || "-"}</div>
                <div className="userOrderSmall">Foglalás azonosító: #{order.id}</div>
                <div className="userOrderSmall">Jegyek száma: {order.tickets?.length || 0}</div>
                <div className="userOrderSmall">Végösszeg: {money(order.total_price)}</div>
                <div className="userOrderSmall" style={{ marginTop: 8 }}>
                  {order.tickets?.map((ticket) => (
                    <div key={ticket.id}>
                      {seatLabel(ticket)} • {ticket.discount?.type || "normál"} • {money(ticket.final_price)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
