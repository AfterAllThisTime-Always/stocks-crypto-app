package model

import (
	"github.com/golang-jwt/jwt/v5"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	Id       primitive.ObjectID `bson:"_id,omitempty"`
	Name     string             `bson:"name, omitempty"`
	Email    string             `bson:"email, omitempty"`
	Password string             `bson:"password, omitempty"`
}

type Preferences struct {
	Id       primitive.ObjectID `bson:"_id,omitempty"`
	UserId   primitive.ObjectID `bson:"email, omitempty"`
	Favs     []string           `bson:"favs, omitempty"`
	Currency string             `bson:"currency, omitempty"`
}

type TokenBody struct {
	Id       string
	Username string
	jwt.RegisteredClaims
}
