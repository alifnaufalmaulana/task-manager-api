const db = require('../config/database');

const createTask = (task, callback) => {
  const sql = 'INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)';

  db.query(sql, [task.user_id, task.title, task.description], (err, result) => {
    callback(err, result);
  });
};

const getTasksByUser = (userId, callback) => {
  const sql = 'SELECT * FROM tasks WHERE user_id = ?';

  db.query(sql, [userId], (err, result) => {
    callback(err, result);
  });
};

const updateTask = (taskId, task, callback) => {
  const sql = `
  UPDATE tasks
  SET title = ?, description = ?, status = ?
  WHERE id = ? AND user_id = ?
  `;

  db.query(sql, [task.title, task.description, task.status, taskId, task.user_id], (err, result) => {
    callback(err, result);
  });
};

const deleteTask = (taskId, userId, callback) => {
  const sql = 'DELETE FROM tasks WHERE id = ? AND user_id = ?';

  db.query(sql, [taskId, userId], (err, result) => {
    callback(err, result);
  });
};

module.exports = {
  createTask,
  getTasksByUser,
  updateTask,
  deleteTask,
};
