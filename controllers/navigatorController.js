const User = require('../models/user.model.js');

exports.getMenu = (req, res) => {
const { first_name } = req.headers;
User.findOne({ first_name }).exec()
    .then(user => {
        if (user) {
            const menu = user.role === 'admin' ? ['Dashboard', 'Users', 'Settings'] : ['Dashboard', 'Profile'];
            res.json(menu);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    })
    .catch(err => {
        console.error('Error fetching menu:', err);
        res.status(500).json({ message: 'Internal server error' });
    });
};