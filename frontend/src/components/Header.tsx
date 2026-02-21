import { useMemo, useState } from "react";

export function Header() {
  const [page, setPage] = useState("home");

  return (
        <div className="container topbar__inner">
          <button
            className="brand"
            onClick={() => setPage("home")}
            aria-label="SEATY főoldal"
            style={{ background: "transparent", border: 0, cursor: "pointer" }}
          >
            <img src="/SEATY_logo.jpg" alt="SEATY logó" className="logoImg" />
          </button>

          <nav className="nav" aria-label="Fő navigáció">
            <a
              href="#concerts"
              onClick={(e) => {
                e.preventDefault();
                setPage("home");
              }}
            >
              Koncertek
            </a>
            <a
              href="#news"
              onClick={(e) => {
                e.preventDefault();
                setPage("home");
              }}
            >
              Újdonság
            </a>
          </nav>
          <div className="actions">
            <span className="pill">Kosár</span>
          </div>
        </div>
  );
}
