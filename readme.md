# You need to run npm start in both backend and frontend

## This project implements a full-stack To-Do List app using Node.js with WebSockets and HTTP API for backend functionality, along with React.js for the frontend. It includes Redis for caching and MongoDB for persistent storage.

Features
Add Tasks: Users can add new tasks via WebSocket messages (add event).
Redis Caching: Tasks are stored temporarily in Redis under the key FULLSTACK_TASK_ujjwal.
MongoDB Storage: Once the task list exceeds 50 items in Redis, they are moved to MongoDB and removed from Redis.
HTTP API: Retrieve all tasks using the /fetchAllTasks HTTP endpoint.
Responsive UI: The frontend is built in React.js, following a provided Figma design and styled using Tailwind. The design is responsive and fits well on mobile and tablet screens.
Technologies Used
Frontend: React.js (TypeScript), Tailwind.
Backend: Node.js (TypeScript), WebSockets , HTTP API.
Database: Redis (for caching), MongoDB (for persistent storage).
Deployment: Suitable for deployment on Vercel, Netlify, or any similar hosting platform.

## Setup Instructions
Backend Setup
Clone the repository:
Move to the backend directory:

cd backend
npm install
### Start the backend server:
npm start
This runs the server.ts file, which handles WebSocket connections, the HTTP API, Redis caching, and MongoDB operations.

## Frontend Setup
Move to the frontend directory:

cd ../frontend
Install the dependencies:
npm install
Start the frontend server:
npm start
