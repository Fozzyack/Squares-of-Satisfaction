package routes

import (
	"backend/app"

	"github.com/go-chi/chi/v5"
)

func SetupRoutes(app *app.Application) *chi.Mux {
	r := chi.NewRouter()

	r.Get("/health", app.HealthCheck)
	r.Get("/squares/{id}", app.SquareHandler.HandleGetSquareByID)
	r.Post("/squares", app.SquareHandler.HandleCreateSquare)
	return r
}
