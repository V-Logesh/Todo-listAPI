const express = require("express");
const { createTask, listTasks, updateTask, deleteTask } = require("../controllers/todoController");
const router = express.Router();
const auth = require("../middlewares/auth");

router.post("/todos", auth, createTask);
router.get("/todos", auth, listTasks);
router.put("/todos/:id", auth, updateTask);
router.delete("/todos/:id", auth, deleteTask);

module.exports = router;
