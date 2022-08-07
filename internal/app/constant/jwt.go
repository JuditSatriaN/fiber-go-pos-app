package constant

// JWT Token constants

const JWTMethod = "RS256"

// Web JWT token constants

const JWTAccessCookiesKey = "jwtPOSAccessToken"
const JWTRefreshCookiesKey = "jwtPOSRefreshToken"

type JWTTokenKey struct {
	AccessToken  string
	RefreshToken string
}

type JWTRequest struct {
	UserID  string
	Name    string
	IsAdmin bool
}
