import { useEffect, useState } from "react";
import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../web3.config";

const web3 = new Web3(window.ethereum);
const NFTcontract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS); // ABI와 컨트랙트 주소 연결

const Mint = ({ account, mybalance, mintedNft, totalNft }) => {
  const [img, setImg] = useState();

  // 민팅
  const onClickMint = async () => {
    try {
      const result = await NFTcontract.methods.mintNft().send({
        from: account,
      });

      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const ranNum = Math.floor(Math.random() * 22) + 1; // 1~1000 사이 랜덤 숫자 발생
      const imgSrc = `${process.env.REACT_APP_IMAGE_URL}/${ranNum}.png`;
      setImg(imgSrc);
    }, 400);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="flex items-center justify-center flex-col bg-gray-400 pb-8"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/temple.jpg)`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="mt-24">
        <img className="flex w-108 h-auto" src={img} alt="NFT" />
      </div>
      <button
        className="mt-8 px-8 py-2 bg-gold rounded-2xl font-bold text-xl"
        onClick={onClickMint}
      >
        Mint
      </button>
      <div className="flex items-center justify-center flex-col ">
        <div className="mt-8 font-bold text-lg text-red-500">
          Left NFT : {totalNft - mintedNft}
        </div>
        <div className="text-black font-bold text-lg">price : 1 MATIC</div>
        <div className="text-black font-bold text-lg">
          My Balance: {mybalance ? mybalance + " MATIC" : "Loading..."}
        </div>
      </div>
    </div>
  );
};

export default Mint;
