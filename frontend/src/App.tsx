//képek vagy frontend képek mappa+adatbázis elérési útvonal vagy adatbázisban BASE64 formatumban

import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Concerts } from "./components/Concert";
import { ConcertPage } from "./pages/Concerts";
import { Login } from "./components/Login";


function App() {

  return (
    <BrowserRouter>
      <nav>
        <Link to="/"></Link>       
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/concerts" element={<ConcertPage />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/cart" element={<Cart />} />         */}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
