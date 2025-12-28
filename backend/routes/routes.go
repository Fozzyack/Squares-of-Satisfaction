package routes

import (
	"backend/app"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func SetupRoutes(app *app.Application) *chi.Mux {

	r := chi.NewRouter()

	r.Use(middleware.RealIP)
	r.Use(middleware.Recoverer)
	r.Use(middleware.RequestID)
	r.Use(middleware.Logger)

	r.Get("/health", app.HealthCheck)
	r.Get("/squares/{id}", app.SquareHandler.HandleGetSquareByID)
	r.Post("/squares", app.SquareHandler.HandleCreateSquare)

	return r
}
