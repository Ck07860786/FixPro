import mongoose from "mongoose";
import crypto from "crypto";
import { hashPassword } from "../../helper/authHelper.js";
import User from "../../models/userModel.js";
import Technician from "../../models/technicianModel.js";
const generateTempPassword = () =>
  crypto.randomBytes(6).toString("base64url").slice(0, 8);
export const addTechnician = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    const {
      name,
      email,
      phone,
      specialization,
      experienceYears,
      skills,
      employmentType,
      address,
    } = req.body;

    const businessId = req.user.businessId;
    if (!name || !email || !phone || !specialization) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email, phone and specialization are required",
      });
    }

    if (!businessId) {
      return res.status(403).json({
        success: false,
        message: "No business associated with your account",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "A user already exists with this email",
      });
    }
    const existingPhone = await User.findOne({
      phone: phone.trim(),
    });

    if (existingPhone) {
      return res.status(409).json({
        success: false,
        message:
          "A user already exists with this phone number",
      });
    }
    const tempPassword = generateTempPassword();
    const hashedPassword = await hashPassword(tempPassword);

    session.startTransaction();
    const user = await User.create(
      [
        {
          name: name.trim(),
          email: normalizedEmail,
          phone: phone.trim(),
          password: hashedPassword,
          role: "TECHNICIAN",
        },
      ],
      { session }
    );

    const createdUser = user[0];
    let parsedSkills = [];
    if (skills) {
      parsedSkills =
        typeof skills === "string"
          ? skills
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : Array.isArray(skills)
          ? skills
          : [];
    }
    const technician = await Technician.create(
      [
        {
          userId: createdUser._id,
          businessId,
          specialization: specialization.trim(),
          experienceYears: experienceYears || 0,
          skills: parsedSkills,
          employmentType: employmentType || "FULL_TIME",
          address: address || {},
        },
      ],
      { session }
    );

    const createdTechnician = technician[0];

    await session.commitTransaction();

    return res.status(201).json({
      success: true,
      message: "Technician added successfully",
      technician: {
        _id: createdTechnician._id,
        userId: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        phone: createdUser.phone,
        specialization: createdTechnician.specialization,
        experienceYears: createdTechnician.experienceYears,
        skills: createdTechnician.skills,
        employmentType: createdTechnician.employmentType,
        address: createdTechnician.address,
        availabilityStatus:
          createdTechnician.availabilityStatus,
        isActive: createdTechnician.isActive,
        joiningDate: createdTechnician.joiningDate,
      },
      tempPassword,
    });
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }

    console.error("Add technician error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  } finally {
    session.endSession();
  }
};
export const getTechnicians = async (req, res) => {
  try {
    const businessId = req.user.businessId;

    const technicians = await Technician.find({
      businessId,
    })
      .populate("userId", "name email phone isActive")
      .sort({ createdAt: -1 });
    const result = technicians.map((tech) => ({
      _id: tech._id,
      userId: tech.userId?._id,
      user: tech.userId,
      name: tech.userId?.name,
      email: tech.userId?.email,
      phone: tech.userId?.phone,
      userIsActive: tech.userId?.isActive,
      specialization: tech.specialization,
      experienceYears: tech.experienceYears,
      skills: tech.skills,
      employmentType: tech.employmentType,
      profileImage: tech.profileImage,
      address: tech.address,
      joiningDate: tech.joiningDate,
      availabilityStatus: tech.availabilityStatus,
      isActive: tech.isActive,
      createdAt: tech.createdAt,
    }));

    return res.status(200).json({
      success: true,
      count: result.length,
      technicians: result,
    });
  } catch (error) {
    console.error("Get technicians error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const getTechnicianById = async (req, res) => {
  try {
    const { id } = req.params;
    const businessId = req.user.businessId;

    const tech = await Technician.findOne({
      _id: id,
      businessId,
    }).populate("userId", "name email phone isActive");

    if (!tech) {
      return res.status(404).json({
        success: false,
        message: "Technician not found",
      });
    }

    return res.status(200).json({
      success: true,
      technician: {
        _id: tech._id,
        userId: tech.userId?._id,
        name: tech.userId?.name,
        email: tech.userId?.email,
        phone: tech.userId?.phone,
        userIsActive: tech.userId?.isActive,
        specialization: tech.specialization,
        experienceYears: tech.experienceYears,
        skills: tech.skills,
        employmentType: tech.employmentType,
        profileImage: tech.profileImage,
        address: tech.address,
        joiningDate: tech.joiningDate,
        availabilityStatus: tech.availabilityStatus,
        isActive: tech.isActive,
      },
    });
  } catch (error) {
    console.error("Get technician error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const updateTechnician = async (req, res) => {
  try {
    const { id } = req.params;
    const businessId = req.user.businessId;

    const existing = await Technician.findOne({
      _id: id,
      businessId,
    });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Technician not found",
      });
    }

    const {
      specialization,
      experienceYears,
      skills,
      employmentType,
      address,
      availabilityStatus,
      isActive,
    } = req.body;

    const updateData = {};

    if (specialization !== undefined)
      updateData.specialization = specialization.trim();
    if (experienceYears !== undefined)
      updateData.experienceYears = experienceYears;
    if (employmentType !== undefined)
      updateData.employmentType = employmentType;
    if (address !== undefined)
      updateData.address = address;
    if (availabilityStatus !== undefined)
      updateData.availabilityStatus = availabilityStatus;
    if (isActive !== undefined)
      updateData.isActive = isActive;

    if (skills !== undefined) {
      updateData.skills =
        typeof skills === "string"
          ? skills
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : Array.isArray(skills)
          ? skills
          : [];
    }

    const updated = await Technician.findOneAndUpdate(
      { _id: id, businessId },
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate("userId", "name email phone isActive");
    if (isActive !== undefined) {
      await User.findByIdAndUpdate(existing.userId, {
        isActive,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Technician updated successfully",
      technician: {
        _id: updated._id,
        userId: updated.userId?._id,
        name: updated.userId?.name,
        email: updated.userId?.email,
        phone: updated.userId?.phone,
        userIsActive: isActive ?? updated.userId?.isActive,
        specialization: updated.specialization,
        experienceYears: updated.experienceYears,
        skills: updated.skills,
        employmentType: updated.employmentType,
        profileImage: updated.profileImage,
        address: updated.address,
        joiningDate: updated.joiningDate,
        availabilityStatus: updated.availabilityStatus,
        isActive: updated.isActive,
      },
    });
  } catch (error) {
    console.error("Update technician error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const deleteTechnician = async (req, res) => {
  try {
    const { id } = req.params;
    const businessId = req.user.businessId;

    const tech = await Technician.findOne({
      _id: id,
      businessId,
    });

    if (!tech) {
      return res.status(404).json({
        success: false,
        message: "Technician not found",
      });
    }
    await Technician.findByIdAndUpdate(id, {
      isActive: false,
    });

    await User.findByIdAndUpdate(tech.userId, {
      isActive: false,
    });

    return res.status(200).json({
      success: true,
      message: "Technician deactivated successfully",
    });
  } catch (error) {
    console.error("Delete technician error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateTechnicianStatus = async (req, res) => {
  try {
    const { status, availabilityStatus } = req.body;
    const newStatus = status || availabilityStatus;
    const validStatuses = ["AVAILABLE", "ONLINE", "BUSY", "ON_SITE", "OFFLINE"];

    if (!newStatus || !validStatuses.includes(newStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be one of: AVAILABLE, ONLINE, BUSY, ON_SITE, OFFLINE",
      });
    }

    let tech;
    if (req.user.role === "TECHNICIAN") {
      tech = await Technician.findOne({ userId: req.user.userId });
    } else {
      const techId = req.params.id || req.body.technicianId;
      if (!techId) {
        return res.status(400).json({
          success: false,
          message: "Technician ID is required",
        });
      }
      tech = await Technician.findOne({
        _id: techId,
        businessId: req.user.businessId,
      });
    }

    if (!tech) {
      return res.status(404).json({
        success: false,
        message: "Technician profile not found",
      });
    }

    tech.availabilityStatus = newStatus;
    await tech.save();

    const populatedTech = await Technician.findById(tech._id).populate(
      "userId",
      "name email phone isActive"
    );

    return res.status(200).json({
      success: true,
      message: `Status updated to ${newStatus}`,
      technician: {
        _id: populatedTech._id,
        userId: populatedTech.userId?._id,
        user: populatedTech.userId,
        name: populatedTech.userId?.name,
        email: populatedTech.userId?.email,
        phone: populatedTech.userId?.phone,
        specialization: populatedTech.specialization,
        availabilityStatus: populatedTech.availabilityStatus,
        experienceYears: populatedTech.experienceYears,
        skills: populatedTech.skills,
        employmentType: populatedTech.employmentType,
        address: populatedTech.address,
      },
      status: populatedTech.availabilityStatus,
    });
  } catch (error) {
    console.error("Update technician status error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

