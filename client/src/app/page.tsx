"use client";
import { useEffect, useState } from "react";
import { CardGrid } from "../components/ui/card-grid";
import { Navbar } from "../components/ui/navbar";
import axios from "axios";
import { Coin } from "./interfaces";
import { FaUserCircle } from "react-icons/fa";
import { LoginModal, SignupForm } from "./login";
import { ToastContainer } from "react-toastify";

const CoinCoin = () => {
  const [coinData, setCoinData] = useState<Coin[]>();
  useEffect(() => {
    const getCoinData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/cryptix/coins`
        );
        setCoinData(response.data);
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    };
    getCoinData();
  }, []);
  return (
    <div>
      <CardGrid items={coinData} />
    </div>
  );
};
export default function Home() {
  const [userData, setUserData] = useState(false);
  const handleUserData = () => {
    setUserData(true);
  };
  return (
    <>
      <div
        className={`flex flex-col gap-20 bg-gray-950 bg-cover min-h-screen z-0 ${
          userData ? "blur-[10px]" : ""
        }`}
      >
        {/* <div>
        <Navbar />
      </div> */}
        <div className="relative flex justify-center">
          <Navbar />
          <div className="absolute right-6 top-9 cursor-pointer">
            <FaUserCircle
              onClick={handleUserData}
              size={50}
              className="fill-green-600"
            />
          </div>
        </div>
        <div className="ml-2 mr-2">
          <CoinCoin />
        </div>
      </div>
      {userData ? <LoginModal setUserData={setUserData} /> : null}
      <ToastContainer />
    </>
  );
}
