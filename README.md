# AI Customer Support and Workflow Automation Platform

An AI-powered support ticket system: submit a ticket → OpenAI automatically 
classifies it (category + urgency) and drafts a reply → agent reviews on a 
live dashboard.

## Stack
Node.js, Express, PostgreSQL (via Docker), OpenAI API, HTML/JS dashboard.

## Features
- REST API for ticket creation, listing, and status updates
- Automatic AI classification (category + urgency) on every new ticket
- AI-drafted reply generation using OpenAI's structured JSON output
- Real-time dashboard for tracking tickets and workflow status

## Setup
1. `docker compose up -d` — starts PostgreSQL
2. `npm install` — installs dependencies
3. Copy `.env.example` to `.env` and add your OpenAI API key
4. `npm start` — runs the server
5. Open `http://localhost:4000`

## Tech highlights
- Uses OpenAI's `response_format: json_object` for reliable structured output
- PostgreSQL with connection pooling via `pg`
- Clean REST API design (`POST /api/tickets`, `GET /api/tickets`, `PATCH /api/tickets/:id/status`)