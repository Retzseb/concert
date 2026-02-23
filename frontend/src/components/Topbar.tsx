import { Link } from "react-router-dom";
import logo from "../SEATY_logo.jpg";

export function Topbar() {
  return (
    <header className="topbar">
      <div className="container topbar__inner">
        <Link className="brand" to="/" aria-label="SEATY főoldal">
          <img src={logo} alt="SEATY logó" className="logoImg" />
          <div>SEATY</div>
        </Link>

        <nav className="nav" aria-label="Fő navigáció">
          <a href="#concerts">Koncertek</a>
          <a href="#shows">Show</a>
          <a href="#events">Események</a>
        </nav>

        <div className="actions">
          <Link className="btn" to="/register">Regisztráció</Link>
          <Link className="btn" to="/login">Bejelentkezés</Link>
        </div>
      </div>
    </header>
  );
}