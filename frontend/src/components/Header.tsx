import { Link } from "react-router-dom";

export function Header() {
  return (
    <div className="container topbar__inner">
      <Link to="/" className="brand" aria-label="SEATY főoldal">
        <img src="/SEATY_logo.jpg" alt="SEATY logó" className="logoImg" />
      </Link>

      <nav className="nav" aria-label="Fő navigáció">
        <Link to="/concerts">Koncertek</Link>
        <Link to="/">Újdonság</Link>
      </nav>

      <div className="actions">
          <Link to="/cart">
          <img
            src="cart.png"
            alt=""
            style={{ width: "30px", filter: "invert(100%)" }}
          /></Link>
      </div>

      <div className="actions">
        <Link to="/login" className="pill">Bejelentkezés</Link>
      </div>
    </div>
  );
}