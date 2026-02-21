import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:8000/api";

export function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    const form = e.currentTarget;
    const fd = new FormData(form);

    const email = fd.get("email") as string;
    const password = fd.get("password") as string;

    if (!email || !password) {
      setError("Minden mező kitöltése kötelező.");
      setLoading(false);
      return;
    }

    try {
      await fetch("http://localhost:8000/sanctum/csrf-cookie", {
        method: "GET",
        credentials: "include",
      });

      const res = await fetch(`${API}/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!res.ok) {
        let msg = `Sikertelen belépés (HTTP ${res.status}).`;
        try {
          const data = await res.json();
          msg = data?.message ?? msg;
        } catch {}
        throw new Error(msg);
      }

      setSuccess("Sikeres bejelentkezés!");
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

          <form
            onSubmit={handleSubmit}
            className="searchPanel"
            style={{ gridTemplateColumns: "1fr 1fr auto" }}
          >
            <div className="field">
              <label className="label">Email</label>
              <input
                className="input"
                name="email"
                type="email"
                placeholder="email@valami.hu"
                required
              />
            </div>

            <div className="field">
              <label className="label">Jelszó</label>
              <input
                className="input"
                name="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>

            <button className="searchBtn" type="submit" disabled={loading}>
              {loading ? "Belépés..." : "Belépés"}
            </button>
          </form>

          {error && (
            <p style={{ marginTop: 10, color: "red" }}>{error}</p>
          )}

          {success && (
            <p style={{ marginTop: 10, color: "green" }}>{success}</p>
          )}
        </div>
      </div>
    </section>
  );
}