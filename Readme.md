#### Task Management REST API

### Overview

This project is a scalable REST API built with Node.js, Express, and MongoDB implementing:

JWT Authentication

Role-Based Access Control (User/Admin)

CRUD operations for Tasks

Input validation & secure password hashing

API Versioning

Swagger Documentation

React frontend integration

### Tech Stack

Node.js

Express.js

MongoDB (Mongoose)

JWT Authentication

bcryptjs

express-validator

Swagger

React (Frontend)

### Setup Instructions

Backend
cd backend
npm install
npm run dev

Create .env using .env.example.

Frontend
cd frontend
npm install
npm start

### Authentication

POST /api/v1/auth/register

POST /api/v1/auth/login

JWT token required for protected routes.

### Task APIs

GET /api/v1/tasks

POST /api/v1/tasks

PUT /api/v1/tasks/:id

DELETE /api/v1/tasks/:id

Users can manage their own tasks.
Admins can manage all tasks.

### API Documentation

Available at:

http://localhost:5000/api-docs
Scalability & Future Improvements

This backend follows a modular architecture for scalability. Future improvements include:

Docker containerization

Load balancing with Nginx

Redis caching layer

CI/CD pipeline integration

Horizontal scaling using multiple server instances

Migration to microservices architecture if required
