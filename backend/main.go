package main

import (
	"backend/app"
	"backend/routes"
	"flag"
	"fmt"
	"net/http"
	"os"
	"time"
)

func main() {
	var port int
	flag.IntVar(&port, "port", 8090, "go backend server port")
	flag.Parse()

	app, err := app.NewApplication()
	if err != nil {
		panic(err)
	}

	db, err := app.DatabaseInfo.Open()
	if err != nil {
		panic(err)
	}

	// Testing DB
	var greeting string
	err = db.QueryRow("select 'Hello, world!'").Scan(&greeting)
	if err != nil {
		fmt.Fprintf(os.Stderr, "QueryRow failed: %v\n", err)
		os.Exit(1)
	}

	fmt.Println(greeting)

	r := routes.SetupRoutes(app)
	app.Logger.Printf("Server is Starting on port: %d\n", port)
	server := &http.Server{
		Addr:         fmt.Sprintf(":%d", port),
		Handler:      r,
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	err = server.ListenAndServe()
	if err != nil {
		app.Logger.Fatal("There was an issue running the server")
	}
}
