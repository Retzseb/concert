import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getRole } from "../utility/Auth";
import { ThemeToggle } from "./ThemeToggle";

export function Header(props: { user: any | null; onLogout: () => void }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const role = getRole(props.user);
  const profileBase = role === 0 ? "/admin" : role === 2 ? "/user" : "/";

  const location = useLocation();

  const profileRef = useRef<HTMLDivElement | null>(null);
  const mobileRef = useRef<HTMLDivElement | null>(null);

  // Route váltás => csukjuk be a menüket
  useEffect(() => {
    setProfileOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  // Klikk kint => csukás
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      const t = e.target as Node;

      if (profileOpen && profileRef.current && !profileRef.current.contains(t)) {
        setProfileOpen(false);
      }
      if (mobileOpen && mobileRef.current && !mobileRef.current.contains(t)) {
        setMobileOpen(false);
      }
    }

    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [profileOpen, mobileOpen]);

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

      {/* DESKTOP NAV */}
      <nav className="nav" aria-label="Fő navigáció">
        <Link to="/concerts">Koncertek</Link>
        <Link to="/">Újdonság</Link>
      </nav>

      <div className="actions" style={{ position: "relative" }}>
        <Link to="/cart" aria-label="Kosár">
          <img
            src="/cart.png"
            alt="Kosár"
            className="cartIcon"
            style={{ width: "30px" }}
          />
        </Link>

        <ThemeToggle />

        {/* MOBIL MENÜ (520 alatt látszik CSS-sel) */}
        <div className="mobileMenu" ref={mobileRef} style={{ position: "relative" }}>
          <button
            className="pill mobileMenuBtn"
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-haspopup="menu"
          >
            Menü
          </button>

          {mobileOpen && (
            <div className="dropMenu" role="menu" aria-label="Mobil menü">
              <div className="dropMenuTitle">Menü</div>

              {/* NAV gombok */}
              <Link to="/concerts" className="btn" onClick={() => setMobileOpen(false)}>
                Koncertek
              </Link>
              <Link to="/" className="btn" onClick={() => setMobileOpen(false)}>
                Újdonság
              </Link>

              {/* AUTH gombok */}
              {!props.user ? (
                <Link to="/login" className="btn" onClick={() => setMobileOpen(false)}>
                  Bejelentkezés
                </Link>
              ) : (
                <>
                  <div className="dropMenuTitle" style={{ marginTop: 6 }}>
                    {props.user.name ?? "Bejelentkezve"}
                  </div>

                  {role === 2 && (
                    <>
                      <Link
                        to={`${profileBase}/personal`}
                        className="btn"
                        onClick={() => setMobileOpen(false)}
                      >
                        Adataim
                      </Link>
                      <Link
                        to={`${profileBase}/orders`}
                        className="btn"
                        onClick={() => setMobileOpen(false)}
                      >
                        Vásárlásaim
                      </Link>
                    </>
                  )}

                  {role === 0 && (
                    <Link
                      to="/admin"
                      className="btn"
                      onClick={() => setMobileOpen(false)}
                    >
                      Admin felület
                    </Link>
                  )}

                  <button
                    className="btn"
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      props.onLogout();
                    }}
                  >
                    Kilépés
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* PROFIL (desktop) */}
        {!props.user ? (
          <Link to="/login" className="pill desktopOnly">
            Bejelentkezés
          </Link>
        ) : (
          <div ref={profileRef} className="desktopOnly" style={{ position: "relative" }}>
            <button
              className="pill"
              type="button"
              onClick={() => setProfileOpen((o) => !o)}
              aria-expanded={profileOpen}
              aria-haspopup="menu"
            >
              Profil
            </button>

            {profileOpen && (
              <div className="dropMenu" role="menu" aria-label="Profil menü">
                <div className="dropMenuTitle">{props.user.name ?? "Bejelentkezve"}</div>

                {role === 2 && (
                  <>
                    <Link
                      className="btn"
                      to={`${profileBase}/personal`}
                      onClick={() => setProfileOpen(false)}
                    >
                      Adataim
                    </Link>
                    <Link
                      className="btn"
                      to={`${profileBase}/orders`}
                      onClick={() => setProfileOpen(false)}
                    >
                      Vásárlásaim
                    </Link>
                  </>
                )}

                {role === 0 && (
                  <Link className="btn" to="/admin" onClick={() => setProfileOpen(false)}>
                    Admin felület
                  </Link>
                )}

                <button
                  className="btn"
                  type="button"
                  onClick={() => {
                    setProfileOpen(false);
                    props.onLogout();
                  }}
                >
                  Kilépés
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}