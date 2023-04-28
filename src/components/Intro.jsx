import { RiAncientGateFill } from "react-icons/ri";
import { CONTRACT_ADDRESS } from "../web3.config";
import { Link } from "react-router-dom";

const ranNum = Math.floor(Math.random() * 22) + 1; // 1~1000 사이 랜덤 숫자 발생
const imgSrc = `${process.env.REACT_APP_IMAGE_URL}/${ranNum}.png`;

const Intro = ({ totalNft, mintedNft, myNft }) => {
  return (
    <div className="bg-gradient-to-b from-transparent to-red-400 pt-10">
      <div className="max-w-screen-xl mx-auto relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gold text-9xl truncate opacity-20 point-event-none">
          Joseon Dynasty
        </div>
        <div className="relative">
          <img
            className="flex w-40 h-40 rounded-full animate-bounce hover:animate-none"
            src={imgSrc}
            alt="NFT"
          />
          {/* <div className="w-40 h-40 rounded-full bg-white text-gray-950 flex justify-center items-center">
            Loading...
          </div> */}
        </div>
        <div className="mt-4 text-2xl font-bold flex items-center">
          Joseon Dynasty
          <div className=" bg-main w-6 h-6 rounded-full flex justify-center items-center ml-4 text-gray-950">
            <RiAncientGateFill size={24} />
          </div>
        </div>
        <div className="mt-2 flex items-center text-gray-300">
          by
          <div className="text-main font-bold ml-2">{CONTRACT_ADDRESS}</div>
        </div>
        <div className="mt-2 text-gray-300">
          The Great Joseon Dynasty, or Joseon Dynasty, is a dynasty that ruled
          the Korean Peninsula for 518 years with Confucianism as its governing
          ideology. Joseon was founded on July 17, 1392, by King Taejo Lee
          Seong-gye, a military official of Goryeo, and was succeeded by the
          Korean Empire, which was founded by King Gojong in October 1897.
        </div>
        <div className="py-4 text-center flex">
          <div>
            <div className="font-bold">{totalNft}</div>
            <div className="text-gray-300">Total NFT</div>
          </div>
          <div className="ml-6">
            <div className="font-bold">{mintedNft}</div>
            <div className="text-gray-300">Minted NFT</div>
          </div>
          <div className="ml-6">
            <div className="font-bold">{myNft}</div>
            <div className="text-gray-300">My NFT</div>
          </div>
          <div className="flex ml-12 items-center justify-center">
            <Link to={`/mint`}>
              <button className="p-2 text-xl text-white font-bold hover:bg-white hover:text-black rounded-2xl">
                Mint 하러가기 !
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
