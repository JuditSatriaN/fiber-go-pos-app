package custom

import (
	"github.com/gofiber/fiber/v2"
)

func BuildJSONRes(ctx *fiber.Ctx, response interface{}) error {
	ctx.Set("content-type", "application/json; charset=utf-8")
	return ctx.JSON(response)
}

func BuildDatatableRes(ctx *fiber.Ctx, total int64, data interface{}) error {
	ctx.Set("content-type", "application/json; charset=utf-8")
	return ctx.JSON(map[string]interface{}{
		"total": total,
		"rows":  data,
	})
}
