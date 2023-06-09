import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/main";
import Detail from "./pages/detail";
import Header from "./components/Header";
import { useState } from "react";
import Mint from "./pages/mint";

function App() {
  const [account, setAccount] = useState("");
  const [mybalance, setMybalance] = useState();
  const [totalNft, setTotalNft] = useState(0);
  const [mintedNft, setMintedNft] = useState(0);

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
          <Route
            path="/"
            element={
              <Main
                account={account}
                mintedNft={mintedNft}
                setMintedNft={setMintedNft}
                totalNft={totalNft}
                setTotalNft={setTotalNft}
              />
            }
          />
          <Route path="/:tokenId" element={<Detail />} />
          <Route
            path="/mint"
            element={
              <Mint
                account={account}
                mybalance={mybalance}
                totalNft={totalNft}
                mintedNft={mintedNft}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
