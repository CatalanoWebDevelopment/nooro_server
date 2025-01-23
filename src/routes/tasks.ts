import { Router } from "express";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController";

const router = Router();

router.get("/", getTasks);
router.post("/", createTask as any);
router.get("/:id", getTask as any);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
