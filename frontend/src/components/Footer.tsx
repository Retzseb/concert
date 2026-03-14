import { useMemo, useState } from "react";

export function Footer() {
  const [page, setPage] = useState("home");

  return (
        <div className="container">
          <div className="footGrid">
            <div>
              <div className="brand" style={{ marginBottom: 10 }}>
                <img
                  src="/SEATY_logo.jpg"
                  alt="SEATY logó"
                  className="logoImg"
                />
              </div>
              <div style={{ color: "rgba(243,241,255,.65)", fontWeight: 650 }}>
                Hasznos linkek
              </div>
            </div>

            <div>
              <h5>Menü</h5>
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
            </div>

            <div>
              <h5>Fiók</h5>
              <a
                href="#login"
                onClick={(e) => {
                  e.preventDefault();
                  setPage("login");
                }}
              >
                Belépés
              </a>
              <a href="#register" onClick={(e) => e.preventDefault()}>
                Regisztráció
              </a>
            </div>

            <div>
              <h5>Jogi</h5>
              <a href="#impresszum" onClick={(e) => e.preventDefault()}>
                Impresszum
              </a>
              <a href="#aszf" onClick={(e) => e.preventDefault()}>
                ÁSZF
              </a>
              <a href="#adatkezeles" onClick={(e) => e.preventDefault()}>
                Adatkezelés
              </a>
            </div>
          </div>

          <div
            className="authors">
            <br></br>© 2026 SEATY – Vizsgaremek UI – React + TypeScript (CRA),
            <br></br>Bíró Eszter & Szépréthy Regina
          </div>
        </div>
  );
}
