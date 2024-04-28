package main

import (
	"log"
	"net/http"
)

func main() {
	// Register handlers for different endpoints
	http.HandleFunc("/coins", coinsHandler)

	// Start the server
	log.Println("Server started on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
