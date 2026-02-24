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
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${API}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      setUser(res.ok ? await res.json() : null);
    } catch {
      setUser(null);
    }
  })();
}, []);

const logout = async () => {
  await fetch(`${API}/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json",
    },
  });

  localStorage.removeItem("token");
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