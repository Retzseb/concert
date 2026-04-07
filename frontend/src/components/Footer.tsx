import { useMemo, useState } from "react";

export function Footer() {
  const [page, setPage] = useState("home");

  return (
        <div className="container">
          <div className="footGrid">
            <div>
              <div className="logoImg" style={{ marginBottom: 10 }}>
                <img src="/SEATY_newLogo_Black.png" alt="SEATY logó" className="logoImg logoImg--dark" />
        <img src="/SEATY_newLogo_White.jpg" alt="SEATY logó" className="logoImg logoImg--light" />
              </div>
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
