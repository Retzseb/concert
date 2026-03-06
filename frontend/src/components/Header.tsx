import React, { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Link } from "react-router-dom";

export function Header(props: { user: any | null; onLogout: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="container topbar__inner">
      <Link to="/" className="brand" aria-label="SEATY főoldal">
        <img src="/SEATY_logo.jpg" alt="SEATY logó" className="logoImg" />
      </Link>

      <nav className="nav" aria-label="Fő navigáció">
        <Link to="/concerts">Koncertek</Link>
        <Link to="/">Újdonság</Link>
      </nav>

      <div className="actions" style={{ position: "relative" }}>
        <Link to="/cart">
          <img src="cart.png" alt="" className="cartIcon" style={{ width: "30px" }} />
        </Link>
        <ThemeToggle />
        {!props.user ? (
          <Link to="/login" className="pill">
            Bejelentkezés
          </Link>
        ) : (
          <>
            <button className="pill" type="button" onClick={() => setOpen((o) => !o)}>
              Profil
            </button>

            {open && (
              <div
                className="miniCard"
                style={{
                  position: "absolute",
                  right: 0,
                  top: "calc(100% + 8px)",
                  minWidth: 220,
                }}
              >
                <div style={{ marginBottom: 10, opacity: 0.85 }}>
                  {props.user.name ?? "Bejelentkezve"}
                </div>

                <div style={{ display: "grid", gap: 8 }}>
                  <ul>
                  <li className="btn" onClick={() => <Link to="/user/personal"></Link>}>Adataim</li>
                  <li className="btn" onClick={() => <Link to="/user/orders"></Link>}>Vásárlásaim</li>
                  <li
                    className="btn"
                    onClick={() => {
                      setOpen(false);
                      props.onLogout();
                    }}
                  >
                    Kilépés
                  </li>
                  </ul>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}