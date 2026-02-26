
export function OrdersPage() {
  return (
    <section className="adminCard">
      <div className="adminCardHead">
        <h2>Rendelések</h2>
        <button className="adminBtn adminBtn--solid" type="button">
          + Új rendelés (dummy)
        </button>
      </div>

      <p className="adminMuted">
        Itt lesz a rendelések listázása, módosítása és törlése. (Később: backend összekötés.)
      </p>

      <div className="adminPlaceholder">
        <div>• Lista táblázat (Order ID, user, előadás, helyek, összeg, státusz)</div>
        <div>• Módosítás (státusz: függő / fizetve / törölve)</div>
        <div>• Törlés</div>
      </div>
    </section>
  );
}