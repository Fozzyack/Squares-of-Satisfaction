package app

import (
	"backend/api"
	"backend/store"
	"fmt"
	"log"
	"net/http"
	"os"
)

type Application struct {
	Logger        *log.Logger
	SquareHandler *api.SquareHandler
	DatabaseInfo  *store.DatabaseInfo
}

func NewApplication() (*Application, error) {
	logger := log.New(os.Stdout, "", log.Ldate|log.Ltime)

	databaseInfo := store.NewDatabaseInfo()
	squareHandler := api.NewSquareHandler()

	app := &Application{
		Logger:        logger,
		SquareHandler: squareHandler,
		DatabaseInfo:  databaseInfo,
	}
	return app, nil
}

func (app *Application) HealthCheck(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Server Is Healthy\n")
}
