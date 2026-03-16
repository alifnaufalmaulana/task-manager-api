const taskModel = require('../models/taskModel');
const taskValidator = require('../validators/taskValidator');

const createTask = (req, res) => {
  const { error } = taskValidator.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  const { title, description } = req.body;

  const newTask = {
    user_id: req.userId,
    title,
    description,
  };

  taskModel.createTask(newTask, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: 'Failed to create task',
      });
    }

    res.json({
      message: 'Task created successfully',
    });
  });
};

const getTasks = (req, res) => {
  const userId = req.userId;

  taskModel.getTasksByUser(userId, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: 'Failed to fetch tasks',
      });
    }

    res.json(result);
  });
};

const updateTask = (req, res) => {
  const taskId = req.params.id;

  const { title, description, status } = req.body;

  const taskData = {
    user_id: req.userId,
    title,
    description,
    status,
  };

  taskModel.updateTask(taskId, taskData, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: 'Failed to update task',
      });
    }

    res.json({
      message: 'Task updated successfully',
    });
  });
};

const deleteTask = (req, res) => {
  const taskId = req.params.id;

  const userId = req.userId;

  taskModel.deleteTask(taskId, userId, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: 'Failed to delete task',
      });
    }

    res.json({
      message: 'Task deleted successfully',
    });
  });
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  taskValidator,
};
