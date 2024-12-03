# Project Name: User Authentication and Management System

## Overview

This project provides an API for user authentication and management. It allows users to register, log in, and manage their accounts, including deleting individual users or all users at once. The API uses JSON Web Tokens (JWT) for authentication.

## Folder Structure

controller/
    auth.js (Handles user registration, login, and management)
db/
    connect.js (Database connection setup using Mongoose)
error/
    errorHandler.js (Handles errors and sends appropriate responses)
middleware/
    authentication.js (JWT-based authentication middleware)
model/
    User.js (User schema definition with password hashing and JWT creation)
routes/
    auth.js (Defines routes for authentication and user management)


## API Endpoints

### 1. **POST /register**
- Registers a new user.
- Request body: 
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
Response:
{
  "user": {
    "name": "string",
    "id": "user_id",
    "email": "string"
  },
  "token": "jwt_token",
  "message": "REGISTRATION SUCCESSFUL"
}
Success Status Code: 201 Created

### 2. **POST /login**
Authenticates a user and returns a JWT.
Request body:
{
  "email": "string",
  "password": "string"
}
Response : 
{
  "user": {
    "name": "string",
    "id": "user_id",
    "email": "string"
  },
  "token": "jwt_token",
  "message": "LOGIN SUCCESSFUL"
}
status code : 200 OK

### 3. **DELETE /deleteall**
Deletes all users in the database. Protected by JWT authentication.
No request body required.
Response  : 
{
  "message": "number_of_rows deleted"
}status code : 200 OK

### 4. **DELETE /userId**
Deletes a specific user by userId. Protected by JWT authentication.
URL Params: userId
Response:
{
  "message": "User successfully deleted"
}
status code : 200 OK

### 5. **GET /getall**

Fetches all users from the database. Protected by JWT authentication.
Response : 
{
  "users": [
    {
      "name": "string",
      "email": "string",
      "id": "user_id"
    }
  ],
  "message": "FETCH SUCCESSFUL"
}


How to Use
1. Set Up the Environment
Clone the repository.
Create a .env file in the root directory with the following variables:

    JWT_SECRET=your_jwt_secret
    JWT_LIFETIME=your_jwt_lifetime
    MONGO_URI=your_mongo_db_uri

## *Code Explanation*

### *1. controller/auth.js*
    This file contains the logic for user registration, login, and management (deleting users).
    - register: Handles the creation of a new user and generates a JWT token.
    - login: Authenticates an existing user and generates a JWT token.
    - deleteUser: Deletes a specific user by userId.
    - deleteAllUserr: Deletes all users in the database.
    - getAll: Retrieves all users from the database.





### *2. db/connect.js*
    This file establishes the connection to the MongoDB database using Mongoose.

### *3. error/errorHandler.js*
    A custom error handler middleware that catches errors and sends appropriate responses.

### *4. middleware/authentication.js*
    This middleware checks for a valid JWT token in the request headers and authenticates the user.

### *5. model/User.js*
    Defines the User schema using Mongoose, including password hashing, JWT creation, and password comparison methods.

### *6. routes/auth.js*
    Defines the routes for authentication and user management, including registration, login, deleting users, and fetching all users.

### *Error Handling*

The project uses custom error handling to return appropriate messages and HTTP status codes in case of errors:
    - 400: Bad Request (e.g., missing or invalid input)
    - 401: Unauthorized (e.g., invalid or missing JWT token)
    - 404: Not Found (e.g., user not found)
    - 500: Internal Server Error (e.g., unexpected errors)

