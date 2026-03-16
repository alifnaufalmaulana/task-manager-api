const Joi = require('joi');

const taskSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(3).required(),
  status: Joi.string().valid('todo', 'in_progress', 'done'),
});

module.exports = taskSchema;
