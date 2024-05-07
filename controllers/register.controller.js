const bcrypt = require('bcrypt');
const User = require('../models/user.model');

exports.register = async (req, res) => {
    try {
        const { first_name, last_name, email, password, gender, profile } = req.body;
        
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: "error", error: "Email already exists" });
        }
        
        // Validate password length
        if (password.length <= 6) {
            return res.status(400).json({ status: "error", error: "Password length must be greater than 6" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the user to the database
        await User.create({ 
            first_name,
            last_name,
            email,
            password: hashedPassword,
            gender,
            profile 
        });

        // Return success response
        res.json({ status: "ok" });
    } catch (error) {
        // Handle errors
        console.error("Error registering user:", error);
        res.status(500).json({ status: "error", error: "Internal server error" });
    }
};
