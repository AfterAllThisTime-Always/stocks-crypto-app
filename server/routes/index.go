package routes

import "github.com/gorilla/mux"

func SetRoutes(r *mux.Router) {
	coinRoutes := r.PathPrefix("/cryptix").Subrouter()
	authRoutes := r.PathPrefix("/verify").Subrouter()
	userRoutes := r.PathPrefix("/user").Subrouter()
	SetUserRoutes(userRoutes)
	SetCoinRoutes(coinRoutes)
	SetAuthRoutes(authRoutes)

}
