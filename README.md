# Expense Tracker (Spendify)

A full-stack Expense Tracker application split into Backend (Node.js + Express + MongoDB) and Frontend (React + Vite). This repository includes a REST API for managing users, accounts, categories and transactions, and a React UI for interacting with the API.

## Contents
- **Backend/** - Express API, routes, controllers, and MongoDB models
- **Frontend/** - React app built with Vite (JSX components and pages)

## Features
- User registration, login and JWT-based authentication
- CRUD for accounts, categories and transactions
- Input validation and basic middleware for security
- Session model for token/session handling

## Tech Stack
- Backend: Node.js, Express, MongoDB, Mongoose
- Frontend: React, Vite, axios 

## API Endpoints Structure

**Authentication Routes** (`/api/user/authentication`)

- `POST /register` - User registration
- `POST /login` - User authentication
- `GET /logout-all` - User logout from all devices

**Profile Routes** (`/api/user/proflie`)

- `GET /get-me` - Get current user info 
- `POST /set-currency` - set user currency

**Category Routes** (`/api/user/category`)

- `POST /add` - add new category
- `DELETE /delete` - delete category
- `GET /get-all` - Get all categories of current user

**Account Routes** (`/api/user/account`)

- `POST /add` - add new account 
- `DELETE /delete` - delete account
- `GET /get-all` - Get all account details of current user 

**Transaction Routes** (`/api/user/transaction`)

- `POST /add` - add new transaction
- `GET /get-all` - Get all transaction details of current user 
- `GET /stats` - get statistics of transactions [balance,income,expense]