// routes/budgetRoutes.js
const express = require('express');
const { check } = require('express-validator');
const { addBudget, getBudgets } = require('../controllers/budgetController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   POST /api/budgets
// @desc    Add a new budget
// @access  Private
router.post(
  '/',
  [
    protect,
    [
      check('category', 'Category is required').not().isEmpty(),
      check('amount', 'Amount is required').isNumeric(),
      check('month', 'Month is required').isNumeric(),
      check('year', 'Year is required').isNumeric(),
    ],
  ],
  addBudget
);

// @route   GET /api/budgets
// @desc    Get all budgets
// @access  Private
router.get('/', protect, getBudgets);

module.exports = router;
