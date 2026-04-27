import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { User } from "../types";
import { getRole } from "../utility/Auth";
import { ThemeToggle } from "./ThemeToggle";

type HeaderProps = {
  user: User | null;
  onLogout: () => void;
};

export function Header({ user, onLogout }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  const mobileRef = useRef<HTMLDivElement | null>(null);

  const role = getRole(user);
  const profileBase = role === 0 ? "/admin" : role === 2 ? "/user" : "/";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const t = event.target as Node;

      if (open && menuRef.current && !menuRef.current.contains(t)) {
        setOpen(false);
      }

      if (mobileOpen && mobileRef.current && !mobileRef.current.contains(t)) {
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, mobileOpen]);

  const isAdmin = role === 0;

  return (
    <div className="container topbar__inner">
      <Link to={isAdmin ? "/admin" : "/"} className="brand" aria-label="SEATY főoldal">
        <img src="/SEATY_newLogo_Black.png" alt="SEATY logó" className="logoImg logoImg--dark" />
        <img src="/SEATY_newLogo_White.jpg" alt="SEATY logó" className="logoImg logoImg--light" />
      </Link>

      {!isAdmin && (
        <nav className="nav" aria-label="Fő navigáció">
          <NavLink to="/concerts">Koncertek</NavLink>
          <NavLink to="/favorites">Kedvencek</NavLink>
        </nav>
      )}

      <div className="actions actions--menu" ref={menuRef}>
        {!isAdmin && (
          <Link to="/cart" aria-label="Kosár megnyitása">
            <img src="/cart.png" alt="Kosár" className="cartIcon cartIcon--header" />
          </Link>
        )}

        <ThemeToggle />

        {/* 520 ALATT: MOBIL MENÜ */}
        {!isAdmin && (
          <div className="mobileOnly" ref={mobileRef} style={{ position: "relative" }}>
            <button
              className="pill"
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-haspopup="menu"
            >
              Menü
            </button>

            {mobileOpen && (
              <div className="miniCard profileMenu" role="menu">
                <div className="profileMenu__actions">
                  <NavLink className="btn" to="/concerts" onClick={() => setMobileOpen(false)}>
                    Koncertek
                  </NavLink>
                  <NavLink className="btn" to="/favorites" onClick={() => setMobileOpen(false)}>
                    Kedvencek
                  </NavLink>

                  <div style={{ height: 1, background: "var(--line)", margin: "6px 0" }} />

                  {!user ? (
                    <Link className="btn" to="/login" onClick={() => setMobileOpen(false)}>
                      Bejelentkezés
                    </Link>
                  ) : (
                    <>
                      {role === 2 && (
                        <>
                          <Link
                            className="btn"
                            to={`${profileBase}/personal`}
                            onClick={() => setMobileOpen(false)}
                          >
                            Adataim
                          </Link>
                          <Link
                            className="btn"
                            to={`${profileBase}/orders`}
                            onClick={() => setMobileOpen(false)}
                          >
                            Vásárlásaim
                          </Link>
                        </>
                      )}

                      {role === 0 && (
                        <Link className="btn" to="/admin" onClick={() => setMobileOpen(false)}>
                          Admin felület
                        </Link>
                      )}

                      <button
                        className="btn"
                        type="button"
                        onClick={() => {
                          setMobileOpen(false);
                          onLogout();
                        }}
                      >
                        Kilépés
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Desktop bejelentkezés / profil menü */}
        {!user ? (
          <Link to="/login" className="pill desktopOnly">
            Bejelentkezés
          </Link>
        ) : (
          <div className="desktopOnly">
            <button className="pill" type="button" onClick={() => setOpen((prev) => !prev)}>
              Profil
            </button>

            {open && (
              <div className="miniCard profileMenu">
                <div className="profileMenu__name">{user.name ?? "Bejelentkezve"}</div>

                <div className="profileMenu__actions">
                  {role === 2 && (
                    <>
                      <Link className="btn" to={`${profileBase}/personal`} onClick={() => setOpen(false)}>
                        Adataim
                      </Link>
                      <Link className="btn" to={`${profileBase}/orders`} onClick={() => setOpen(false)}>
                        Vásárlásaim
                      </Link>
                    </>
                  )}

                  {role === 0 && (
                    <Link className="btn" to="/admin" onClick={() => setOpen(false)}>
                      Admin felület
                    </Link>
                  )}

                  <button
                    className="btn"
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      onLogout();
                    }}
                  >
                    Kilépés
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}