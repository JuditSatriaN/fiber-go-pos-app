package jwt

import (
	"crypto/rand"
	"crypto/rsa"
	"time"

	"github.com/fiber-go-pos-app/internal/app/constant"
	"github.com/golang-jwt/jwt/v4"
)

var privateKey *rsa.PrivateKey

func GenerateJWT() error {
	var err error
	privateKey, err = rsa.GenerateKey(rand.Reader, 2048)
	return err
}

func GetPrivateKey() *rsa.PrivateKey {
	return privateKey
}

func CreateJWTToken(req constant.JWTRequest) (string, error) {
	// Create the Claims
	claims := jwt.MapClaims{
		"user_id": req.UserID,
		"name":    req.Name,
		"admin":   req.IsAdmin,
		"exp":     time.Now().Add(time.Hour * 72).Unix(),
	}

	// Create token
	token := jwt.NewWithClaims(jwt.SigningMethodRS256, claims)

	// Generate encoded token and send it as response.
	t, err := token.SignedString(privateKey)
	if err != nil {
		return t, err
	}
	return t, nil
}
