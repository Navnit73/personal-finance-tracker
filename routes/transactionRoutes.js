// routes/transactionRoutes.js
const express = require('express');
const { check } = require('express-validator');
const {
  addTransaction,
  getTransactions,
  deleteTransaction,
} = require('../controllers/transactionController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   POST /api/transactions
// @desc    Add a new transaction
// @access  Private
router.post(
  '/',
  [
    protect,
    [
      check('type', 'Type is required').not().isEmpty(),
      check('category', 'Category is required').not().isEmpty(),
      check('amount', 'Amount is required').isNumeric(),
    ],
  ],
  addTransaction
);

// @route   GET /api/transactions
// @desc    Get all transactions
// @access  Private
router.get('/', protect, getTransactions);

// @route   DELETE /api/transactions/:id
// @desc    Delete a transaction
// @access  Private
router.delete('/:id', protect, deleteTransaction);

module.exports = router;
