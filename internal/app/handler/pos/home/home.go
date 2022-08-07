package home

import (
	"github.com/fiber-go-pos-app/internal/app/constant"
	"github.com/gofiber/fiber/v2"

	customPkg "github.com/fiber-go-pos-app/internal/pkg/custom"
)

func WebPOSHomeHandler(ctx *fiber.Ctx) error {

	return ctx.Render("web/template/pos/index", constant.WebData{
		BaseURL:      constant.BaseURL,
		StaticUrl:    constant.StaticUrl,
		LinkPageList: constant.LinkPageList,
		CurrentURL:   constant.WebPOSHomeURL,
		Title:        constant.WebPOSHomeTitle,
		ServerURL:    customPkg.GetServerHost(),
	})
}
