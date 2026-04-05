const Joi = require('joi');

const validateUser = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    role: Joi.string().valid('admin', 'analyst', 'viewer'),
    status: Joi.string().valid('active', 'inactive'),
  });
  return schema.validate(data);
};

const validateRecord = (data) => {
  const schema = Joi.object({
    amount: Joi.number().required(),
    type: Joi.string().valid('income', 'expense').required(),
    category: Joi.string().min(2).max(50).required(),
    date: Joi.date(),
    description: Joi.string().min(2).max(200).required(),
  });
  return schema.validate(data);
};

module.exports = { validateUser, validateRecord };
