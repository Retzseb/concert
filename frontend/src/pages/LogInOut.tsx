import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:8000"; 

export function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const fd = new FormData(form);

    try {
        const login = async () => {
            await fetch("http://localhost:8000/sanctum/csrf-cookie", {
            method: "GET",
            credentials: "include", 
            });
    }

    const res = await fetch(`${API}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    });
      

      if (!res.ok) {
        let msg = `Sikertelen belépés (HTTP ${res.status}).`;
        try {
          const data = await res.json();
          msg = data?.message ?? msg;
        } catch {}
        throw new Error(msg);
      }

      navigate("/");
    } catch (err: any) {
      setError(err?.message ?? "Nem sikerült belépni.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section">
      <div className="container">
        <div className="miniCard">
          <h3>Bejelentkezés</h3>

          <form onSubmit={handleSubmit} className="searchPanel" style={{ gridTemplateColumns: "1fr 1fr auto" }}>
            <div className="field">
              <label className="label">Email</label>
              <input className="input" name="email" type="email" placeholder="email@valami.hu" required />
            </div>

            <div className="field">
              <label className="label">Jelszó</label>
              <input className="input" name="password" type="password" placeholder="••••••••" required />
            </div>

            <button className="searchBtn" type="submit" disabled={loading}>
              {loading ? "Belépés..." : "Belépés"}
            </button>
          </form>

          {error && <p style={{ marginTop: 10, opacity: 0.9 }}>{error}</p>}
        </div>
      </div>
    </section>
  );
}
<></>