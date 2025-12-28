package main

import (
	"backend/app"
	"net/http"
	"time"
)

func main() {
	app, err := app.NewApplication()
	if err != nil {
		panic(err)
	}

	app.Logger.Println("App Started")

	server := &http.Server{
		Addr:         ":8090",
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	err = server.ListenAndServe()
	if err != nil {
		app.Logger.Fatal("There was an issue running the server")
	}
}
