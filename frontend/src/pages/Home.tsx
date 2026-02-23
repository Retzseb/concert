import { Topbar } from "../components/Topbar";
import { Search } from "../components/Search";
import { Concerts } from "../components/Concert";



export function Home() {
  return (
    <>
      <Topbar />
      <Search />
      <Concerts />
    </>
  );
}