package routes

import (
	"encoding/json"
	"net/http"
	auth "server/middleware"

	"github.com/gorilla/mux"
)

func SetAuthRoutes(r *mux.Router) {
	r.Use(auth.AuthMiddleware)
	r.HandleFunc("", func(w http.ResponseWriter, r *http.Request) {
		userId := r.Header.Get("X-User-Id")
		username := r.Header.Get("X-Username")
		w.WriteHeader(http.StatusOK)
		response := map[string]interface{}{
			"message": "Verified",
			"status":  true,
			"userId":  userId,
			"user":    username,
		}
		json.NewEncoder(w).Encode(response)
	}).Methods("POST")
}
