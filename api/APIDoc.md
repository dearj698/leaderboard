# Leaderboard API Documentation

This documentation provides an overview of the APIs implemented in the Leaderboard application. These APIs serve various purposes related to a leaderboard system.

## Base URL

All API endpoints are relative to the base URL of your application.

```
Base URL: http://localhost:5038
```

## Authentication

Currently, this API does not require authentication.

## Error Handling

The API handles errors by responding with appropriate status codes and error messages.

## Endpoints

### 1. Get Users

- **Endpoint**: `/api/leaderboard/GetUsers`
- **Method**: GET
- **Description**: Retrieves a list of users from the leaderboard.
- **Request Parameters**: None
- **Success Response**:
  - **Status Code**: 200 OK
  - **Response Body**: An array of user objects.

### 2. Delete User

- **Endpoint**: `/api/leaderboard/DeleteUser`
- **Method**: DELETE
- **Description**: Deletes a user from the leaderboard based on their ID.
- **Request Parameters**:
  - `id` (query parameter): The ID of the user to be deleted.
- **Success Response**:
  - **Status Code**: 200 OK
  - **Response Body**: "Delete successfully"

### 3. Add User

- **Endpoint**: `/api/leaderboard/AddUser`
- **Method**: POST
- **Description**: Adds a new user to the leaderboard.
- **Request Body**: JSON object containing user data (e.g., name, score).
- **Success Response**:
  - **Status Code**: 200 OK
  - **Response Body**: "User added successfully"

### 4. Update User

- **Endpoint**: `/api/leaderboard/UpdateUser`
- **Method**: PUT
- **Description**: Updates an existing user's information in the leaderboard based on their ID.
- **Request Parameters**:
  - `id` (query parameter): The ID of the user to be updated.
- **Request Body**: JSON object containing user data to update.
- **Success Response**:
  - **Status Code**: 200 OK
  - **Response Body**: "User updated successfully"

## Usage Examples

Here are some usage examples for the provided API endpoints:

### Get Users

```http
GET http://localhost:5038/api/leaderboard/GetUsers
```

### Delete User

```http
DELETE http://localhost:5038/api/leaderboard/DeleteUser?id=1
```

### Add User

```http
POST http://localhost:5038/api/leaderboard/AddUser
Content-Type: application/json

{
  "name": "John Doe",
  "score": 100
}
```

### Update User

```http
PUT http://localhost:5038/api/leaderboard/UpdateUser?id=1
Content-Type: application/json

{
  "name": "Updated Name",
  "score": 150
}
```