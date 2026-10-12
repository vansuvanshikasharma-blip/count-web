# JobWale

A LinkedIn-style job portal starter built with:
- React + Vite (Node.js is used for the frontend toolchain)
- Java + Spring Boot REST API
- MongoDB
- JSON seed/demo dataset

## Features
- Login / signup
- Roles: Admin, Recruiter, Job Seeker
- Recruiter / seeker profile foundation
- Job search
- Filters: location, salary, category, experience
- Resume upload UI
- Connections UI
- Public profile foundation
- Recruiter application workflow foundation
- Applied / shortlisted status UI
- JSON dataset

## Run frontend
```bash
npm install
npm run dev
```
Frontend: http://localhost:5173

## Run backend
Requirements: Java 17+, Maven, MongoDB.

```bash
cd backend
mvn spring-boot:run
```
Backend: http://localhost:8080

## JSON dataset
`public/jobs.json` contains sample jobs. You can replace it with your own dataset or expose it from the Java API.

## Important architecture note
The requested stack says "React and Node.js for frontend" and "Java for backend". React itself runs in the browser; Node.js is therefore used here for Vite/npm development and build tooling, while Java/Spring Boot owns the REST backend. MongoDB is the database.
# JobWale
