// controllers/budgetController.js

const Budget = require('../models/Budget');

const createBudget = async (req, res) => {
    const { category, amount, startDate, endDate } = req.body;

    try {
        const budget = new Budget({
            user: req.user.id,
            category,
            amount,
            startDate,
            endDate,
        });

        await budget.save();
        res.json(budget);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const updateBudget = async (req, res) => {
    const { category, amount, startDate, endDate } = req.body;

    try {
        let budget = await Budget.findById(req.params.id);

        if (!budget) {
            return res.status(404).json({ msg: 'Budget not found' });
        }

        if (budget.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        budget = await Budget.findByIdAndUpdate(
            req.params.id,
            { category, amount, startDate, endDate },
