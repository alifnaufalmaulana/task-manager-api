const db = require('../config/database');

const createUser = (user, callback) => {
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';

  db.query(sql, [user.name, user.email, user.password], (err, result) => {
    callback(err, result);
  });
};

const findUserByEmail = (email, callback) => {
  const sql = 'SELECT * FROM users WHERE email = ?';

  db.query(sql, [email], (err, result) => {
    callback(err, result);
  });
};

module.exports = {
  createUser,
  findUserByEmail,
};
