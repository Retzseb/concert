import { Search } from "../components/Search";
import { Concerts } from "../components/Concert";
import { Login } from "./LogInOut";

export function Home() {
  return (
    <>
      <Search />
      <Login/>
      <Concerts />
    </>
  );
}