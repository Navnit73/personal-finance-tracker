// controllers/budgetController.js
const Budget = require('../models/Budget');
const { validationResult } = require('express-validator');

// @desc    Add a new budget
// @route   POST /api/budgets
// @access  Private
exports.addBudget = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { category, amount, month, year } = req.body;

  try {
    const budget = new Budget({
      user: req.user.id,
      category,
      amount,
      month,
      year,
    });

    await budget.save();

    res.status(201).json(budget);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get budgets for the logged-in user
// @route   GET /api/budgets
// @access  Private
exports.getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user.id });

    res.json(budgets);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
