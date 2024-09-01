// controllers/expenseController.js

const Expense = require('../models/Expense');

const addExpense = async (req, res) => {
    const { category, amount, date } = req.body;

    try {
        const expense = new Expense({
            user: req.user.id,
            category,
            amount,
            date,
        });

        await expense.save();
        res.json(expense);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const updateExpense = async (req, res) => {
    const { category, amount, date } = req.body;

    try {
        let expense = await Expense.findById(req.params.id);

        if (!expense) {
            return res.status(404).json({ msg: 'Expense not found' });
        }

        if (expense.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        expense = await Expense.findByIdAndUpdate(
            req.params.id,
            { category, amount, date },
            { new: true }
        );

        res.json(expense);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const deleteExpense = async (req, res) => {
    try {
        let expense = await Expense.findById(req.params.id);

        if (!expense) {
            return res.status(404).json({ msg: 'Expense not found' });
        }

        if (expense.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Expense.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Expense removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
        res.json(expenses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = { addExpense, updateExpense, deleteExpense, getExpenses };
