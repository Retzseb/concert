import { useMemo } from "react";

type OrderMini = {
  orderNumber: string;
  showTitle: string;
  dateTime: string;
  status: string;
};

export function REG_OrdersPage() {
  // egyelőre üres
  const orders = useMemo<OrderMini[]>(() => [], []);

  return (
    <section className="userCard">
      <div className="userCardHead">
        <h2>Foglalásai / vásárlásai</h2>
      </div>

      {orders.length === 0 ? (
        <div className="userEmpty">
          <div className="userEmptyTitle">Még nincs rendelésed</div>
          <div className="userEmptyText">
            Ha vásárolsz vagy foglalsz jegyet, itt fog megjelenni a listában.
          </div>
        </div>
      ) : (
        <div className="userOrdersGrid">
          {orders.map((o) => (
            <div key={o.orderNumber} className="userOrderTile">
              {/* ...kártya tartalom... */}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}