const jwt = require('jsonwebtoken');
const secretKey = "secret12345";
const User = require('../models/user.model.js')

exports.getUserInfo = (req, res) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(400).json({ status: "error", error: "Token is missing" });
        }

        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.status(403).json({ status: "error", error: "Invalid token" });
            }

const { email } = decoded;
            // Find user by email in the database
            User.findOne({ email }, 'email', (err, user) => {
                if (err) {
                    return res.status(500).json({ status: "error", error: "Internal server error" });
                }
                if (!user) {
                    return res.status(404).json({ status: "error", error: "User not found" });
                }
                res.json({ status: "ok", user });
            });
        });
    } catch (error) {
        res.status(500).json({ status: "error", error: "Internal server error" });
    }
};
