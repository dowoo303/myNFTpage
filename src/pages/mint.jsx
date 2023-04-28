import { useEffect, useState } from "react";

const Mint = ({ mybalance }) => {
  const [img, setImg] = useState();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const ranNum = Math.floor(Math.random() * 22) + 1; // 1~1000 사이 랜덤 숫자 발생
      const imgSrc = `${process.env.REACT_APP_IMAGE_URL}/${ranNum}.png`;
      setImg(imgSrc);
    }, 400);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="mt-24">
        <img className="flex w-108 h-auto" src={img} alt="NFT" />
      </div>
      <button className="mt-8 px-8 py-2 bg-gold rounded-2xl font-bold text-lg">
        Mint
      </button>

      <div className="mt-8 font-bold">Left NFT: 11</div>
      <div className="font-bold">price: 1MATIC</div>
      <div className="font-bold">
        My Balance: {mybalance ? mybalance + " MATIC" : "Loading..."}
      </div>
    </div>
  );
};

export default Mint;
