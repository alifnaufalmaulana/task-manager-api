const express = require('express');
const db = require('./config/database');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

require('dotenv').config();

app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', taskRoutes);

app.get('/', (req, res) => {
  res.send('Task Manager API running');
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
