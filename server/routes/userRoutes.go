package routes

import (
	controller "server/controllers"

	"github.com/gorilla/mux"
)

func SetUserRoutes(r *mux.Router) {
	r.HandleFunc("/signup", controller.CreateUser).Methods("POST")
	r.HandleFunc("/login", controller.LoginUser).Methods("POST")
}
