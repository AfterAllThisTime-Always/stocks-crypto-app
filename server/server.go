package main

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

type ROI struct {
	Times      float64 `json:"times"`
	Currency   string  `json:"currency"`
	Percentage float64 `json:"percentage"`
}

type Coin struct {
	ID                        string  `json:"id"`
	Symbol                    string  `json:"symbol"`
	Name                      string  `json:"name"`
	Image                     string  `json:"image"`
	CurrentPrice              float64 `json:"current_price"`
	MarketCap                 float64 `json:"market_cap"`
	MarketCapRank             int     `json:"market_cap_rank"`
	FullyDilutedValuation     float64 `json:"fully_diluted_valuation"`
	TotalVolume               float64 `json:"total_volume"`
	High24h                   float64 `json:"high_24h"`
	Low24h                    float64 `json:"low_24h"`
	PriceChange24h            float64 `json:"price_change_24h"`
	PriceChangePercentage24h  float64 `json:"price_change_percentage_24h"`
	MarketCapChange24h        float64 `json:"market_cap_change_24h"`
	MarketCapChangePercentage float64 `json:"market_cap_change_percentage_24h"`
	CirculatingSupply         float64 `json:"circulating_supply"`
	TotalSupply               float64 `json:"total_supply"`
	MaxSupply                 float64 `json:"max_supply"`
	Ath                       float64 `json:"ath"`
	AthChangePercentage       float64 `json:"ath_change_percentage"`
	AthDate                   string  `json:"ath_date"`
	Atl                       float64 `json:"atl"`
	AtlChangePercentage       float64 `json:"atl_change_percentage"`
	AtlDate                   string  `json:"atl_date"`
	ROI                       *ROI    `json:"roi"`
	LastUpdated               string  `json:"last_updated"`
}

func getCoinData() ([]Coin, error) {

	err := godotenv.Load(".env")

	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	url := "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("accept", "application/json")
	req.Header.Add("x-cg-demo-api-key", os.Getenv("API_KEY"))

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	var coins []Coin
	err = json.Unmarshal(body, &coins)
	if err != nil {
		return nil, err
	}
	return coins, nil
}

// var obj = []Coin{
// 	{
// 		ID:                        "bitcoin",
// 		Symbol:                    "btc",
// 		Name:                      "Bitcoin",
// 		Image:                     "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
// 		CurrentPrice:              5512012,
// 		MarketCap:                 108672288743957,
// 		MarketCapRank:             1,
// 		FullyDilutedValuation:     115910655265774,
// 		TotalVolume:               2061723274968,
// 		High24h:                   5547419,
// 		Low24h:                    5366114,
// 		PriceChange24h:            92549,
// 		PriceChangePercentage24h:  1.70772,
// 		MarketCapChange24h:        2143003211413,
// 		MarketCapChangePercentage: 2.01166,
// 		CirculatingSupply:         19688596,
// 		TotalSupply:               21000000,
// 		MaxSupply:                 21000000,
// 		Ath:                       6110932,
// 		AthChangePercentage:       -9.67243,
// 		AthDate:                   "2024-03-14T07:10:36.635Z",
// 		Atl:                       3993.42,
// 		AtlChangePercentage:       138123.82477,
// 		AtlDate:                   "2013-07-05T00:00:00.000Z",
// 		ROI:                       nil,
// 		LastUpdated:               "2024-04-22T14:07:08.223Z",
// 	},
// 	{
// 		ID:                        "ethereum",
// 		Symbol:                    "eth",
// 		Name:                      "Ethereum",
// 		Image:                     "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
// 		CurrentPrice:              266266,
// 		MarketCap:                 31997961873344,
// 		MarketCapRank:             2,
// 		FullyDilutedValuation:     31997961873344,
// 		TotalVolume:               932935749425,
// 		High24h:                   269599,
// 		Low24h:                    260404,
// 		PriceChange24h:            3591.84,
// 		PriceChangePercentage24h:  1.36741,
// 		MarketCapChange24h:        491534036286,
// 		MarketCapChangePercentage: 1.56011,
// 		CirculatingSupply:         120072366.963471,
// 		TotalSupply:               120072366.963471,
// 		MaxSupply:                 0,
// 		Ath:                       362338,
// 		AthChangePercentage:       -26.4179,
// 		AthDate:                   "2021-11-10T14:24:19.604Z",
// 		Atl:                       28.13,
// 		AtlChangePercentage:       947658.60141,
// 		AtlDate:                   "2015-10-20T00:00:00.000Z",
// 		ROI: &ROI{
// 			Times:      63.567936349559375,
// 			Currency:   "btc",
// 			Percentage: 6356.793634955938,
// 		},
// 		LastUpdated: "2024-04-22T14:07:10.556Z",
// 	},
// 	{
// 		ID:                        "tether",
// 		Symbol:                    "usdt",
// 		Name:                      "Tether",
// 		Image:                     "https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661",
// 		CurrentPrice:              83.43,
// 		MarketCap:                 9166563878781,
// 		MarketCapRank:             3,
// 		FullyDilutedValuation:     9166563878781,
// 		TotalVolume:               3434918793928,
// 		High24h:                   83.7,
// 		Low24h:                    83.23,
// 		PriceChange24h:            -0.023010076056962703,
// 		PriceChangePercentage24h:  -0.02757,
// 		MarketCapChange24h:        648957274,
// 		MarketCapChangePercentage: 0.00708,
// 		CirculatingSupply:         109840251114.814,
// 		TotalSupply:               109840251114.814,
// 		MaxSupply:                 0,
// 		Ath:                       91.22,
// 		AthChangePercentage:       -8.50392,
// 		AthDate:                   "2018-07-24T00:00:00.000Z",
// 		Atl:                       36.86,
// 		AtlChangePercentage:       126.43733,
// 		AtlDate:                   "2015-03-02T00:00:00.000Z",
// 		ROI:                       nil,
// 		LastUpdated:               "2024-04-22T14:05:26.399Z",
// 	},
// 	// Add other coins here...
// }

func coinsHandler(w http.ResponseWriter, r *http.Request) {
	coins, err := getCoinData()
	if err != nil {
		http.Error(w, "Failed to fetch coin data", http.StatusInternalServerError)
		return
	}
	(w).Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(coins)
}
