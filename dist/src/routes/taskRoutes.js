"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = __importDefault(require("../prisma"));
const router = express_1.default.Router();
// GET /tasks - Fetch all tasks
router.get("/", async (req, res) => {
    try {
        const tasks = await prisma_1.default.task.findMany();
        res.status(200).json(tasks);
    }
    catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
});
// POST /tasks - Create a new task
router.post("/", async (req, res) => {
    const { title, color } = req.body;
    // Validate input
    if (!title || !color) {
        res.status(400).json({ error: "Title and color are required" });
        return;
    }
    try {
        const newTask = await prisma_1.default.task.create({
            data: { title, color },
        });
        res.status(201).json(newTask);
    }
    catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: "Failed to create task" });
    }
});
// PUT /tasks/:id - Update a task
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, color, completed } = req.body;
    // Validate input
    if (!id || (!title && !color && typeof completed !== "boolean")) {
        res.status(400).json({ error: "Invalid task data provided" });
        return;
    }
    try {
        const updatedTask = await prisma_1.default.task.update({
            where: { id: parseInt(id, 10) },
            data: { title, color, completed },
        });
        res.status(200).json(updatedTask);
    }
    catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: "Failed to update task" });
    }
});
// DELETE /tasks/:id - Delete a task
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    // Validate input
    if (!id) {
        res.status(400).json({ error: "Task ID is required" });
        return;
    }
    try {
        await prisma_1.default.task.delete({
            where: { id: parseInt(id, 10) },
        });
        res.status(204).send();
    }
    catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: "Failed to delete task" });
    }
});
exports.default = router;
