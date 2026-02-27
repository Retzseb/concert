import { Link, NavLink, Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./Users.css";
import logo from "../../SEATY_logo.jpg";

export function UserLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // demo név (később auth-ból jön)
  const userName = "Felhasználó neve";

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div className="userShell">
      {/* Topbar */}
      <header className="userTop">
        <div className="userTop__left">
          <div className="userBrand">
            <img src={logo} alt="SEATY logó" className="userLogo" />
            <div className="userBrandText">
              <div className="userBrandTitle">SEATY</div>
              <div className="userBrandSub">Fiók</div>
            </div>
          </div>
        </div>

        <div className="userTop__right">
          <Link className="userBtn userBtn--ghost" to="/home">
            Vissza a főoldalra
          </Link>

          {/* User dropdown */}
          <div className="userMenu" ref={menuRef}>
            <button
              className="userBtn userBtn--solid"
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
            >
              👤 {userName} ▾
            </button>

            {menuOpen && (
              <div className="userMenu__drop" role="menu">
                <button
                  className="userMenu__item"
                  type="button"
                  onClick={() => {
                    console.log("Kilépés (dummy)");
                    setMenuOpen(false);
                  }}
                >
                  Kilépés
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="userBody">
        <aside className="userSide">
          <NavLink
            to="/user/personal"
            className={({ isActive }) => "userNavItem" + (isActive ? " active" : "")}
          >
            Személyes adatai
          </NavLink>

          <NavLink
            to="/user/orders"
            className={({ isActive }) => "userNavItem" + (isActive ? " active" : "")}
          >
            Foglalásai / vásárlásai
          </NavLink>

          <div className="userNavItem userNavItem--disabled">
            Fiókbeállítások (később)
          </div>
        </aside>

        <main className="userMain">
          <Outlet />
        </main>
      </div>
    </div>
  );
}