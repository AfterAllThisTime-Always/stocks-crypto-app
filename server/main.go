package main

import (
	"fmt"
	"log"
	"net/http"
	"server/config"
	"server/routes"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	port := config.GetEnvValue("PORT")
	r := mux.NewRouter()
	routes.SetRoutes(r)

	corsOpts := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})

	c := corsOpts.Handler(r)

	fmt.Println("Server started on", port)
	log.Fatal(http.ListenAndServe(":"+port, c))
}
