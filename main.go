package main

import (
	"embed"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/fiber-go-pos-app/internal/app/constant"
	"github.com/fiber-go-pos-app/internal/pkg/custom"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/filesystem"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/gofiber/template/html"
	"github.com/joho/godotenv"

	webRouter "github.com/fiber-go-pos-app/web/app/router"
	goccyJson "github.com/goccy/go-json"
)

// Embed a template directory
//go:embed web/template/*
var embedDirTemplate embed.FS

// Embed a static directory
//go:embed web/static/*
var embedDirStatic embed.FS

// Embed a private pem files
//go:embed schema/pem/private.pem
var embedPrivatePEMFile []byte

func main() {
	app := fiber.New(fiber.Config{
		ReadTimeout:  5 * time.Second,
		WriteTimeout: 3 * time.Second,
		AppName:      constant.AppName,
		JSONEncoder:  goccyJson.Marshal,
		JSONDecoder:  goccyJson.Unmarshal,
		Views:        html.NewFileSystem(http.FS(embedDirTemplate), constant.HtmlExtension),
	})

	// Setting basic configuration
	app.Use(logger.New(), recover.New())
	app.Use(constant.StaticUrl, filesystem.New(filesystem.Config{
		Browse:     true,
		Root:       http.FS(embedDirStatic),
		PathPrefix: constant.StaticPathPrefix,
	}))

	// Setting JWT RS256
	if err := custom.GenerateJWT(embedPrivatePEMFile); err != nil {
		log.Fatalf("rsa.GenerateKey: %v", err)
	}

	if err := godotenv.Load(); err != nil {
		panic(err)
	}

	custom.SetServerHost(os.Getenv("SIS_HOST"))

	// Web handler
	webRouter.BuildWebRouter(app)

	if err := app.Listen(":9000"); err != nil {
		panic(err)
	}
}
