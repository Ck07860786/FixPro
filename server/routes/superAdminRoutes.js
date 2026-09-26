import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getDashboardStats,
  updateBusinessStatus,
  getAllBusinesses,
  getAllUsers,
} from "../controllers/superadmin/superadmin.controller.js";

const router = express.Router();

// Middleware to check SUPER_ADMIN role
const superAdminOnly = (req, res, next) => {
  if (req.user.role !== "SUPER_ADMIN") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Super Admin only.",
    });
  }
  next();
};

router.get("/stats", authMiddleware, superAdminOnly, getDashboardStats);
router.get("/businesses", authMiddleware, superAdminOnly, getAllBusinesses);
router.get("/users", authMiddleware, superAdminOnly, getAllUsers);
router.patch(
  "/businesses/:businessId/status",
  authMiddleware,
  superAdminOnly,
  updateBusinessStatus
);

export default router;
