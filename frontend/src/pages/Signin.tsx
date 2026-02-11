import { useState } from "react";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const login = async () => {
    setMessage("");

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
  };

  return (
    <>
      <div style={{ maxWidth: 300, margin: "40px auto" }}>
        <h3>Belépés</h3>

        {!loggedIn ? (
          <>
            <label>E-mail:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <br />

            <label>Jelszó:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <br />

            <button onClick={login}>Belépés</button>
          </>
        ) : (
          <p>
            Be vagy jelentkezve mint <b>{email}</b>
          </p>
        )}

        {message && <p>{message}</p>}
      </div>
    </>
  );
}
