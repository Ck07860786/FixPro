import express from "express";
import {
    createServiceRequest,
    getMyServiceRequests,
    getBusinessServiceRequests,
    getServiceRequestById,
    updateRequestStatus,
    cancelServiceRequest,
    getTechnicianServiceRequests,
} from "../controllers/service/serviceRequest.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createServiceRequest);
router.get("/my", authMiddleware, getMyServiceRequests);
router.get("/technician", authMiddleware, getTechnicianServiceRequests);
router.get("/business/:businessId", authMiddleware, getBusinessServiceRequests);
router.get("/:id", authMiddleware, getServiceRequestById);
router.put("/:id/status", authMiddleware, updateRequestStatus);
router.put("/:id/cancel", authMiddleware, cancelServiceRequest);

export default router;
