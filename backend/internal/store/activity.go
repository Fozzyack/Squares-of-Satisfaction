package store

import "time"

type Activity struct {
	Id          string    `json:"id"`
	UserId      string    `json:"user_id"`
	Name        string    `json:"name"`
	Description *string   `json:"description"` // Pointer because it's nullable in DB
	Color       string    `json:"color"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}
