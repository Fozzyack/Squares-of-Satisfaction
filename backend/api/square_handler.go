package api

import (
	"fmt"
	"github.com/go-chi/chi/v5"
	"net/http"
	"strconv"
)

type SquareHandler struct{}

func NewSquareHandler() *SquareHandler {
	return &SquareHandler{}
}

func (sh *SquareHandler) HandleGetSquareByID(w http.ResponseWriter, r *http.Request) {
	paramsSquareID := chi.URLParam(r, "id")
	if paramsSquareID == "" {
		http.NotFound(w, r)
		return
	}
	squareID, err := strconv.ParseInt(paramsSquareID, 10, 64)
	if err != nil {
		http.NotFound(w, r)
		return
	}
	fmt.Fprintf(w, "This is the square ID: %d\n", squareID)
}
func (sh *SquareHandler) HandleGetSquareByCategoryID(w http.ResponseWriter, r *http.Request) {
	paramsCategoryID := chi.URLParam(r, "id")
	if paramsCategoryID == "" {
		http.NotFound(w, r)
		return
	}
	categoryID, err := strconv.ParseInt(paramsCategoryID, 10, 64)
	if err != nil {
		http.NotFound(w, r)
		return
	}
	fmt.Fprintf(w, "Getting Squares for Category ID: %d\n", categoryID)
}

func (sh *SquareHandler) HandleGetAllSquares(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Getting All Squares\n")
}

func (sh *SquareHandler) HandleCreateSquare(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Created a workout\n")
}
