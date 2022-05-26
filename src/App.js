import { useState } from "react";
import "./App.css";
import Navbar from "./component/Navbar";
import GlobalData from "./component/GlobalData";
import InfoPanel from "./component/InfoPanel";

function App() {
  const [search, setSearch] = useState("");

  return (
    <>
      <Navbar setSearch={setSearch} />
      <InfoPanel searchText={search}/>
    </>
  );
}

export default App;
