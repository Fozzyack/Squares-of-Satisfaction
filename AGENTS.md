# AGENTS.md

This document provides guidelines and instructions for agentic coding agents working on this repository.

## Project Overview

Squares of Satisfaction is a visual habit tracker with a Next.js/React frontend and a Go backend using Chi router and PostgreSQL.

## Build, Lint, and Test Commands

### Database (Docker)
```bash
docker-compose up -d  # Start PostgreSQL database
```

### Frontend (Client)
```bash
cd client
bun install                  # Install dependencies
bun run dev                  # Start development server (http://localhost:3000)
bun run build                # Build for production
bun run start                # Start production server
bun run lint                 # Run ESLint
bun run lint --fix           # Run ESLint with auto-fix
```

### Backend (Go)
```bash
cd backend
go run main.go              # Start development server (http://localhost:8090)
go build -o backend main.go # Build binary
```

### Running Tests
This project does not currently have a test suite. When adding tests:
- Frontend: Use Bun's test runner (`bun test`) or Vitest
- Backend: Use Go's built-in testing (`go test`)

## Code Style Guidelines

### General
- No comments unless explicitly requested
- Concise, direct code
- Avoid unnecessary abstractions

### TypeScript/React (client/)

**Imports**
```typescript
// Group imports by type: external → internal → relative
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
```

**Formatting**
- Tab width: 4 spaces
- Semicolons: yes
- Single quotes for strings

**Types**
- Use explicit types for function parameters and return values
- Avoid `any`; use `unknown` when type is uncertain
- Use interface for object types, type alias for unions/primitives

**Naming**
- Components: PascalCase (e.g., `HomePage`)
- Hooks: camelCase with `use` prefix (e.g., `useAuth`)
- Variables/functions: camelCase
- Constants: SCREAMING_SNAKE_CASE

**React Patterns**
- Use `"use client"` directive for client components
- Prefer function components with hooks over class components
- Use `useGSAP` for GSAP animations (already imported from `@gsap/react`)

**Error Handling**
- Use try/catch with async/await
- Handle errors gracefully with user feedback
- Log errors for debugging

### Go (backend/)

**Imports**
```go
import (
    "backend/api"
    "backend/database"
    "backend/migrations"
    "database/sql"
    "fmt"
    "log"
    "net/http"
    "os"
)
```
- Group imports: standard library → external → internal

**Naming**
- Packages: lowercase, short, descriptive (e.g., `api`, `store`)
- Exported types/functions: PascalCase
- Unexported: lowercase
- Receiver variables: 1-2 letters (e.g., `app`, `sh`)

**Error Handling**
- Return errors as values, don't use exceptions
- Use `fmt.Errorf("message: %w", err)` for wrapping
- Handle errors at the appropriate level
- Log errors with context using the application logger

**Functions**
- Keep functions focused and small
- Use receivers for methods on types
- Return meaningful errors

**HTTP Handlers**
- Chi router: `HandleGetX`, `HandlePostX`, etc. naming pattern
- Use `http.NotFound` for 404s
- Write responses directly to `http.ResponseWriter`

### Database
- Migrations in `backend/migrations/` using Goose
- PostgreSQL 18 with pgx v5 driver
- Database name: `squares`

### Configuration Files
- `.prettierrc`: 4 space tabs, semicolons
- `tsconfig.json`: strict mode, paths `@/*` for client
- `eslint.config.mjs`: Next.js config with TypeScript

### File Structure
```
client/
  app/           # Next.js App Router pages
  public/        # Static assets
  next.config.ts # Next.js configuration
backend/
  api/           # HTTP handlers
  database/      # DB connection
  internal/      # Internal packages (app, store)
  migrations/    # DB migrations
  main.go        # Entry point
```

### Ports
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8090`
- PostgreSQL: `localhost:6000`
