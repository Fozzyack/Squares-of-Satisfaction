package store

import "time"

type User struct {
	Id           string    `json:"id"`
	Email        string    `json:"email"`
	Username     string    `json:"username"`
	PasswordHash string    `json:"-"` // Never include password hash in JSON responses
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

type Activity struct {
	Id          string    `json:"id"`
	UserId      string    `json:"user_id"`
	Name        string    `json:"name"`
	Description *string   `json:"description"` // Pointer because it's nullable in DB
	Color       string    `json:"color"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type ActivityEntry struct {
	Id          string    `json:"id"`
	ActivityId  string    `json:"activity_id"`
	UserId      string    `json:"user_id"`
	CompletedAt time.Time `json:"completed_at"`
	Notes       *string   `json:"notes"` // Pointer because it's nullable in DB
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}
