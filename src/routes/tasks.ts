import { Router } from "express";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  searchTasks,
} from "../controllers/taskController";

const router = Router();

router.get("/", getTasks);
router.post("/", createTask as any);
router.get("/search/:query", searchTasks);
router.get("/:id", getTask as any);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
