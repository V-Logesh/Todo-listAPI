const Todo = require("../models/todo");

exports.createTask = async (req, res) => {
  const { title } = req.body;
  try {
    const newTask = new Todo({
      title,
      user: req.user._id,
    });
    await newTask.save();
    res.json(newTask);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.listTasks = async (req, res) => {
  try {
    const tasks = await Todo.find({ user: req.user._id });
    res.json(tasks);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Todo.findById(req.params.id);
    if (!task || task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    task.title = req.body.title || task.title;
    task.completed = req.body.completed !== undefined ? req.body.completed : task.completed;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Todo.findById(req.params.id);
    if (!task || task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await task.deleteOne();
    res.json({ message: 'Task removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
