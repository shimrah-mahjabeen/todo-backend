import express from "express";
import taskRoutes from "./routes/taskRoutes";

import cors from "cors";

const app = express();

// Middleware
app.use(express.json());

// Middleware
app.use(cors());

// Simple route
app.get("/", (req, res) => {
  res.send("Everything is working fine!");
});

// Task routes
app.use("/api/tasks", taskRoutes);

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
