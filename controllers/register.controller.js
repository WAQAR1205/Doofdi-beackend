const bcrypt = require("bcrypt");
const User = require("../models/user.model");

exports.register = async (req, res) => {
  try {
    const { first_name, last_name, email, password, gender, profile } =
      req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: "error", error: "Email already exists" });
    }

    if (password.length <= 6) {
      return res.status(400).json({
        status: "error",
        error: "Password length must be greater than 6",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      gender,
      profile,
    });

    res.json({ status: "ok" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ status: "error", error: "Internal server error" });
  }
};
