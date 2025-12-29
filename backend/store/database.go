package store

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/jackc/pgx/v5/stdlib"
)

type DatabaseInfo struct{}

func NewDatabaseInfo() *DatabaseInfo {
	return &DatabaseInfo{}
}

func (di *DatabaseInfo) Open() (*sql.DB, error) {
	db, err := sql.Open("pgx", os.Getenv("DATABASE_URL"))
	if err != nil {
		return nil, fmt.Errorf("Unable to Connect to Database: %v\n", err)
	}
	return db, err
}
