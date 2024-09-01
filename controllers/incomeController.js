// controllers/incomeController.js

const Income = require('../models/Income');

const addIncome = async (req, res) => {
    const { source, amount, date } = req.body;

    try {
        const income = new Income({
            user: req.user.id,
            source,
            amount,
            date,
        });

        await income.save();
        res.json(income);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const updateIncome = async (req, res) => {
    const { source, amount, date } = req.body;

    try {
        let income = await Income.findById(req.params.id);

        if (!income) {
            return res.status(404).json({ msg: 'Income not found' });
        }

        if (income.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        income = await Income.findByIdAndUpdate(
            req.params.id,
            { source, amount, date },
            { new: true }
        );

        res.json(income);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const deleteIncome = async (req, res) => {
    try {
        let income = await Income.findById(req.params.id);

        if (!income) {
            return res.status(404).json({ msg: 'Income not found' });
        }

        if (income.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Income.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Income removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const getIncome = async (req, res) => {
    try {
        const income = await Income.find({ user: req.user.id }).sort({ date: -1 });
        res.json(income);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = { addIncome, updateIncome, deleteIncome, getIncome };
