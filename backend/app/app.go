package app

import (
	"backend/api"
	"fmt"
	"log"
	"net/http"
	"os"
)

type Application struct {
	Logger        *log.Logger
	SquareHandler *api.SquareHandler
}

func NewApplication() (*Application, error) {
	logger := log.New(os.Stdout, "", log.Ldate|log.Ltime)

	squareHandler := api.NewSquareHandler()

	app := &Application{
		Logger:        logger,
		SquareHandler: squareHandler,
	}
	return app, nil
}

func (app *Application) HealthCheck(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Server Is Healthy\n")
}
