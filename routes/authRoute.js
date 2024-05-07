const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/authControllers.js");

const authRoutes = express.Router();

//routes
//REGISTER || POST
authRoutes.post("/register", registerController);
authRoutes.get("/register", (req, res) => {
  res.send("hi");
});

// LOGIN || POST
authRoutes.post("/login", loginController);

module.exports = authRoutes;
