import mongoose from "mongoose";

const businessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    phone: String,

    businessType: String,

    logo: String,

    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
    },

    status: {
      type: String,
      enum: ["PENDING", "ACTIVE", "REJECTED", "SUSPENDED"],
      default: "PENDING",
    },

    rejectionReason: String,

    approvedAt: Date,

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Business',businessSchema)