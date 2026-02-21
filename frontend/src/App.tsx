//képek vagy frontend képek mappa+adatbázis elérési útvonal vagy adatbázisban BASE64 formatumban

import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";


function App() {


  return (
    <BrowserRouter>
      {/* Navigation */}
      <nav>
        <Link to="/"></Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
