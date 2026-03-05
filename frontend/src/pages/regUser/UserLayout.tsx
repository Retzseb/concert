import { Link, NavLink, Outlet, Navigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./Users.css";
import logo from "../../SEATY_logo.jpg";

type UserLayoutProps = {
  user: any | null;
  onLogout: () => void;
};

export function UserLayout({ user, onLogout }: UserLayoutProps) {
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

  const userName = user?.name ?? user?.username ?? user?.email ?? "Felhasználó";

  return (
    <div className="userShell">
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
                    setMenuOpen(false);
                    onLogout();
                  }}
                >
                  Kilépés
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="userBody">
        <aside className="userSide">
          <NavLink
            to="personal"
            className={({ isActive }) => "userNavItem" + (isActive ? " active" : "")}
          >
            Személyes adatai
          </NavLink>

          <NavLink
            to="orders"
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