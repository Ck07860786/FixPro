import express from "express";
import {
  createService,
  deleteService,
  getAllPublicServices,
  getBusinessServices,
  getPublicServiceById,
  getServiceById,
  getServiceCategories,
  updateService,
} from "../controllers/service/service.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { uploadServiceImages } from "../middleware/upload.js";

const router = express.Router();

router.get("/public", getAllPublicServices);
router.get("/public/categories", getServiceCategories);
router.get("/public/:id", getPublicServiceById);
router.get("/categories", getServiceCategories);

router.post("/create", authMiddleware, uploadServiceImages, createService);
router.get("/", authMiddleware, getBusinessServices);
router.get("/:id", authMiddleware, getServiceById);
router.put("/:id", authMiddleware, uploadServiceImages, updateService);
router.delete("/:id", authMiddleware, deleteService);

export default router;
