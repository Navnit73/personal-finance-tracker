// controllers/userController.js

const User = require('../models/User');

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const updateUser = async (req, res) => {
    const { name, email } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { name, email },
            { new: true }
        ).select('-password');

        res.json(updatedUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = { getUser, updateUser };
