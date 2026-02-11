import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Home from "./pages/Home";

export default function App() {


return (
  <>
      <BrowserRouter>
      <div className="app">
        <NavBar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>

  
  <Footer authors={["Szépréthy Regina", "Bíró Eszter"]} />
  </>
);

}
