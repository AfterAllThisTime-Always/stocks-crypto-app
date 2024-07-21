package auth

import (
	"encoding/json"
	"fmt"
	"net/http"
	"server/config"
	model "server/models"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var tokenKey = config.GetEnvValue("TOKEN_KEY")
var byteTokenKey = []byte(tokenKey)

func GenerateToken(id string, username string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.MapClaims{
			"id":       id,
			"username": username,
			"exp":      time.Now().Add(time.Hour * 24).Unix(),
		})

	tokenString, err := token.SignedString(byteTokenKey)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")

		tokenString := r.Header.Get("Authorization")

		if tokenString == "" {
			w.WriteHeader(http.StatusUnauthorized)
			response := map[string]interface{}{
				"message": "Token missing",
				"success": false,
			}
			json.NewEncoder(w).Encode(response)
			return
		}
		tokenString = tokenString[len("Bearer "):]

		user, err := verifyToken(tokenString)
		if err != nil {
			w.WriteHeader(http.StatusUnauthorized)
			response := map[string]interface{}{
				"message": "Invalid token",
				"success": false,
			}
			json.NewEncoder(w).Encode(response)
			return
		}

		r.Header.Set("X-User-Id", user.Id)
		r.Header.Set("X-Username", user.Username)
		next.ServeHTTP(w, r)
	})
}

func verifyToken(tokenString string) (*model.TokenBody, error) {
	claims := &model.TokenBody{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return byteTokenKey, nil
	})
	if err != nil {
		return nil, err
	}
	if !token.Valid {
		return nil, fmt.Errorf("invalid token")
	}

	return claims, nil
}
