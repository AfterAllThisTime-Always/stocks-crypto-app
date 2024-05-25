package main

import (
	"log"
	"net/http"
	controller "server/controllers"
)

func main() {
	http.HandleFunc("/coins", controller.CoinsHandler)
	http.HandleFunc("/chart", controller.CoinChart)
	log.Println("Server started on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
