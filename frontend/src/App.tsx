import { useMemo, useState } from "react";
import { Concerts } from "./components/Concert";
import { Login } from "./pages/LogInOut";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";

// type Page = "home" | "login";

// export default function App() {
//   const [page, setPage] = useState<Page>("home");

//   //LOGIN
//   const [email, setEmail] = useState("kasszaspiros@example.com");
//   const [password, setPassword] = useState("kasszas1*/%");
//   const [message, setMessage] = useState("");
//   const [loggedIn, setLoggedIn] = useState(false);

//   const login = async () => {
//     await fetch("http://localhost:8000/sanctum/csrf-cookie", {
//       method: "GET",
//       credentials: "include", 
//     });

//     const API = "http://localhost:8000/api";
//     const res = await fetch(`${API}/login`, {
//       method: "POST",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     if (!res.ok) {
//       setMessage("Hibás email vagy jelszó");
//       return;
//     }

//     setLoggedIn(true);
//     setMessage("Sikeres belépés!");    
//   };

// const logout = async () => {
//     await fetch("http://localhost:8000/sanctum/csrf-cookie", {
//       method: "GET",
//       credentials: "include", 
//     });

//     const API = "http://localhost:8000/api";
//     const res = await fetch(`${API}/logout`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "X-Requested-With": "XMLHttpRequest",
//     },
//     credentials: "include", 
//   });

//     if (!res.ok && res.status !== 401) {
//     setMessage("Kijelentkezés sikertelen.");
//     return;
//   }
  
//     setLoggedIn(false);
//     setMessage("Kijelentkezve.");
//   };

//   const fallbackVars = useMemo(
//     () =>
//       ({
//         ["--violet" as any]: "var(--green)",
//         ["--violet2" as any]: "var(--green2)",
//         ["--pink" as any]: "var(--green3)",
//       }) as React.CSSProperties,
//     [],
//   );
function App() {
  return (
    <>

<BrowserRouter>
<Routes>
  <Route>
        <Route path="/" element={<Home />} />
  </Route>
</Routes>

</BrowserRouter>
        <Concerts/>
          </>
 
  );
}

export default App;