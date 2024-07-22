package controller

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"server/config"
	"server/interfaces"
)

var apiKey = config.GetEnvValue("API_KEY")

func getCoinData() ([]interfaces.Coin, error) {

	url := "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=volume_desc&per_page=1000&page=1&sparkline=false"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("accept", "application/json")
	req.Header.Add("x-cg-demo-api-key", apiKey)

	res, error1 := http.DefaultClient.Do(req)

	if error1 != nil {
		return nil, nil
	}
	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	var coins []interfaces.Coin
	err := json.Unmarshal(body, &coins)
	if err != nil {
		return nil, err
	}
	return coins, nil
}

func CoinsHandler(w http.ResponseWriter, r *http.Request) {
	coins, err := getCoinData()
	if err != nil {
		http.Error(w, "Failed to fetch coin data", http.StatusInternalServerError)
		return
	}
	(w).Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(coins)
}

func getCoinChart(currency string, coin string) (string, error) {

	url := fmt.Sprintf("https://api.coingecko.com/api/v3/coins/%s/market_chart?vs_currency=%s&days=365&interval=daily", coin, currency)

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("accept", "application/json")
	req.Header.Add("x-cg-demo-api-key", "CG-N1XfDjYtr1KoWbKX28yutQ2L")
	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return "", nil
	}
	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)
	return string(body), nil
}

func CoinChart(w http.ResponseWriter, r *http.Request) {
	coinChart, err := getCoinChart("inr", r.URL.Query().Get("coinId"))
	if err != nil {
		http.Error(w, "Failed to fetch coin chart", http.StatusInternalServerError)
		return
	}
	(w).Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(coinChart)
}
