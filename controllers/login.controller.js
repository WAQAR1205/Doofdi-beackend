const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const secretKey = "secret12345";

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({ status: "error", error: "Invalid email or password" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ status: "error", error: "Invalid email or password" });
        }

        const token = jwt.sign({ userId: user._id, first_name: user.first_name, email: user.email }, secretKey);
        
        res.json({ status: "ok", token });
    } catch (error) {
        res.status(500).json({ status: "error", error: "Internal server error" });
    }
};
