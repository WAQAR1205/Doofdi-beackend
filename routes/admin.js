const express = require("express");
const isAdminAuthenticated = require("../middleware/admin");
const { logoutAdmin, getUserDetails, addNewAdmin } = require("../controllers/adminController");


const adminRouter = express.Router();

adminRouter.post("/addnew", isAdminAuthenticated, addNewAdmin);
adminRouter.get("/admin/me",  isAdminAuthenticated, getUserDetails);
adminRouter.get("/admin/logout", isAdminAuthenticated, logoutAdmin );

module.exports = adminRouter;