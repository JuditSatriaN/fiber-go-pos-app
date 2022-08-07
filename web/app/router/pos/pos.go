package pos

import (
	"github.com/gofiber/fiber/v2"

	homeHandler "github.com/fiber-go-pos-app/internal/app/handler/pos/home"
)

func BuildPOSRoutes(service fiber.Router) {
	service.Get("/", homeHandler.WebPOSHomeHandler)
}
