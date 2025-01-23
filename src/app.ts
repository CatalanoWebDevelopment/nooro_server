import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import tasksRouter from "./routes/tasks";

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/tasks", tasksRouter);

export default app;
