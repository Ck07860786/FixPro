import mongoose from "mongoose";

const serviceRequestSchema = new mongoose.Schema(
    {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        serviceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service",
            required: true,
        },

        businessId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Business",
            required: true,
            index: true,
        },

        assignedTechnicianId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Technician",
            default: null,
        },

        status: {
            type: String,
            enum: [
                "PENDING",
                "CONFIRMED",
                "IN_PROGRESS",
                "COMPLETED",
                "CANCELLED",
                "ON_HOLD",
            ],
            default: "PENDING",
            index: true,
        },

        scheduledDate: {
            type: Date,
            required: true,
        },

        scheduledTimeSlot: {
            type: String,
            enum: ["MORNING", "AFTERNOON", "EVENING"],
            required: true,
        },

        customerAddress: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            pincode: { type: String, required: true },
        },

        customerNotes: {
            type: String,
            trim: true,
            maxlength: 500,
        },

        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },

        paymentStatus: {
            type: String,
            enum: ["UNPAID", "PAID", "REFUNDED"],
            default: "UNPAID",
        },

        cancellationReason: {
            type: String,
            trim: true,
        },

        technicianNotes: {
            type: String,
            trim: true,
        },

        issueReported: {
            type: Boolean,
            default: false,
        },

        issueDescription: {
            type: String,
            trim: true,
        },

        completedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("ServiceRequest", serviceRequestSchema);