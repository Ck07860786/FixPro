import ServiceRequest from "../../models/serviceRequest.js";
import Service from "../../models/serviceModel.js";
import User from "../../models/userModel.js";
import Business from "../../models/businessModel.js";
import Technician from "../../models/technicianModel.js";

export const createServiceRequest = async (req, res) => {
    try {
        const {
            serviceId,
            businessId,
            scheduledDate,
            scheduledTimeSlot,
            customerAddress,
            customerNotes,
            totalAmount,
        } = req.body;

        if (!serviceId || !businessId || !scheduledDate || !scheduledTimeSlot || !customerAddress || !totalAmount) {
            return res.status(400).json({ message: "Required fields are missing" });
        }

        const service = await Service.findById(serviceId);
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        const serviceRequest = await ServiceRequest.create({
            customerId: req.user.userId,
            serviceId,
            businessId,
            scheduledDate,
            scheduledTimeSlot,
            customerAddress,
            customerNotes,
            totalAmount,
        });

        return res.status(201).json({
            message: "Service request created successfully",
            serviceRequest,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getMyServiceRequests = async (req, res) => {
    try {
        const serviceRequests = await ServiceRequest.find({ customerId: req.user.userId })
            .populate("serviceId", "name category images price")
            .populate("businessId", "name email phone")
            .populate({
                path: "assignedTechnicianId",
                select: "userId specialization experienceYears skills address availabilityStatus",
                populate: { path: "userId", select: "name email phone" },
            })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Service requests fetched successfully",
            serviceRequests,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getBusinessServiceRequests = async (req, res) => {
    try {
        const { businessId } = req.params;

        const serviceRequests = await ServiceRequest.find({ businessId })
            .populate("customerId", "name email phone")
            .populate("serviceId", "name category price")
            .populate({
                path: "assignedTechnicianId",
                select: "userId specialization experienceYears skills address availabilityStatus",
                populate: { path: "userId", select: "name email phone" },
            })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Business service requests fetched successfully",
            serviceRequests,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getServiceRequestById = async (req, res) => {
    try {
        const serviceRequest = await ServiceRequest.findById(req.params.id)
            .populate("customerId", "name email phone")
            .populate("serviceId", "name category images price estimatedDuration")
            .populate("businessId", "name email phone address")
            .populate({
                path: "assignedTechnicianId",
                select: "userId specialization experienceYears skills address availabilityStatus",
                populate: { path: "userId", select: "name email phone" },
            });

        if (!serviceRequest) {
            return res.status(404).json({ message: "Service request not found" });
        }

        return res.status(200).json({
            message: "Service request fetched successfully",
            serviceRequest,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getTechnicianServiceRequests = async (req, res) => {
    try {
        const technician = await Technician.findOne({ userId: req.user.userId });
        if (!technician) {
            return res.status(404).json({ message: "Technician profile not found" });
        }

        const serviceRequests = await ServiceRequest.find({
            assignedTechnicianId: technician._id,
        })
            .populate("customerId", "name email phone")
            .populate("serviceId", "name category price estimatedDuration images")
            .populate("businessId", "name email phone address")
            .populate({
                path: "assignedTechnicianId",
                select: "userId specialization experienceYears skills address availabilityStatus",
                populate: { path: "userId", select: "name email phone" },
            })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Technician service requests fetched successfully",
            serviceRequests,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateRequestStatus = async (req, res) => {
    try {
        const {
            status,
            assignedTechnicianId,
            cancellationReason,
            technicianNotes,
            issueReported,
            issueDescription,
        } = req.body;

        if (!status) {
            return res.status(400).json({ message: "Status is required" });
        }

        const validStatuses = [
            "PENDING",
            "CONFIRMED",
            "IN_PROGRESS",
            "COMPLETED",
            "CANCELLED",
            "ON_HOLD",
        ];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const serviceRequest = await ServiceRequest.findById(req.params.id);
        if (!serviceRequest) {
            return res.status(404).json({ message: "Service request not found" });
        }

        if (req.user.role === "TECHNICIAN") {
            const tech = await Technician.findOne({ userId: req.user.userId });
            if (!tech || String(serviceRequest.assignedTechnicianId) !== String(tech._id)) {
                return res.status(403).json({ message: "You are not authorized to update this service request" });
            }
        }

        serviceRequest.status = status;

        if (assignedTechnicianId && req.user.role !== "TECHNICIAN") {
            serviceRequest.assignedTechnicianId = assignedTechnicianId;
        }

        if (technicianNotes !== undefined) {
            serviceRequest.technicianNotes = technicianNotes;
        }

        if (issueReported !== undefined) {
            serviceRequest.issueReported = issueReported;
        }

        if (issueDescription !== undefined) {
            serviceRequest.issueDescription = issueDescription;
        }

        if (status === "CANCELLED" && cancellationReason) {
            serviceRequest.cancellationReason = cancellationReason;
        }

        if (status === "COMPLETED") {
            serviceRequest.completedAt = new Date();
        }

        await serviceRequest.save();

        const populatedRequest = await ServiceRequest.findById(serviceRequest._id)
            .populate("customerId", "name email phone")
            .populate("serviceId", "name category price estimatedDuration images")
            .populate("businessId", "name email phone address")
            .populate({
                path: "assignedTechnicianId",
                select: "userId specialization experienceYears skills address availabilityStatus",
                populate: { path: "userId", select: "name email phone" },
            });

        return res.status(200).json({
            message: "Service request updated successfully",
            serviceRequest: populatedRequest,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const cancelServiceRequest = async (req, res) => {
    try {
        const { cancellationReason } = req.body;

        const serviceRequest = await ServiceRequest.findOne({
            _id: req.params.id,
            customerId: req.user.userId,
        });

        if (!serviceRequest) {
            return res.status(404).json({ message: "Service request not found" });
        }

        if (serviceRequest.status === "IN_PROGRESS" || serviceRequest.status === "COMPLETED") {
            return res.status(400).json({ message: "Cannot cancel a request that is already in progress or completed" });
        }

        serviceRequest.status = "CANCELLED";
        serviceRequest.cancellationReason = cancellationReason || "Cancelled by customer";
        await serviceRequest.save();

        const populatedRequest = await ServiceRequest.findById(serviceRequest._id)
            .populate("customerId", "name email phone")
            .populate("serviceId", "name category price")
            .populate({
                path: "assignedTechnicianId",
                select: "userId specialization experienceYears skills address availabilityStatus",
                populate: { path: "userId", select: "name email phone" },
            });

        return res.status(200).json({
            message: "Service request cancelled successfully",
            serviceRequest: populatedRequest,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
