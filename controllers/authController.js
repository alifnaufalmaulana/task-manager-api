const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: 'All fields are required',
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    name,
    email,
    password: hashedPassword,
  };

  userModel.createUser(newUser, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: 'Failed to create user',
      });
    }

    res.json({
      message: 'User registered successfully',
    });
  });
};

const jwt = require('jsonwebtoken');

const loginUser = (req, res) => {
  const { email, password } = req.body;

  userModel.findUserByEmail(email, async (err, result) => {
    if (result.length === 0) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: 'Wrong password',
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      message: 'Login success',
      token: token,
    });
  });
};

module.exports = {
  registerUser,
  loginUser,
};
