import { Link } from "react-router-dom";
import { useCart } from "../../cart/cartProvider";

export function Cart() {
  const { items, removeItem, clear } = useCart();

  const total = items.reduce((s, it) => s + it.price, 0);

  return (
    <section className="section">
      <div className="sectionHead">
        <h2>Kosár</h2>
        <Link className="btn" to="/concerts">Koncertek</Link>
      </div>

      {items.length === 0 ? (
        <p>A kosár üres.</p>
      ) : (
        <>
          <ul className="c_list">
            {items.map((it) => (
              <li className="c_element" key={`${it.concertId}:${it.seatId}`}>
                <div className="c_element_data">
                  <h3 className="cardTitle" style={{ marginBottom: 6 }}>
                    {it.concertName}
                  </h3>
                  <ul>
                    <li>Szék: {it.seatId}</li>
                    {it.date && <li>Időpont: {it.date}</li>}
                    {it.place && <li>Helyszín: {it.place}</li>}
                    <li>Ár: {it.price} Ft</li>
                  </ul>

                  <button
                    className="btn"
                    type="button"
                    onClick={() => removeItem(it.concertId, it.seatId)}
                  >
                    Törlés
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: 14, display: "flex", gap: 12, alignItems: "center" }}>
            <button className="btn" type="button" onClick={clear}>
              Kosár ürítése
            </button>
            <div style={{ opacity: 0.9 }}>
              Végösszeg: <b>{total} Ft</b>
            </div>
          </div>

          <p style={{ marginTop: 10, opacity: 0.75 }}>
            (Fizetés / rendelés leadás backend után jön.)
          </p>
        </>
      )}
    </section>
  );
}