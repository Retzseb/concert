import { Link, NavLink, Outlet } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./Admin.css";
import logo from "../../SEATY_logo.jpg";

export function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };

    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div className="adminShell">
      {/* Topbar */}
      <header className="adminTop">
        <div className="adminTop__left">
          <div className="adminBrand">
            <img src={logo} alt="SEATY logó" className="adminLogo" />
            <div className="adminBrandText">
              <div className="adminBrandTitle">SEATY</div>
              <div className="adminBrandSub">Admin felület</div>
            </div>
          </div>
        </div>

        <div className="adminTop__right">
          <Link className="adminBtn adminBtn--ghost" to="/home">
            Vissza a főoldalra
          </Link>

          <div className="adminMenu" ref={menuRef}>
            <button
              className="adminBtn adminBtn--solid"
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={menuOpen}
            >
              👑 Admin vezérlőpult ▾
            </button>

            {menuOpen && (
              <div className="adminMenu__drop" role="menu">
                <button
                  className="adminMenu__item"
                  type="button"
                  onClick={() => {
                    console.log("Katt: Kilépés (dummy)");
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
      <div className="adminBody">
        <aside className="adminSide">
          <NavLink
            to="/admin/users"
            className={({ isActive }) => "adminNavItem" + (isActive ? " active" : "")}
          >
            Felhasználók
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) => "adminNavItem" + (isActive ? " active" : "")}
          >
            Rendelések
          </NavLink>

          <NavLink
            to="/admin/shows"
            className={({ isActive }) => "adminNavItem" + (isActive ? " active" : "")}
          >
            Előadások
          </NavLink>

          <NavLink
            to="/admin/seats"
            className={({ isActive }) => "adminNavItem" + (isActive ? " active" : "")}
          >
            Ülések
          </NavLink>

          <div className="adminNavItem adminNavItem--disabled">
            Statisztikák és riportok (később)
          </div>
        </aside>

        <main className="adminMain">
        <div>
          {/* admin header/sidebar */}
          <Outlet />
        </div>
        </main>
      </div>
    </div>
  );
}