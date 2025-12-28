# Squares of Satisfaction

A visual habit tracker that helps you build better habits through GitHub-style contribution squares.

## About

Squares of Satisfaction is a habit tracking application that visualizes your progress using a grid of squares, similar to GitHub's contribution graph. Track any habit and watch your consistency grow.

## Features

- Animated landing page with interactive squares
- User authentication (login/signup UI)
- Clean, modern interface with smooth animations
- Built with Next.js, React, and Go

## Getting Started

### Prerequisites

- Bun
- Go 1.25+
- Docker and Docker Compose

### Setup

Start the database:
```bash
docker-compose up -d
```

Start the frontend:
```bash
cd client
bun install
bun run dev
```

Start the backend:
```bash
cd backend
go run main.go
```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:8090`.

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS, GSAP
- **Backend**: Go, Chi Router
- **Database**: PostgreSQL 18
