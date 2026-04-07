import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utility/date";
import { useCart } from "../../cart/cartProvider";
import { API_BASE } from "../../utility/config";

type Discount = {
  id: number;
  type: string;
  value: number;
};

async function extractMessage(res: Response) {
  try {
    const data = await res.json();
    return data?.message || `HTTP ${res.status}`;
  } catch {
    return `HTTP ${res.status}`;
  }
}

function money(value: number) {
  return `${Math.round(value)} Ft`;
}

export function Cart() {
  const { items, removeItem, updateDiscount, clear } = useCart();
  const [saving, setSaving] = useState(false);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [discountsLoading, setDiscountsLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadDiscounts = async () => {
      try {
        setDiscountsLoading(true);
        const res = await fetch(`${API_BASE}/api/discounts`, {
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          setDiscounts(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error(error);
        if (!cancelled) setDiscounts([]);
      } finally {
        if (!cancelled) setDiscountsLoading(false);
      }
    };

    loadDiscounts();
    return () => {
      cancelled = true;
    };
  }, []);

  const discountMap = useMemo(() => {
    const map = new Map<number, Discount>();
    discounts.forEach((discount) => map.set(Number(discount.id), discount));
    return map;
  }, [discounts]);

  const getDiscountPercent = (discountId: number) => {
    return Number(discountMap.get(discountId)?.value ?? 100);
  };

  const getDiscountLabel = (discountId: number) => {
    return discountMap.get(discountId)?.type ?? "normál";
  };

  const total = items.reduce((sum, item) => {
    const discountPercent = getDiscountPercent(item.discountId);
    return sum + item.price * (discountPercent / 100);
  }, 0);

  const finalizeReservation = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.alert("A foglaláshoz előbb be kell jelentkezned.");
      return;
    }

    if (items.length === 0) {
      window.alert("A kosár üres.");
      return;
    }

    const grouped = new Map<number, { concertName: string; items: typeof items }>();
    for (const item of items) {
      const current = grouped.get(item.concertId) ?? { concertName: item.concertName, items: [] as typeof items };
      current.items.push(item);
      grouped.set(item.concertId, current);
    }

    try {
      setSaving(true);

      for (const [concertId, data] of Array.from(grouped.entries())) {
        const res = await fetch(`${API_BASE}/api/reservations`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            concert_id: concertId,
            items: data.items.map((item) => ({
              seat_id: item.seatDbId,
              discount_id: item.discountId,
            })),
          }),
        });

        if (!res.ok) {
          throw new Error(`${data.concertName}: ${await extractMessage(res)}`);
        }
      }

      clear();
      window.alert("A foglalás sikeresen mentve lett.");
    } catch (error: any) {
      window.alert(error?.message || "A foglalás mentése nem sikerült.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="section">
      <div className="sectionHead">
        <Link className="btn" to="/concerts">Vissza a koncertekhez</Link>
      </div>

      {items.length === 0 ? (
        <p>A kosár üres.</p>
      ) : (
        <>
              <div className="sectionHead">
        <h2>Kosár</h2>
      </div>
          <ul className="c_list">
            {items.map((it) => {
              const discountPercent = getDiscountPercent(it.discountId);
              const finalPrice = it.price * (discountPercent / 100);

              return (
                <li className="c_element" key={`${it.concertId}:${it.seatDbId}`}>
                  <div className="c_element_data">
                    <h3 className="cardTitle" style={{ marginBottom: 6 }}>
                      {it.concertName}
                    </h3>
                    <ul>
                      <li>Szék: {it.seatId}</li>
                      {it.date && <li>Időpont: {formatDate(it.date)}</li>}
                      {it.place && <li>Helyszín: {it.place}</li>}
                      <li>Alapár: {money(it.price)}</li>
                      <li>
                        Kedvezmény: {discountsLoading ? "Betöltés..." : (
                          <select
                            value={it.discountId}
                            onChange={(e) => updateDiscount(it.concertId, it.seatDbId, Number(e.target.value))}
                          >
                            {discounts.map((discount) => (
                              <option key={discount.id} value={discount.id}>
                                {discount.type} ({discount.value}%)
                              </option>
                            ))}
                          </select>
                        )}
                      </li>
                      <li>Fizetendő: {money(finalPrice)}</li>
                    </ul>

                    <button
                      className="btn"
                      type="button"
                      onClick={() => removeItem(it.concertId, it.seatDbId)}
                    >
                      Törlés
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <div style={{ marginTop: 14, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <button className="btn" type="button" onClick={clear} disabled={saving}>
              Kosár ürítése
            </button>
            <button className="btn" type="button" onClick={finalizeReservation} disabled={saving || discountsLoading}>
              {saving ? "Mentés..." : "Foglalás véglegesítése"}
            </button>
            <button className="btn" type="button" onClick={() => window.alert("A fizetés funkció későbbi fejlesztés lesz.")} disabled={saving}>
              Fizetés
            </button>
            <div style={{ opacity: 0.9 }}>
              Végösszeg: <b>{money(total)}</b>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
