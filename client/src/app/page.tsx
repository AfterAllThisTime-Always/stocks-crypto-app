"use client";
import { useEffect, useState } from "react";
import { CardGrid } from "../components/ui/card-grid";
import { Navbar } from "../components/ui/navbar";
import axios from "axios";
import { Coin } from "./interfaces";
import { FaUserCircle } from "react-icons/fa";
import { LoginModal, SignupForm } from "./login";

export function CoinCoin() {
  const [coinData, setCoinData] = useState<Coin[]>();
  useEffect(() => {
    const getCoinData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/coins");
        setCoinData(response.data);
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    };
    getCoinData();
  }, []);
  return (
    <div /*className="max-w-5xl mx-auto px-8"*/>
      <CardGrid items={coinData} />
    </div>
  );
}
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
          <div className="absolute right-6 top-9">
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
    </>
  );
}

// const obj = [{
//   "id": "bitcoin",
//   "symbol": "btc",
//   "name": "Bitcoin",
//   "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
//   "current_price": 5512012,
//   "market_cap": 108672288743957,
//   "market_cap_rank": 1,
//   "fully_diluted_valuation": 115910655265774,
//   "total_volume": 2061723274968,
//   "high_24h": 5547419,
//   "low_24h": 5366114,
//   "price_change_24h": 92549,
//   "price_change_percentage_24h": 1.70772,
//   "market_cap_change_24h": 2143003211413,
//   "market_cap_change_percentage_24h": 2.01166,
//   "circulating_supply": 19688596,
//   "total_supply": 21000000,
//   "max_supply": 21000000,
//   "ath": 6110932,
//   "ath_change_percentage": -9.67243,
//   "ath_date": "2024-03-14T07:10:36.635Z",
//   "atl": 3993.42,
//   "atl_change_percentage": 138123.82477,
//   "atl_date": "2013-07-05T00:00:00.000Z",
//   "roi": null,
//   "last_updated": "2024-04-22T14:07:08.223Z"
// },
// {
//   "id": "ethereum",
//   "symbol": "eth",
//   "name": "Ethereum",
//   "image": "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
//   "current_price": 266266,
//   "market_cap": 31997961873344,
//   "market_cap_rank": 2,
//   "fully_diluted_valuation": 31997961873344,
//   "total_volume": 932935749425,
//   "high_24h": 269599,
//   "low_24h": 260404,
//   "price_change_24h": 3591.84,
//   "price_change_percentage_24h": 1.36741,
//   "market_cap_change_24h": 491534036286,
//   "market_cap_change_percentage_24h": 1.56011,
//   "circulating_supply": 120072366.963471,
//   "total_supply": 120072366.963471,
//   "max_supply": null,
//   "ath": 362338,
//   "ath_change_percentage": -26.4179,
//   "ath_date": "2021-11-10T14:24:19.604Z",
//   "atl": 28.13,
//   "atl_change_percentage": 947658.60141,
//   "atl_date": "2015-10-20T00:00:00.000Z",
//   "roi": {
//     "times": 63.567936349559375,
//     "currency": "btc",
//     "percentage": 6356.793634955938
//   },
//   "last_updated": "2024-04-22T14:07:10.556Z"
// },
// {
//   "id": "tether",
//   "symbol": "usdt",
//   "name": "Tether",
//   "image": "https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661",
//   "current_price": 83.43,
//   "market_cap": 9166563878781,
//   "market_cap_rank": 3,
//   "fully_diluted_valuation": 9166563878781,
//   "total_volume": 3434918793928,
//   "high_24h": 83.7,
//   "low_24h": 83.23,
//   "price_change_24h": -0.023010076056962703,
//   "price_change_percentage_24h": -0.02757,
//   "market_cap_change_24h": 648957274,
//   "market_cap_change_percentage_24h": 0.00708,
//   "circulating_supply": 109840251114.814,
//   "total_supply": 109840251114.814,
//   "max_supply": null,
//   "ath": 91.22,
//   "ath_change_percentage": -8.50392,
//   "ath_date": "2018-07-24T00:00:00.000Z",
//   "atl": 36.86,
//   "atl_change_percentage": 126.43733,
//   "atl_date": "2015-03-02T00:00:00.000Z",
//   "roi": null,
//   "last_updated": "2024-04-22T14:05:26.399Z"
// },
// {
//   "id": "binancecoin",
//   "symbol": "bnb",
//   "name": "BNB",
//   "image": "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970",
//   "current_price": 49668,
//   "market_cap": 7642468667950,
//   "market_cap_rank": 4,
//   "fully_diluted_valuation": 7642468667950,
//   "total_volume": 131854387659,
//   "high_24h": 50691,
//   "low_24h": 47352,
//   "price_change_24h": 1762.88,
//   "price_change_percentage_24h": 3.67992,
//   "market_cap_change_24h": 282506235183,
//   "market_cap_change_percentage_24h": 3.83842,
//   "circulating_supply": 153856150,
//   "total_supply": 153856150,
//   "max_supply": 200000000,
//   "ath": 52934,
//   "ath_change_percentage": -6.1626,
//   "ath_date": "2024-03-16T00:10:54.176Z",
//   "atl": 2.58,
//   "atl_change_percentage": 1921627.92289,
//   "atl_date": "2017-10-19T00:00:00.000Z",
//   "roi": null,
//   "last_updated": "2024-04-22T14:06:55.916Z"
// },
// {
//   "id": "solana",
//   "symbol": "sol",
//   "name": "Solana",
//   "image": "https://assets.coingecko.com/coins/images/4128/large/solana.png?1696504756",
//   "current_price": 12864.56,
//   "market_cap": 5764958134016,
//   "market_cap_rank": 5,
//   "fully_diluted_valuation": 7409833046044,
//   "total_volume": 276835797275,
//   "high_24h": 13020.51,
//   "low_24h": 12252.49,
//   "price_change_24h": 412.09,
//   "price_change_percentage_24h": 3.30927,
//   "market_cap_change_24h": 201278731060,
//   "market_cap_change_percentage_24h": 3.61773,
//   "circulating_supply": 446925125.4905,
//   "total_supply": 574443124.647617,
//   "max_supply": null,
//   "ath": 19286.66,
//   "ath_change_percentage": -33.15829,
//   "ath_date": "2021-11-06T21:54:35.825Z",
//   "atl": 38.03,
//   "atl_change_percentage": 33802.15658,
//   "atl_date": "2020-05-11T19:35:23.449Z",
//   "roi": null,
//   "last_updated": "2024-04-22T14:06:57.772Z"
// },
// {
//   "id": "usd-coin",
//   "symbol": "usdc",
//   "name": "USDC",
//   "image": "https://assets.coingecko.com/coins/images/6319/large/usdc.png?1696506694",
//   "current_price": 83.37,
//   "market_cap": 2841218181747,
//   "market_cap_rank": 6,
//   "fully_diluted_valuation": 2846653274907,
//   "total_volume": 575641662175,
//   "high_24h": 83.68,
//   "low_24h": 83.15,
//   "price_change_24h": -0.05178721214133475,
//   "price_change_percentage_24h": -0.06208,
//   "market_cap_change_24h": 8193599764,
//   "market_cap_change_percentage_24h": 0.28922,
//   "circulating_supply": 34042426730.1144,
//   "total_supply": 34107548008.6868,
//   "max_supply": null,
//   "ath": 87.19,
//   "ath_change_percentage": -4.32831,
//   "ath_date": "2020-03-13T02:35:16.858Z",
//   "atl": 65.31,
//   "atl_change_percentage": 27.72694,
//   "atl_date": "2021-05-19T13:14:05.611Z",
//   "roi": null,
//   "last_updated": "2024-04-22T14:07:16.937Z"
// },
// {
//   "id": "staked-ether",
//   "symbol": "steth",
//   "name": "Lido Staked Ether",
//   "image": "https://assets.coingecko.com/coins/images/13442/large/steth_logo.png?1696513206",
//   "current_price": 265967,
//   "market_cap": 2483826094978,
//   "market_cap_rank": 7,
//   "fully_diluted_valuation": 2483826094978,
//   "total_volume": 9207390450,
//   "high_24h": 269503,
//   "low_24h": 260261,
//   "price_change_24h": 3475.27,
//   "price_change_percentage_24h": 1.32395,
//   "market_cap_change_24h": 37027189073,
//   "market_cap_change_percentage_24h": 1.51329,
//   "circulating_supply": 9327133.49907169,
//   "total_supply": 9327133.49907169,
//   "max_supply": null,
//   "ath": 358528,
//   "ath_change_percentage": -25.75436,
//   "ath_date": "2021-11-10T14:40:47.256Z",
//   "atl": 35697,
//   "atl_change_percentage": 645.69752,
//   "atl_date": "2020-12-22T04:08:21.854Z",
//   "roi": null,
//   "last_updated": "2024-04-22T14:07:13.089Z"
// },
// {
//   "id": "ripple",
//   "symbol": "xrp",
//   "name": "XRP",
//   "image": "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442",
//   "current_price": 44.55,
//   "market_cap": 2460162948756,
//   "market_cap_rank": 8,
//   "fully_diluted_valuation": 4461995129258,
//   "total_volume": 93344206805,
//   "high_24h": 44.95,
//   "low_24h": 43.43,
//   "price_change_24h": 0.734731,
//   "price_change_percentage_24h": 1.67685,
//   "market_cap_change_24h": 44169762752,
//   "market_cap_change_percentage_24h": 1.82822,
//   "circulating_supply": 55129144019,
//   "total_supply": 99987674482,
//   "max_supply": 100000000000,
//   "ath": 215.1,
//   "ath_change_percentage": -79.25829,
//   "ath_date": "2018-01-07T00:00:00.000Z",
//   "atl": 0.159343,
//   "atl_change_percentage": 27900.20848,
//   "atl_date": "2013-08-16T00:00:00.000Z",
//   "roi": null,
//   "last_updated": "2024-04-22T14:07:04.866Z"
// }];
