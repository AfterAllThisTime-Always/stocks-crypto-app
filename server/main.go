package main

import (
	"log"
	"net/http"
	// "server/config"
)

func main() {
	// port := config.GetEnvValue("PORT")

	log.Println("Server started on :8080")
	log.Fatal(http.ListenAndServe(``, nil))
}
