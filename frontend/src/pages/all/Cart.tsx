import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../cart/cartProvider";
import { appendOrder, markSeatsSold, DiscountType } from "../../order/ordersStorage";

const discountLabel: Record<DiscountType, string> = {
  full: "Teljesárú",
  student: "Diák (−30%)",
  senior: "Szenior (−30%)",
};

function discountedPrice(base: number, d: DiscountType) {
  if (d === "student" || d === "senior") return Math.round(base * 0.7);
  return base;
}

export function Cart({ user }: { user: any | null }) {
  const nav = useNavigate();
  const { items, removeItem, clear, updateDiscount } = useCart();

  const total = items.reduce((s, it) => {
    const d: DiscountType = (it.discount ?? "full") as DiscountType;
    return s + discountedPrice(it.price, d);
  }, 0);

  const finalizeOrder = () => {
    if (!user) {
      nav("/login");
      return;
    }
    if (items.length === 0) return;

    const now = new Date();
    const orderId = `ORD-${now.getTime()}`;

    // ✅ innen jön az automatikus név
    const userName = user?.name ?? user?.email ?? "Felhasználó";
    const userEmail = user?.email ?? undefined;

    const orderItems = items.map((it) => {
      const d: DiscountType = (it.discount ?? "full") as DiscountType;
      const finalPrice = discountedPrice(it.price, d);

      return {
        concertId: it.concertId,
        concertName: it.concertName,
        date: it.date,
        place: it.place,
        seatId: it.seatId,
        basePrice: it.price,
        discount: d,
        finalPrice,
      };
    });

    const orderTotal = orderItems.reduce((s, x) => s + x.finalPrice, 0);

    appendOrder({
      id: orderId,
      userName,
      userEmail,
      createdAt: now.toISOString(),
      status: "Függő",
      total: orderTotal,
      items: orderItems,
    });

    // Sold seat-ek mentése concertenként
    const byConcert = new Map<number, string[]>();
    for (const it of orderItems) {
      const arr = byConcert.get(it.concertId) ?? [];
      arr.push(it.seatId);
      byConcert.set(it.concertId, arr);
    }
    byConcert.forEach((seatIds, concertId) => markSeatsSold(concertId, seatIds));

    clear();
    nav(`/checkout/success/${orderId}`);
  };

  return (
    <section className="section">
      <div className="sectionHead">
        <h2>Kosár</h2>
        <Link className="btn" to="/concerts">
          Koncertek
        </Link>
      </div>

      {items.length === 0 ? (
        <p>A kosár üres.</p>
      ) : (
        <>
          <ul className="c_list">
            {items.map((it) => {
              const d: DiscountType = (it.discount ?? "full") as DiscountType;
              const finalPrice = discountedPrice(it.price, d);

              return (
                <li className="c_element c_element--cart" key={`${it.concertId}:${it.seatId}`}>
                  <div className="c_element_data cartItem">
                    {/* BAL: adatok */}
                    <div className="cartItemMain">
                      <h3 className="cardTitle cartItemTitle">{it.concertName}</h3>

                      <ul className="cartItemList">
                        <li>Szék: {it.seatId}</li>
                        {it.date && <li>Időpont: {it.date}</li>}
                        {it.place && <li>Helyszín: {it.place}</li>}

                        <li>
                          Ár:{" "}
                          {d === "full" ? (
                            <b>{it.price} Ft</b>
                          ) : (
                            <>
                              <span style={{ textDecoration: "line-through", opacity: 0.75 }}>
                                {it.price} Ft
                              </span>{" "}
                              <b>{finalPrice} Ft</b>
                            </>
                          )}
                        </li>
                      </ul>
                    </div>

                    {/* JOBB: műveletek */}
                    <div className="cartItemSide">
                      <label className="label" style={{ margin: 0 }}>
                        Kedvezmény
                      </label>

                      <select
                        className="select cartDiscount"
                        value={d}
                        onChange={(e) =>
                          updateDiscount(it.concertId, it.seatId, e.target.value as DiscountType)
                        }
                      >
                        <option value="full">{discountLabel.full}</option>
                        <option value="student">{discountLabel.student}</option>
                        <option value="senior">{discountLabel.senior}</option>
                      </select>

                      <button
                        className="btn cartRemove"
                        type="button"
                        onClick={() => removeItem(it.concertId, it.seatId)}
                      >
                        Törlés
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div
            style={{
              marginTop: 14,
              display: "flex",
              gap: 12,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <button className="btn" type="button" onClick={clear}>
              Kosár ürítése
            </button>

            <div style={{ opacity: 0.9 }}>
              Végösszeg: <b>{total.toLocaleString("hu-HU")} Ft</b>
            </div>

            <button
              className="btn"
              type="button"
              onClick={finalizeOrder}
              disabled={!user}
              title={!user ? "A rendelés leadásához be kell jelentkezni." : undefined}
            >
              Rendelés véglegesítése
            </button>

            {!user && (
              <span style={{ opacity: 0.75 }}>
                (A rendeléshez bejelentkezés szükséges.)
              </span>
            )}
          </div>
        </>
      )}
    </section>
  );
}