package api

import (
	"backend/internal/store"
	"encoding/json"
	"fmt"
	"net/http"
)

type UserHandler struct {
	userStore store.UserStore
}

func NewUserHandler(userStore store.UserStore) *UserHandler {
	return &UserHandler{userStore: userStore}
}

func (uh *UserHandler) HandleCreateUser(w http.ResponseWriter, r *http.Request) {
	var newUser store.NewUser
	err := json.NewDecoder(r.Body).Decode(&newUser)
	if err != nil {
		fmt.Println(err)
		http.Error(w, "Could not decode json Response for creating User", http.StatusInternalServerError)
		return
	}

	createdUser, err := uh.userStore.CreateUser(newUser)
	if err != nil {
		fmt.Println(err)
		http.Error(w, "Could Not Create New User", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(createdUser)
}
