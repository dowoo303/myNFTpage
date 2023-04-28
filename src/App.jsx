import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/main";
import Detail from "./pages/detail";
import Header from "./components/Header";
import { useState } from "react";
import Mint from "./pages/mint";

function App() {
  const [account, setAccount] = useState("");
  const [mybalance, setMybalance] = useState();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-950 text-white">
        <Header
          account={account}
          setAccount={setAccount}
          mybalance={mybalance}
          setMybalance={setMybalance}
        />
        <Routes>
          <Route path="/" element={<Main account={account} />} />
          <Route path="/:tokenId" element={<Detail />} />
          <Route path="/mint" element={<Mint mybalance={mybalance} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
