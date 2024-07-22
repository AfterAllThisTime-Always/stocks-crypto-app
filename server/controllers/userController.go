package controller

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"server/config"
	auth "server/middleware"
	model "server/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var coll = config.Conn.Database("Cryptix").Collection("Users")

func CreateUser(w http.ResponseWriter, r *http.Request) {
	var user model.User

	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	existingUser := coll.FindOne(context.Background(), bson.M{"email": user.Email})
	if existingUser.Err() == nil {
		w.WriteHeader(200)
		response := map[string]interface{}{
			"message": "User already exists",
			"success": false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}
	// insert new user in db
	newUser, err := coll.InsertOne(context.Background(), user)
	if err != nil {
		fmt.Printf("%s", err.Error())
		w.WriteHeader(200)
		response := map[string]interface{}{
			"message": "Failed to create user",
			"success": false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	token, err := auth.GenerateToken(newUser.InsertedID.(primitive.ObjectID).Hex(), user.Name)
	if err != nil {
		fmt.Printf("%s", err)
		w.WriteHeader(200)
		response := map[string]interface{}{
			"message": "Could not generate token",
			"success": false,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	response := map[string]interface{}{
		"message": "New user created successfully",
		"success": true,
		"token":   token,
	}
	json.NewEncoder(w).Encode(response)
}

func LoginUser(w http.ResponseWriter, r *http.Request) {
	var user model.User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		fmt.Printf("%s", err.Error())
	}

	trueUser := coll.FindOne(context.Background(), bson.M{"email": user.Email})
	if trueUser.Err() != nil {
		fmt.Printf("problem")
	}

	var result model.User
	if err := trueUser.Decode(&result); err != nil {
		fmt.Printf("%s", err.Error())
	}

	if result.Password != user.Password {
		response := map[string]interface{}{
			"message": "Wrong password",
			"success": true,
		}
		json.NewEncoder(w).Encode(response)
		return
	}

	token, _ := auth.GenerateToken(result.Id.Hex(), result.Name)

	response := map[string]interface{}{
		"message": "Successfully logged in",
		"success": true,
		"token":   token,
	}

	jsonBytes, err := json.Marshal(response)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonBytes)
}
