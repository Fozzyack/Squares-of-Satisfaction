package app

import (
	"backend/api"
	"backend/database"
	"backend/migrations"
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

	pgDB, err := database.Open()
	if err != nil {
		return nil, err
	}

	err = database.MigrateFS(pgDB, migrations.FS, ".")
	if err != nil {
		return nil, fmt.Errorf("failed to run migrations: %w", err)
	}

	squareHandler := api.NewSquareHandler()

	app := &Application{
		Logger:        logger,
		SquareHandler: squareHandler,
		DB:            pgDB,
	}
	return app, nil
}

func (app *Application) HealthCheck(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Server Is Healthy\n")
}
