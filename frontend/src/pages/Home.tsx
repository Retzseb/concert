import { Search } from "../components/Search";
import { Concerts } from "../components/Concert";
import { Login } from "../components/Login";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function Home() {
  return (
    <>
      <Header />
      <Search />
      <Login />
      <Concerts />
      <Footer />
    </>
  );
}
