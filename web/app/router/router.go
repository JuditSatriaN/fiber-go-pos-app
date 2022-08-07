package router

import (
	"github.com/gofiber/fiber/v2"

	jwtMiddleware "github.com/fiber-go-pos-app/internal/pkg/middleware/jwt"
	loginRouter "github.com/fiber-go-pos-app/web/app/router/login"
	posRouter "github.com/fiber-go-pos-app/web/app/router/pos"
)

// BuildWebRouter : Function to handle all web router in this project
func BuildWebRouter(app *fiber.App) {
	loginRouter.BuildLoginRoutes(app)
	//errorRouter.BuildError404NotFound(app)

	posGroup := app.Group("/pos")
	posGroup.Use(jwtMiddleware.AccessTokenMiddleware())
	posRouter.BuildPOSRoutes(posGroup)
}
