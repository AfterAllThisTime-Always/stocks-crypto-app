package routes

import (
	controller "server/controllers"

	"github.com/gorilla/mux"
)

func SetCoinRoutes(r *mux.Router) {
	r.HandleFunc("/coins", controller.CoinsHandler).Methods("GET")
	r.HandleFunc("/chart", controller.CoinChart).Methods("GET")
}
