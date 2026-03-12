import { Link, useParams } from "react-router-dom";
import { getOrderById } from "../../order/ordersStorage";

export function CheckoutSuccess() {
  const { orderId } = useParams();
  const order = orderId ? getOrderById(orderId) : undefined;

  if (!order) {
    return (
      <section className="section">
        <div className="sectionHead">
          <h2>Rendelés</h2>
          <Link className="btn" to="/home">Főoldal</Link>
        </div>
        <p>Nem található rendelés.</p>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="sectionHead">
        <h2>Sikeres rendelés ✅</h2>
        <Link className="btn" to="/concerts">Koncertek</Link>
      </div>

      <div className="miniCard">
        <p style={{ marginTop: 0, opacity: 0.9 }}>
          <b>Order:</b> {order.id}<br/>
          <b>Név:</b> {order.userName}<br/>
          <b>Státusz:</b> {order.status}<br/>
          <b>Dátum:</b> {new Date(order.createdAt).toLocaleString("hu-HU")}
        </p>

        <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 8 }}>
          {order.items.map((it) => (
            <li key={`${it.concertId}:${it.seatId}`}>
              <b>{it.concertName}</b> • {it.seatId}
              {it.date ? ` • ${it.date}` : ""}
              {it.place ? ` • ${it.place}` : ""}
              {" — "}
              <b>{it.finalPrice} Ft</b>
              {it.discount !== "full" ? <span style={{ opacity: 0.75 }}> ({it.discount})</span> : null}
            </li>
          ))}
        </ul>

        <div style={{ marginTop: 12, opacity: 0.9 }}>
          Végösszeg: <b>{order.total.toLocaleString("hu-HU")} Ft</b>
        </div>

        <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link className="btn" to="/user/orders">Rendeléseim</Link>
        </div>
      </div>
    </section>
  );
}