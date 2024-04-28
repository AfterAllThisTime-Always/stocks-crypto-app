package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"reflect"

	"github.com/joho/godotenv"
)

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
	ROI                       float64 `json:"roi"`
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

	// fmt.Println(string(body))

	var coins []Coin
	fmt.Println(reflect.TypeOf(coins))
	err = json.Unmarshal(body, &coins)
	if err != nil {
		return nil, err
	}

	fmt.Println(reflect.TypeOf(coins))
	fmt.Println(coins)

	return coins, nil
}

func coinsHandler(w http.ResponseWriter, r *http.Request) {
	coins, err := getCoinData()
	fmt.Println("wow", coins)
	if err != nil {
		http.Error(w, "Failed to fetch coin data", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(coins)
}

// func main() {
// 	getCoinData()
// }
