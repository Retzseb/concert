import { useEffect, useMemo, useState } from "react";
import { loadOrders } from "../../order/ordersStorage";

export function REG_OrdersPage({ user }: { user: any }) {
  const [orders, setOrders] = useState<any[]>([]);

  const refresh = () => setOrders(loadOrders());

  useEffect(() => {
    refresh();
    const onStorage = (e: StorageEvent) => {
      if (e.key === "seaty_orders_v1") refresh();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // user azonosítás (name/email)
  const userName =
    user?.name ?? user?.user?.name ?? user?.data?.name ?? user?.email ?? "Felhasználó";
  const userEmail =
    user?.email ?? user?.user?.email ?? user?.data?.email ?? undefined;

  const mine = useMemo(() => {
    return orders
      .filter((o) => {
        // ha van userEmail tárolva, az a legjobb
        if (userEmail && o.userEmail) return o.userEmail === userEmail;
        // különben name alapján
        return o.userName === userName;
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [orders, userEmail, userName]);

  return (
    <section className="adminCard">
      <div className="adminCardHead">
        <h2>Rendeléseim</h2>
        <button className="adminBtn adminBtn--solid" type="button" onClick={refresh}>
          Frissítés
        </button>
      </div>

      {mine.length === 0 ? (
        <div className="adminPlaceholder">Még nincs rendelésed.</div>
      ) : (
        <div style={{ display: "grid", gap: 14 }}>
          {mine.map((o) => (
            <div key={o.id} className="miniCard">
              <h3 style={{ marginTop: 0, marginBottom: 8 }}>{o.id}</h3>
              <p style={{ margin: 0, opacity: 0.85 }}>
                <b>Dátum:</b> {new Date(o.createdAt).toLocaleString("hu-HU")} <br />
                <b>Státusz:</b> {o.status ?? "Függő"} <br />
                <b>Végösszeg:</b> {Number(o.total ?? 0).toLocaleString("hu-HU")} Ft
              </p>

              <div style={{ marginTop: 10, opacity: 0.9 }}>
                Tételek: {o.items?.length ?? 0} db
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}