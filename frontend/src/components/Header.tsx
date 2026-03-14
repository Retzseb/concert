import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getRole } from "../utility/Auth";
import { ThemeToggle } from "./ThemeToggle";

export function Header(props: { user: any | null; onLogout: () => void }) {
  const [open, setOpen] = useState(false);
  const role = getRole(props.user);
  const profileBase = role === 0 ? "/admin" : role === 2 ? "/user" : "/";

  const menuRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  // 1) Route váltáskor csukjuk be
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // 2) Kattintás a menün kívül → csukjuk be
  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      if (!open) return;
      const el = menuRef.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) setOpen(false);
    }

    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, [open]);

  return (
    <div className="container topbar__inner">
      <Link to="/" className="brand" aria-label="SEATY főoldal">
        <img
          src="/SEATY_newLogo_Black.png"
          alt="SEATY logó"
          className="logoImg logoImg--dark"
        />
        <img
          src="/SEATY_newLogo_White.jpg"
          alt="SEATY logó"
          className="logoImg logoImg--light"
        />
      </Link>

      <nav className="nav" aria-label="Fő navigáció">
        <Link to="/concerts">Koncertek</Link>
        <Link to="/">Újdonság</Link>
      </nav>

      {/* ref ide kerüljön, hogy a dropdown + gomb is “bent” legyen */}
      <div className="actions" ref={menuRef} style={{ position: "relative" }}>
        <Link to="/cart">
          <img
            src="/cart.png"
            alt="Kosár"
            className="cartIcon"
            style={{ width: "30px" }}
          />
        </Link>

        <ThemeToggle />

        {!props.user ? (
          <Link to="/login" className="pill">
            Bejelentkezés
          </Link>
        ) : (
          <>
            <button
              className="pill"
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-haspopup="menu"
              aria-expanded={open}
            >
              Profil
            </button>

            {open && (
              <div
                className="miniCard"
                role="menu"
                style={{
                  position: "absolute",
                  right: 0,
                  top: "calc(100% + 8px)",
                  minWidth: 220,
                  zIndex: 9999,
                }}
              >
                <div style={{ marginBottom: 10, opacity: 0.85 }}>
                  {props.user.name ?? "Bejelentkezve"}
                </div>

                <div style={{ display: "grid", gap: 8 }}>
                  {role === 2 && (
                    <>
                      <Link
                        className="btn"
                        to={`${profileBase}/personal`}
                        onClick={() => setOpen(false)}
                      >
                        Adataim
                      </Link>
                      <Link
                        className="btn"
                        to={`${profileBase}/orders`}
                        onClick={() => setOpen(false)}
                      >
                        Vásárlásaim
                      </Link>
                    </>
                  )}

                  {role === 0 && (
                    <Link
                      className="btn"
                      to="/admin"
                      onClick={() => setOpen(false)}
                    >
                      Admin felület
                    </Link>
                  )}

                  <button
                    className="btn"
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      props.onLogout();
                    }}
                  >
                    Kilépés
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}