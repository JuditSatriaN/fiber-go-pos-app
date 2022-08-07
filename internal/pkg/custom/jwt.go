package custom

import (
	"crypto/rsa"
	"crypto/x509"
	"encoding/pem"
)

var privateKey *rsa.PrivateKey

// GenerateJWT function to generate private key jwt
func GenerateJWT(embedPrivatePEMFile []byte) error {
	var err error
	privateKeyDecode, _ := pem.Decode(embedPrivatePEMFile)
	privateKey, _ = x509.ParsePKCS1PrivateKey(privateKeyDecode.Bytes)
	return err
}

// GetPrivateKey function to get private key jwt
func GetPrivateKey() *rsa.PrivateKey {
	return privateKey
}
