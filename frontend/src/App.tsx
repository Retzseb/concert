//képek vagy frontend képek mappa+adatbázis elérési útvonal vagy adatbázisban BASE64 formatumban

import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Header } from "./components/Header";
import { Login } from "./components/Login";
import { ConcertPage } from "./pages/Concerts";
import { Home } from "./pages/Home"; 

const API = "http://localhost:8000/api";

export default function App() {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/user`, {
          credentials: "include",
          headers: { Accept: "application/json" },
        });
        setUser(res.ok ? await res.json() : null);
      } catch {
        setUser(null);
      }
    })();
  }, []);

  const logout = async () => {
    await fetch("http://localhost:8000/sanctum/csrf-cookie", {
      method: "GET",
      credentials: "include",
    });

    await fetch(`${API}/logout`, {
      method: "POST",
      credentials: "include",
      headers: { Accept: "application/json" },
    });

    setUser(null);
  };

  return (
    <BrowserRouter>
      <Header user={user} onLogout={logout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/concerts" element={<ConcertPage />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
      </Routes>
    </BrowserRouter>
  );
}