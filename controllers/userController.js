const userModel = require("../models/userModel.js");
const bcrypt = require("bcryptjs");

const userControllers = async (req, res) => {
  // res.status(200).send("user data");
  console.log(req.body.id);
  try {
    const user = await userModel.findById(
      { _id: req.body.id }
      // {_id:0}
    );
    // Validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    //hinde password
    //  user.password = undefined;
    //response
    res.status(200).send({
      success: true,
      message: "User get Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in api",
      error,
    });
  }
};

// update user
const updateUserController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.id });
    if (!user) {
      res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    // update user
    const { userName, phone, address } = req.body;
    if (userName) user.userName = userName;
    if (phone) user.phone = phone;
    if (address) user.address = address;
    await user.save();
    res.status(200).send({
      success: true,
      message: "user updated successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in update API",
    });
  }
};

// UPDATE USER PASSWORR
const updateUserPassword = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id });
    //valdiation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Usre Not Found",
      });
    }
    // get data from user
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Old or New PasswOrd",
      });
    }
    //check user password  | compare password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid old password",
      });
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Updated!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Password Update API",
      error,
    });
  }
};
// RESET PASSWORD

const ResetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      res.status(500).send({
        success: false,
        message: "error Please provide all fields",
      });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      res.status(500).send({
        success: false,
        message: "user not found",
      });
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in password reset try again later",
      error,
    });
  }
};
const deleteUserController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Your account has been deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr In Delete Profile API",
      error,
    });
  }
};

module.exports = {
  userControllers,
  updateUserController,
  updateUserPassword,
  ResetPasswordController,
  deleteUserController,
};
