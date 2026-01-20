package store

import "time"

type NewUser struct {
	Id string `json:"id"`
	Email string `json:"email"`
	Username string `json:"username"`
	Password string `json:"password"`
}

type User struct {
	Id           string    `json:"id"`
	Email        string    `json:"email"`
	Username     string    `json:"username"`
	PasswordHash string    `json:"-"` // Never include password hash in JSON responses
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}

type UserStore interface {
	CreateUser(newUser NewUser) (*User, error)
	GetUserById(id string) (*User, error)
}

func (pg *PostgresStore) CreateUser (newUser NewUser) (*User, error) {
	tx, err := pg.db.Begin()
	if err != nil {
		return nil, err
	}
	defer tx.Rollback()

	query := `
	INSERT INTO users (id, email, username, password_hash)
	VALUES (uuid_generate_v4(), $1, $2, $3)
	RETURNING id, email, username, created_at
	`

	var user = &User{}
	err = tx.QueryRow(query, newUser.Email, newUser.Username, newUser.Password).Scan(user.Email, user.Username)
	if err != nil {
		return nil, err
	}

	return user, nil
}

