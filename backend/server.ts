import express, { Request, Response } from "express";
import { WebSocketServer, WebSocket } from "ws";
import { createClient } from "redis";
import { MongoClient } from "mongodb";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
app.use(cors());

// Redis Client Setup
const redisClient = createClient({
  url: `redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

redisClient.connect().catch(console.error);

// MongoDB Client Setup
const mongoClient = new MongoClient(process.env.MONGO_URL as string);
const db = mongoClient.db(process.env.MONGO_DB);
const tasksCollection = db.collection(process.env.MONGO_COLLECTION as string);

// WebSocket Server
wss.on("connection", (ws: WebSocket) => {
  ws.on("message", async (message: WebSocket) => {
    const parsedMessage = JSON.parse(message.toString());
    console.log("websocket is on");

    if (parsedMessage.event === "add") {
      const newTask = parsedMessage.data;
      const currentTasks = await redisClient.get(
        `FULLSTACK_TASK_${process.env.FIRST_NAME}`
      );
      const tasks: string[] = currentTasks ? JSON.parse(currentTasks) : [];
      tasks.push(newTask);

      console.log("length of tasks is : ", tasks.length);

      if (tasks.length > 50) {
        console.log("inserting in mongodb");
        await tasksCollection.insertMany(tasks.map((task) => ({ task })));
        await redisClient.del(`FULLSTACK_TASK_${process.env.FIRST_NAME}`);
      } else {
        console.log("setting in Redis");
        await redisClient.set(
          `FULLSTACK_TASK_${process.env.FIRST_NAME}`,
          JSON.stringify(tasks)
        );
      }
    }
  });
});

// HTTP Endpoint to Fetch All Tasks
app.get("/fetchAllTasks", async (req: Request, res: Response) => {
  const tasks = await redisClient.get(
    `FULLSTACK_TASK_${process.env.FIRST_NAME}`
  );
  if (tasks) {
    return res.json({ tasks: JSON.parse(tasks) });
  } else {
    return res.status(404).json({ message: "No tasks found in Redis cache" });
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
