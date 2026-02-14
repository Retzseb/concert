import { useMemo, useState } from "react";

type Page = "home" | "login";

export default function App() {
  
  const [page, setPage] = useState<Page>("home");

  //LOGIN
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const login = async () => {
    setMessage("");

    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setMessage("Hibás email vagy jelszó");
        return;
      }

      const data = await res.json();
      localStorage.setItem("token", data.access_token);

      setLoggedIn(true);
      setMessage("Sikeres belépés!");
    } catch {
      setMessage("Nem sikerült csatlakozni a szerverhez (backend fut?)");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setEmail("");
    setPassword("");
    setMessage("Kijelentkezve.");
  };

  
  const fallbackVars = useMemo(
    () =>
      ({
        ["--violet" as any]: "var(--green)",
        ["--violet2" as any]: "var(--green2)",
        ["--pink" as any]: "var(--green3)",
      }) as React.CSSProperties,
    []
  );

  return (
    <div style={fallbackVars}>
      <header className="topbar">
        <div className="container topbar__inner">
          <button
            className="brand"
            onClick={() => setPage("home")}
            aria-label="SEATY főoldal"
            style={{ background: "transparent", border: 0, cursor: "pointer" }}
          >
            <img
              src="/SEATY_logo.jpg"
              alt="SEATY logó"
              className="logoImg"
            />

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

            {!loggedIn ? (
              <>
                <button className="btn" type="button" onClick={() => setPage("login")}>
                  Belépés
                </button>
                <button className="btn" type="button" onClick={() => setPage("login")}>
                  Regisztráció
                </button>
              </>
            ) : (
              <>
                <span className="pill">Szia, {email}</span>
                <button className="btn" type="button" onClick={logout}>
                  Kilépés
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main>
        {/* HOME */}
        {page === "home" && (
          <>
            <section className="hero" aria-label="Kezdőlap">
              <div className="container heroGrid">
                <article className="heroCard">
                  <div className="heroCard__inner">
                  

                    <h1 className="heroTitle">SEATY</h1>
                    <p className="heroSub">
                      Gyors jegy, biztos hely!
                    </p>

                    <div className="searchPanel" aria-label="Kereső (placeholder)">
                      <div className="field">
                        <div className="label">Keresés</div>
                        <input className="input" placeholder="Koncert / előadó" />
                      </div>

                      <div className="field">
                        <div className="label">Dátum</div>
                        <input className="input" placeholder="YYYY-MM-DD" />
                      </div>

                      <div className="field">
                        <div className="label">Helyszín</div>
                        <select className="select" defaultValue="Összes">
                          <option>Összes</option>
                          <option>Budapest Park</option>
                          <option>A38</option>
                          <option>Müpa</option>
                        </select>
                      </div>

                      <div className="field">
                        <div className="label">Műfaj</div>
                        <select className="select" defaultValue="Összes">
                          <option>Összes</option>
                          <option>Rock</option>
                          <option>Pop</option>
                          <option>Jazz</option>
                        </select>
                      </div>

                      <button className="searchBtn" type="button">
                        Keresés
                      </button>
                    </div>
                  </div>
                </article>

                <aside className="heroSide" aria-label="Oldalsáv">
                  <div className="miniCard"> 
                     <h3>Gyors belépés *</h3> {/*nem hiszem, hogy ez kell 2x */}
                    <p>Ha már van fiókod, lépj be és folytasd a foglalást.</p>
                    <button
                      className="btn"
                      type="button"
                      onClick={() => setPage("login")}
                      style={{ width: "100%", borderRadius: 14, marginTop: 10 }}
                    >
                      Belépés
                    </button>
                  </div>

                  <div className="miniCard">
                    <h3>SEATY tipp</h3>
                    <p>Később ide jöhet “kiemelt koncert”, “új események”, stb.</p>
                  </div>
                </aside>
              </div>
            </section>

            <section className="section" id="concerts">
              <div className="container">
                <div className="sectionHead">
                  <h2>Koncertek (demo)</h2>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    Összes megtekintése →
                  </a>
                </div>

                <div className="grid">
                  <article className="card">
                    <div className="thumb">
                      <span className="badge">Rock</span>
                    </div>
                    <div className="cardBody">
                      <h3 className="cardTitle">Tankcsapda – Tavaszi koncert</h3>
                      <p className="meta">2026.03.12 • Budapest Park • Terem 1</p>
                      <div className="priceRow">
                        <span className="price">12 990 Ft</span>
                        <span className="cta">Részletek</span>
                      </div>
                    </div>
                  </article>

                  <article className="card">
                    <div
                      className="thumb"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(34,197,94,.28), rgba(168,85,247,.45))",
                      }}
                    >
                      <span className="badge">Pop</span>
                    </div>
                    <div className="cardBody">
                      <h3 className="cardTitle">Halott Pénz – Turné</h3>
                      <p className="meta">2026.04.05 • A38 • Terem 1</p>
                      <div className="priceRow">
                        <span className="price">14 990 Ft</span>
                        <span className="cta">Részletek</span>
                      </div>
                    </div>
                  </article>

                  <article className="card">
                    <div
                      className="thumb"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(236,72,153,.35), rgba(124,58,237,.38))",
                      }}
                    >
                      <span className="badge">Indie</span>
                    </div>
                    <div className="cardBody">
                      <h3 className="cardTitle">Ivan &amp; The Parazol – Klub</h3>
                      <p className="meta">2026.03.08 • Dürer Kert • Terem 1</p>
                      <div className="priceRow">
                        <span className="price">10 990 Ft</span>
                        <span className="cta">Részletek</span>
                      </div>
                    </div>
                  </article>

                  <article className="card">
                    <div
                      className="thumb"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(59,130,246,.18), rgba(168,85,247,.42))",
                      }}
                    >
                      <span className="badge">Jazz</span>
                    </div>
                    <div className="cardBody">
                      <h3 className="cardTitle">Budapest Jazz Collective</h3>
                      <p className="meta">2026.03.01 • Müpa • Terem 2</p>
                      <div className="priceRow">
                        <span className="price">8 990 Ft</span>
                        <span className="cta">Részletek</span>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </section>
          </>
        )}

        {/* LOGIN */}
        {page === "login" && (
          <section className="section" aria-label="Belépés">
            <div className="container">
              <div className="sectionHead">
                <h2>Belépés</h2>
                <button className="pill" type="button" onClick={() => setPage("home")}>
                  ← Vissza
                </button>
              </div>

              <div className="detailWrap" style={{ padding: 16 }}>
                <div className="detailHero" style={{ alignItems: "stretch" }}>
                  <div className="poster" aria-hidden="true" />
                  <div className="detailInfo">
                    <h3>Fiók belépés</h3>
                    <p>Backend: http://localhost:8000/api/login</p>

                    {!loggedIn ? (
                      <div style={{ display: "grid", gap: 12, maxWidth: 420 }}>
                        <div>
                          <div className="label">E-mail</div>
                          <input
                            className="input"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email@example.com"
                          />
                        </div>

                        <div>
                          <div className="label">Jelszó</div>
                          <input
                            className="input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                          />
                        </div>

                        <div style={{ display: "flex", gap: 10 }}>
                          <button className="btn" type="button" onClick={login}>
                            Belépés
                          </button>
                          <button
                            className="pill"
                            type="button"
                            onClick={() => {
                              setEmail("");
                              setPassword("");
                              setMessage("");
                            }}
                          >
                            Törlés
                          </button>
                        </div>

                        {message && (
                          <p style={{ margin: 0, color: "rgba(243,241,255,.8)", fontWeight: 700 }}>
                            {message}
                          </p>
                        )}
                      </div>
                    ) : (
                      <>
                        <p>
                          Be vagy jelentkezve mint <b>{email}</b>
                        </p>
                        {message && <p style={{ marginTop: 8 }}>{message}</p>}
                        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                          <button className="btn" type="button" onClick={() => setPage("home")}>
                            Irány a főoldal
                          </button>
                          <button className="pill" type="button" onClick={logout}>
                            Kilépés
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer>
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
            style={{
              marginTop: 18,
              borderTop: "1px solid var(--line)",
              paddingTop: 14,
              color: "rgba(243,241,255,.55)",
              fontWeight: 650,
              fontSize: 12,
            }}
          >
            demo UI:
            <br></br>
            © 2026 SEATY –  Vizsgaremek UI – React + TypeScript (CRA), 
                <br></br>Bíró Eszter & Szépréthy Regina
          </div>
        </div>
      </footer>
    </div>
  );
}
