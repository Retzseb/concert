import React, { FormEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRole } from "../utility/Auth";
import { useAuth } from "../hooks/useAuth";

export function Login() {
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const auth = useAuth();

  const title = useMemo(() => (mode === "login" ? "Bejelentkezés" : "Regisztráció"), [mode]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const fd = new FormData(e.currentTarget);

    try {
      let user: any;

      if (mode === "login") {
        const email = (fd.get("email") as string) ?? "";
        const password = (fd.get("password") as string) ?? "";

        if (!email || !password) throw new Error("Minden mező kitöltése kötelező.");

        user = await auth.login(email, password);
      } else {
        const name = (fd.get("name") as string) ?? "";
        const email = (fd.get("email") as string) ?? "";
        const password = (fd.get("password") as string) ?? "";
        const password2 = (fd.get("password2") as string) ?? "";

        if (!name || !email || !password || !password2) throw new Error("Minden mező kitöltése kötelező.");
        if (password !== password2) throw new Error("A két jelszó nem egyezik.");

        user = await auth.register({
          name,
          email,
          password,
          password_confirmation: password2,
        });
      }

      const role = getRole(user);

      if (role === 0) {
        navigate("/admin", { replace: true });
      } else if (role === 2) {
        navigate("/", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err: any) {
      setError(err?.message ?? (mode === "login" ? "Nem sikerült belépni." : "Nem sikerült regisztrálni."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section">
      <div className="container">
        <div className="miniCard">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <h3 style={{ margin: 0 }}>{title}</h3>

            {/* szöveg + regisztráció gomb egy vonalban */}
            <div className="authSwitchRow" style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <p className="authHint">Nem regisztráltál még?</p>

              <button
                type="button"
                className="searchBtn"
                onClick={() => {
                  setError("");
                  setMode("register");
                }}
                disabled={loading || mode === "register"}
              >
                Regisztráció
              </button>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="searchPanel authPanel"
            style={{
              gridTemplateColumns: mode === "login" ? "1fr 1fr auto" : "1fr 1fr 1fr auto",
              marginTop: 12,
            }}
          >
            {mode === "register" && (
              <div className="field">
                <label className="label">Név</label>
                <input className="input" name="name" type="text" required />
              </div>
            )}

            <div className="field">
              <label className="label">E-mail</label>
              <input className="input" name="email" type="email" required />
            </div>

            <div className="field">
              <label className="label">Jelszó</label>
              <input className="input" name="password" type="password" required />
            </div>

            {mode === "register" && (
              <div className="field">
                <label className="label">Jelszó újra</label>
                <input className="input" name="password2" type="password" required />
              </div>
            )}

            <button className="searchBtn" type="submit" disabled={loading}>
              {loading ? (mode === "login" ? "Belépés..." : "Regisztráció...") : mode === "login" ? "Belépés" : "Regisztráció"}
            </button>
          </form>

          {error && <p style={{ marginTop: 10, color: "red" }}>{error}</p>}

          {mode === "register" && <p style={{ marginTop: 10, opacity: 0.8 }}></p>}
        </div>
      </div>
    </section>
  );
}