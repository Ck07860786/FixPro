import mongoose from "mongoose";
import { comparePassword, hashPassword } from "../../helper/authHelper.js";
import User from "../../models/userModel.js"
import Business from "../../models/businessModel.js";
import Technician from "../../models/technicianModel.js";
import jwt from "jsonwebtoken"


export const registerUser = async (req, res) => {
  
  try {
     console.log("REQUEST BODY:", req.body);
    console.log("CONTENT TYPE:", req.headers["content-type"]);
    const { name, email, phone, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const alreadyExist = await User.findOne({ email: normalizedEmail });
    if (alreadyExist) {
      return res.status(409).json({
        success: false,
        message: "User already exist with this email",
      });
    }

    const encryptPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email: normalizedEmail,
      password: encryptPassword,
      phone,
      role: "CUSTOMER",
    });

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user: {
        nid: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};


export const registerBusiness = async (req, res) => {
    const session = await mongoose.startSession();
  try {
    const {
      name,
      email,
      phone,
      password,
      businessName,
      businessType,
      address,
      logo,
    } = req.body;

    if (!name || !email || !password || !businessName) {
      return res.status(400).json({
        success: false,
        message: "Name, email, password and business name are required",
      });
    }
    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }
    const existingBusiness = await Business.findOne({
      email: normalizedEmail,
    });

    if (existingBusiness) {
      return res.status(409).json({
        success: false,
        message: "A business already exists with this email",
      });
    }

    const hashedPassword = await hashPassword(password);

    session.startTransaction();
    const user = await User.create(
      [
        {
          name: name.trim(),
          email: normalizedEmail,
          phone,
          password: hashedPassword,
          role: "ADMIN",
        },
      ],
      { session },
    );

    const createdUser = user[0];
    const business = await Business.create(
      [
        {
          name: businessName.trim(),
          ownerId: createdUser._id,
          email: normalizedEmail,
          phone,
          businessType,
          logo,
          address,
          status: "PENDING",
        },
      ],
      { session },
    );

    const createdBusiness = business[0];
    await session.commitTransaction();

    return res.status(201).json({
      success: true,
      message:
        "Business registration submitted successfully. Your account is pending approval.",
      user: {
        id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        role: createdUser.role,
      },
      business: {
        id: createdBusiness._id,
        name: createdBusiness.name,
        status: createdBusiness.status,
      },
    });
  } catch (error) {
    if (session.inTransaction()) {
  await session.abortTransaction();
}

    console.error("Register business error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  } finally {
    session.endSession();
  }
};


export const loginUser = async(req,res)=>{
  try {
    const{email, password}= req.body;
    if(!email || !password){
       return res.status(400).json({
        success: false,
        message: "email and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    }).select("+password");

     if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordMatch = await comparePassword(
      password,
      user.password
    );

     if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

     if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account is inactive",
      });
    }

      let business = null;
      let technicianProfile = null;

       if (user.role === "ADMIN") {
      business = await Business.findOne({
        ownerId: user._id,
      });
    

     if (!business) {
        return res.status(404).json({
          success: false,
          message: "Business not found",
        });
      }

       if (business.status === "PENDING") {
        return res.status(403).json({
          success: false,
          message: "Your business is still under review",
        });
      }

      if (business.status === "REJECTED") {
        return res.status(403).json({
          success: false,
          message: "Your business registration was rejected",
          reason: business.rejectionReason,
        });
      }

      if (business.status === "SUSPENDED") {
        return res.status(403).json({
          success: false,
          message: "Your business account has been suspended",
        });
      }
    }    if (user.role === "TECHNICIAN") {
      technicianProfile = await Technician.findOne({
        userId: user._id,
      });

      if (!technicianProfile) {
        return res.status(404).json({
          success: false,
          message: "Technician profile not found",
        });
      }

      if (!technicianProfile.isActive) {
        return res.status(403).json({
          success: false,
          message: "Your technician account has been deactivated",
        });
      }      business = await Business.findById(
        technicianProfile.businessId
      );
    }

       const payload = {
      userId: user._id,
      role: user.role,
      businessId: business?._id || null,
    };

    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );
    
     return res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },

       business: business
        ? {
            id: business._id,
            name: business.name,
            status: business.status,
          }
        : null,

      technician: technicianProfile
        ? {
            id: technicianProfile._id,
            specialization: technicianProfile.specialization,
            availabilityStatus: technicianProfile.availabilityStatus,
            experienceYears: technicianProfile.experienceYears,
            skills: technicianProfile.skills,
            employmentType: technicianProfile.employmentType,
            address: technicianProfile.address,
            joiningDate: technicianProfile.joiningDate,
          }
        : null,
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters",
      });
    }

    const user = await User.findById(req.user.userId).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await comparePassword(currentPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const hashedNewPassword = await hashPassword(newPassword);
    user.password = hashedNewPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change password error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};