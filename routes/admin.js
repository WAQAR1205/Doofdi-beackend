import express from "express";

import { isAdminAuthenticated } from "../middlewares/auth.js";
import {
  addNewAdmin,
  getUserDetails,
  logoutAdmin,
} from "../controllers/adminController.js";

const router = express.Router();

router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);

export default router;
