package store

import "time"

type ActivityEntry struct {
	Id          string    `json:"id"`
	ActivityId  string    `json:"activity_id"`
	UserId      string    `json:"user_id"`
	CompletedAt time.Time `json:"completed_at"`
	Notes       *string   `json:"notes"` // Pointer because it's nullable in DB
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}
