import express, { Request, Response, Router } from "express";
import prisma from "../prisma";

const Fuse = require("fuse.js");

const router: Router = express.Router();

// GET /tasks - Fetch all tasks
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await prisma.task.findMany();
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// POST /tasks - Create a new task
router.post("/", async (req: Request, res: Response): Promise<void> => {
  const { title, color } = req.body;

  // Validate input
  if (!title || !color) {
    res.status(400).json({ error: "Title and color are required" });
    return;
  }

  try {
    const newTask = await prisma.task.create({
      data: { title, color },
    });
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
});

// PUT /tasks/:id - Update a task
router.put("/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, color, completed } = req.body;

  // Validate input
  if (!id || (!title && !color && typeof completed !== "boolean")) {
    res.status(400).json({ error: "Invalid task data provided" });
    return;
  }

  try {
    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id, 10) },
      data: { title, color, completed },
    });
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Failed to update task" });
  }
});

// DELETE /tasks/:id - Delete a task
router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  // Validate input
  if (!id) {
    res.status(400).json({ error: "Task ID is required" });
    return;
  }

  try {
    await prisma.task.delete({
      where: { id: parseInt(id, 10) },
    });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

router.get("/search", async (req: Request, res: Response): Promise<void> => {
  const { query } = req.query;
  console.log("Query:", query);
  
  try {
    const tasks = await prisma.task.findMany();
    const options = {
      keys:["title"],
      threshold: 0.3,
    };
    const fuse = new Fuse(tasks, options);
    const results = fuse.search((query)).map((result: { item: any; }) => result.item);
    console.log(results);
    
    res.status(200).json(results);
    }
    catch (error) {
    console.error("Error searching tasks:", error);
    res.status(500).json({ error: "Failed to search tasks" });
  }
})

export default router;
