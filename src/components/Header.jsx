import { RiAncientGateFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { BiWallet } from "react-icons/bi";
import { GiWallet } from "react-icons/gi";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3 from "web3";
import { TOKEN_ABI, TOKEN_CONTRACT_ADDRESS } from "../web3.config";

const web3 = new Web3(window.ethereum);
const tokenContract = new web3.eth.Contract(TOKEN_ABI, TOKEN_CONTRACT_ADDRESS);

const Header = ({ account, setAccount, mybalance, setMybalance }) => {
  const [coinPrice, setCoinPrice] = useState();

  // 업비트에서 가격 가져오기
  const getCoinPrice = async () => {
    try {
      const response = await axios.get(
        "https://api.upbit.com/v1/ticker?markets=KRW-BTC,%20KRW-ETH,%20KRW-MATIC" // 업비트 api
      );

      setCoinPrice([
        { symbol: "BTC", price: response.data[0].trade_price },
        { symbol: "ETH", price: response.data[1].trade_price },
        { symbol: "MATIC", price: response.data[2].trade_price },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  // 로그인 구현
  const onClickAccount = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccount(accounts[0]); // 배열로 오기 때문에 [0] 필요
    } catch (error) {
      console.error(error);
    }
  };

  // 잔액조회
  const onClickBalance = async () => {
    try {
      if (!account || !tokenContract) return;

      // 콜 함수
      const balance = await tokenContract.methods.balanceOf(account).call();
      const totalSupply = await tokenContract.methods.totalSupply().call();

      console.log(totalSupply, web3.utils.fromWei(totalSupply));

      setMybalance(web3.utils.fromWei(balance).substring(0, 4)); // 10^18 나누기 (/ 10**18)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCoinPrice();
    onClickBalance();
  }, []);

  useEffect(() => {
    let intervalId = setInterval(() => {
      getCoinPrice();
      console.log("4초 마다 코인 가격 변동중 !");
    }, 4000);

    return () => clearInterval(intervalId);
  }, [coinPrice]);

  return (
    <header className="max-w-screen-xl mx-auto p-4 flex justify-between items-center font-bold">
      <Link to="/">
        <div className="flex items-center text-main">
          <RiAncientGateFill size={32} />
          <div className="ml-2 text-2xl text-white">Joseon Dynasty</div>
        </div>
      </Link>

      <div className="flex items-center">
        {coinPrice && (
          <ul className="flex text-white text-base animate-pulse">
            {coinPrice.map((v, i) => {
              return (
                <li key={i} className="ml-2 animate-ping">
                  {v.symbol}: ₩ {(v.price / 1000).toLocaleString()}k
                </li>
              );
            })}
          </ul>
        )}
        {account ? (
          <>
            <div
              className="flex items-center p-2 bg-gray-800 rounded-full ml-4"
              onClick={onClickAccount}
            >
              <div className="bg-main w-6 h-6 rounded-full flex justify-center items-center">
                <GiWallet />
              </div>
              <div className="ml-1">
                {account.substring(0, 4)}...
                {account.substring(account.length - 4)}
              </div>
              <div className="ml-2" onClick={onClickBalance}>
                {mybalance ? mybalance + " MATIC" : "Mybalance"}
              </div>
            </div>
          </>
        ) : (
          <button
            className="flex items-center p-2 bg-gray-800 rounded-full ml-4"
            onClick={onClickAccount}
          >
            <div className="bg-main w-6 h-6 rounded-full flex justify-center items-center">
              <BiWallet />
            </div>
            <div className="ml-1">Connect</div>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
