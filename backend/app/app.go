package app

import (
	"backend/api"
	"backend/store"
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
)

type Application struct {
	Logger        *log.Logger
	SquareHandler *api.SquareHandler
	DB            *sql.DB
}

func NewApplication() (*Application, error) {
	logger := log.New(os.Stdout, "", log.Ldate|log.Ltime)

	db, err := store.Open()
	if err != nil {
		return nil, err
	}

	squareHandler := api.NewSquareHandler()

	app := &Application{
		Logger:        logger,
		SquareHandler: squareHandler,
		DB:            db,
	}
	return app, nil
}

func (app *Application) HealthCheck(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Server Is Healthy\n")
}
