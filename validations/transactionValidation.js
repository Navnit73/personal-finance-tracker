// validations/transactionValidation.js

const Joi = require('joi');

const transactionValidation = Joi.object({
  type: Joi.string().valid('income', 'expense').required(),
  category: Joi.string().required(),
  amount: Joi.number().positive().required(),
  date: Joi.date().optional(),
  description: Joi.string().allow('', null).optional(),
  tags: Joi.array().items(Joi.string()).optional(),
});

module.exports = transactionValidation;
