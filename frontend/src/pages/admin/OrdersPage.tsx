import { useEffect, useMemo, useState } from "react";
import { loadOrders } from "../../order/ordersStorage"; // <-- igazítsd, ha más
// opcionális: import type { OrderRecord } from "../../order/ordersStorage";

export function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  const refresh = () => setOrders(loadOrders());

  useEffect(() => {
    refresh();
    // hogy másik tabon mentéskor is frissüljön
    const onStorage = (e: StorageEvent) => {
      if (e.key === "seaty_orders_v1") refresh();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rows = useMemo(() => {
    return [...orders].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [orders]);

  return (
    <section className="adminCard">
      <div className="adminCardHead">
        <h2>Rendelések</h2>
        <button className="adminBtn adminBtn--solid" type="button" onClick={refresh}>
          Frissítés
        </button>
      </div>

      {rows.length === 0 ? (
        <div className="adminPlaceholder">Még nincs rendelés.</div>
      ) : (
        <div className="adminTableWrap">
          <table className="adminTable">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Név</th>
                <th>Dátum</th>
                <th>Tételek</th>
                <th>Összeg</th>
                <th>Státusz</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((o) => (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{o.userName ?? "-"}</td>
                  <td>{new Date(o.createdAt).toLocaleString("hu-HU")}</td>
                  <td>{o.items?.length ?? 0} db</td>
                  <td>{Number(o.total ?? 0).toLocaleString("hu-HU")} Ft</td>
                  <td>{o.status ?? "Függő"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}