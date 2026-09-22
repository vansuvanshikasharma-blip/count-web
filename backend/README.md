# JobWale Java backend

## Stack
- Java 17
- Spring Boot
- MongoDB
- Maven

## Run
1. Start MongoDB locally.
2. From `backend/`, run:
   `mvn spring-boot:run`
3. API starts at `http://localhost:8080`.

Endpoints:
- POST `/api/auth/signup`
- POST `/api/auth/login`
- GET `/api/jobs`
- GET `/api/jobs/{id}`
- POST `/api/jobs`
- POST `/api/jobs/{id}/apply`
- GET `/api/jobs/applications/{seekerId}`

This starter intentionally keeps authentication simple so the project is easy to understand. For production, replace the demo UUID token with JWT + role-based authorization and add proper validation, password reset and file storage.
