package login

import (
	"github.com/fiber-go-pos-app/internal/app/constant"
	"github.com/gofiber/fiber/v2"

	customPkg "github.com/fiber-go-pos-app/internal/pkg/custom"
)

func WebLoginHandler(ctx *fiber.Ctx) error {

	return ctx.Render("web/template/login/index", constant.WebData{
		BaseURL:      constant.BaseURL,
		StaticUrl:    constant.StaticUrl,
		CurrentURL:   constant.WebLoginURL,
		LinkPageList: constant.LinkPageList,
		Title:        constant.WebLoginTitle,
		ServerURL:    customPkg.GetServerHost(),
	})
}
