package store

import (
	"time"
)

type Activity struct {
	Id          string          `json:"id"`
	UserId      string          `json:"user_id"`
	Name        string          `json:"name"`
	Description *string         `json:"description"` // Pointer because it's nullable in DB
	Color       string          `json:"color"`
	Entries     []ActivityEntry `json:"entries`
	CreatedAt   time.Time       `json:"created_at"`
	UpdatedAt   time.Time       `json:"updated_at"`
}

type ActivityStore interface {
	CreateActivity(*Activity) (*Activity, error)
	GetActivityById(id string) (*Activity, error)
}

func (pg *PostgresStore) CreateActivity(activity *Activity) (*Activity, error) {
	tx, err := pg.db.Begin()
	if err != nil {
		return nil, err
	}
	defer tx.Rollback()

	query := `
	INSERT INTO activities (user_id, name, description, color)
	VALUES ($1, $2, $3, $4)
	RETURNING id
	`

	err = tx.QueryRow(query, activity.UserId, activity.Name, activity.Description, activity.Color).Scan(&activity.Id)
	if err != nil {
		return nil, err
	}

	err = tx.Commit()
	if err != nil {
		return nil, err
	}

	return activity, nil
}

func (pg *PostgresStore) GetActivityById(id string) (*Activity, error) {
	activity := &Activity{}
	return activity, nil
}
