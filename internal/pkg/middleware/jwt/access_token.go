package jwt

import (
	"github.com/fiber-go-pos-app/internal/app/constant"
	"github.com/gofiber/fiber/v2"

	customPkg "github.com/fiber-go-pos-app/internal/pkg/custom"
	jwtWare "github.com/gofiber/jwt/v3"
)

// AccessTokenMiddleware function to handle access token middleware in web
func AccessTokenMiddleware() fiber.Handler {

	return jwtWare.New(jwtWare.Config{
		SigningMethod: constant.JWTMethod,
		ErrorHandler:  jwtWebAccessTokenError,
		SigningKey:    customPkg.GetPrivateKey().Public(),
		TokenLookup:   "header:Authorization,cookie:" + constant.JWTAccessCookiesKey,
	})
}

//jwtWebAccessTokenError custom package to handle jwt web token error
func jwtWebAccessTokenError(ctx *fiber.Ctx, err error) error {
	if err.Error() == constant.ErrMissingOrMalformedJWT {
		return ctx.Redirect(ctx.BaseURL())
	}

	return ctx.Next()
}
