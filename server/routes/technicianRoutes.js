import express from "express";
import {
  addTechnician,
  getTechnicians,
  getTechnicianById,
  updateTechnician,
  deleteTechnician,
  updateTechnicianStatus,
} from "../controllers/technician/technician.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addTechnician);
router.get("/", authMiddleware, getTechnicians);
router.put("/status", authMiddleware, updateTechnicianStatus);
router.put("/:id/status", authMiddleware, updateTechnicianStatus);
router.get("/:id", authMiddleware, getTechnicianById);
router.put("/:id", authMiddleware, updateTechnician);
router.delete("/:id", authMiddleware, deleteTechnician);

export default router;
