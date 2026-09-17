import mongoose from "mongoose";

const technicianSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
      index: true,
    },

    specialization: {
      type: String,
      required: true,
      trim: true,
    },

    experienceYears: {
      type: Number,
      default: 0,
      min: 0,
    },

    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    employmentType: {
      type: String,
      enum: [
        "FULL_TIME",
        "PART_TIME",
        "CONTRACT",
      ],
      default: "FULL_TIME",
    },

    profileImage: {
      type: String,
      default: null,
    },

    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
    },

    joiningDate: {
      type: Date,
      default: Date.now,
    },

    availabilityStatus: {
      type: String,
      enum: [
        "AVAILABLE",
        "BUSY",
        "OFFLINE",
      ],
      default: "AVAILABLE",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Technician",
  technicianSchema
);