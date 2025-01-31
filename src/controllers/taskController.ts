import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Task } from "../types/Task";
import Fuse from "fuse.js";

const prisma = new PrismaClient();

// GET /tasks/search/:query
export const searchTasks = async (req: Request, res: Response) => {
  try {
    const { query } = req.params;
    
    const fuseOptions = {
      keys: ["title"],
    };

    const allTasks = await prisma.task.findMany();
    const fuse = new Fuse(allTasks, fuseOptions);

    const tasks = fuse.search(query)?.map((result) => result.item);

    res.json(tasks ?? null);
  } catch (error) {
    res.status(500).json({ error: "Failed to search tasks" });
  }
};

// GET /tasks
export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany();

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

// GET /tasks/:id
export const getTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch task" });
  }
};

// POST /tasks
export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, color } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const newTask: Task = await prisma.task.create({
      data: {
        title,
        color,
      },
    });

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
};

// PUT /tasks/:id
export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, color, completed } = req.body;

    const updatedTask: Task = await prisma.task.update({
      where: { id },
      data: {
        title,
        color,
        completed,
      },
    });

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to update task" });
  }
};

// DELETE /tasks/:id
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.task.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete task" });
  }
};
