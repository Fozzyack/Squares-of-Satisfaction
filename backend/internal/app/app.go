package app

import (
	"backend/api"
	"backend/database"
	"backend/internal/store"
	"backend/migrations"
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
)

type Application struct {
	Logger      *log.Logger
	UserHandler *api.UserHandler
	DB          *sql.DB
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

	postgresStore := store.NewPostgresStore(pgDB) // Importing the postgres store

	// Handlers
	userHandler := api.NewUserHandler(postgresStore)

	app := &Application{
		Logger:      logger,
		UserHandler: userHandler,
		DB:          pgDB,
	}
	return app, nil
}

func (app *Application) HealthCheck(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Server Is Healthy\n")
}
