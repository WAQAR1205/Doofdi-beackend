const express = require("express");
const {
  userControllers,
  updateUserController,
  ResetPasswordController,
  updateUserPassword,
  deleteUserController,
} = require("../controllers/userController.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const userRoutes = express.Router();

userRoutes.get("/getuser", authMiddleware, userControllers);
userRoutes.put("/updateuser", authMiddleware, updateUserController);
userRoutes.post("/updatepassword", authMiddleware, updateUserPassword);
userRoutes.put("/resetpassword", authMiddleware, ResetPasswordController);
userRoutes.delete("/deleteuser/:id", authMiddleware, deleteUserController);

module.exports = userRoutes;
