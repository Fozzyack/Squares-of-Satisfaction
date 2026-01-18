package api

import (
	"backend/internal/store"
	"encoding/json"
	"fmt"
	"net/http"
)

type ActivityHandler struct {
	activityStore store.ActivityStore
}

func newActivityHandler(activityStore store.ActivityStore) *ActivityHandler {
	return &ActivityHandler{
		activityStore: activityStore,
	}
}

func (ah *ActivityHandler) HandleCreateActivity(w http.ResponseWriter, r *http.Request) {
	var activity store.Activity
	err := json.NewDecoder(r.Body).Decode(&activity)
	if err != nil {
		fmt.Println(err) // Will change in the future
		http.Error(w, "failed to create workout", http.StatusInternalServerError)
		return
	}

	createdActivity, err := ah.activityStore.CreateActivity(&activity)
	if err != nil {
		fmt.Println(err) // Will change in the future
		http.Error(w, "failed to create workout - db", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(createdActivity)
}
