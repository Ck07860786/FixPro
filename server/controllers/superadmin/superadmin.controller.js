import User from "../../models/userModel.js";
import Business from "../../models/businessModel.js";
import Technician from "../../models/technicianModel.js";
import Service from "../../models/serviceModel.js";
import ServiceRequest from "../../models/serviceRequest.js";

export const getDashboardStats = async (req, res) => {
  try {
    // Run all aggregation queries in parallel for performance
    const [
      totalUsers,
      usersByRole,
      totalBusinesses,
      businessesByStatus,
      totalTechnicians,
      techniciansByStatus,
      totalServices,
      activeServices,
      totalServiceRequests,
      serviceRequestsByStatus,
      revenueAgg,
      recentBusinesses,
      recentUsers,
      recentServiceRequests,
    ] = await Promise.all([
      // Total users
      User.countDocuments(),

      // Users grouped by role
      User.aggregate([
        { $group: { _id: "$role", count: { $sum: 1 } } },
      ]),

      // Total businesses
      Business.countDocuments(),

      // Businesses grouped by status
      Business.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),

      // Total technicians
      Technician.countDocuments(),

      // Technicians by availability status
      Technician.aggregate([
        {
          $group: {
            _id: "$availabilityStatus",
            count: { $sum: 1 },
            active: { $sum: { $cond: ["$isActive", 1, 0] } },
          },
        },
      ]),

      // Total services
      Service.countDocuments(),

      // Active services
      Service.countDocuments({ isActive: true }),

      // Total service requests
      ServiceRequest.countDocuments(),

      // Service requests by status
      ServiceRequest.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),

      // Total revenue (sum of totalAmount from completed service requests)
      ServiceRequest.aggregate([
        { $match: { status: "COMPLETED" } },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ]),

      // Recent businesses (last 10)
      Business.find()
        .sort({ createdAt: -1 })
        .limit(10)
        .populate("ownerId", "name email phone")
        .lean(),

      // Recent users (last 10)
      User.find()
        .sort({ createdAt: -1 })
        .limit(10)
        .select("name email phone role isActive createdAt")
        .lean(),

      // Recent service requests (last 10)
      ServiceRequest.find()
        .sort({ createdAt: -1 })
        .limit(10)
        .populate("customerId", "name email")
        .populate("serviceId", "name price")
        .populate("businessId", "name")
        .lean(),
    ]);

    // Transform aggregation results into objects
    const roleMap = {};
    usersByRole.forEach((r) => {
      roleMap[r._id] = r.count;
    });

    const businessStatusMap = {};
    businessesByStatus.forEach((b) => {
      businessStatusMap[b._id] = b.count;
    });

    const techStatusMap = {};
    let activeTechnicians = 0;
    techniciansByStatus.forEach((t) => {
      techStatusMap[t._id] = t.count;
      activeTechnicians += t.active;
    });

    const requestStatusMap = {};
    serviceRequestsByStatus.forEach((sr) => {
      requestStatusMap[sr._id] = sr.count;
    });

    const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;

    return res.status(200).json({
      success: true,
      stats: {
        users: {
          total: totalUsers,
          customers: roleMap["CUSTOMER"] || 0,
          admins: roleMap["ADMIN"] || 0,
          technicians: roleMap["TECHNICIAN"] || 0,
          superAdmins: roleMap["SUPER_ADMIN"] || 0,
        },
        businesses: {
          total: totalBusinesses,
          pending: businessStatusMap["PENDING"] || 0,
          active: businessStatusMap["ACTIVE"] || 0,
          rejected: businessStatusMap["REJECTED"] || 0,
          suspended: businessStatusMap["SUSPENDED"] || 0,
        },
        technicians: {
          total: totalTechnicians,
          active: activeTechnicians,
          byStatus: techStatusMap,
        },
        services: {
          total: totalServices,
          active: activeServices,
          inactive: totalServices - activeServices,
        },
        serviceRequests: {
          total: totalServiceRequests,
          pending: requestStatusMap["PENDING"] || 0,
          confirmed: requestStatusMap["CONFIRMED"] || 0,
          inProgress: requestStatusMap["IN_PROGRESS"] || 0,
          completed: requestStatusMap["COMPLETED"] || 0,
          cancelled: requestStatusMap["CANCELLED"] || 0,
          onHold: requestStatusMap["ON_HOLD"] || 0,
        },
        revenue: {
          total: totalRevenue,
        },
      },
      recentBusinesses,
      recentUsers,
      recentServiceRequests,
    });
  } catch (error) {
    console.error("SuperAdmin dashboard stats error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats",
    });
  }
};

export const updateBusinessStatus = async (req, res) => {
  try {
    const { businessId } = req.params;
    const { status, rejectionReason } = req.body;

    if (!["ACTIVE", "REJECTED", "SUSPENDED", "PENDING"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const updateData = { status };

    if (status === "ACTIVE") {
      updateData.approvedAt = new Date();
      updateData.approvedBy = req.user.userId;
    }

    if (status === "REJECTED" && rejectionReason) {
      updateData.rejectionReason = rejectionReason;
    }

    const business = await Business.findByIdAndUpdate(businessId, updateData, {
      new: true,
    }).populate("ownerId", "name email phone");

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "Business not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Business status updated to ${status}`,
      business,
    });
  } catch (error) {
    console.error("Update business status error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update business status",
    });
  }
};

export const getAllBusinesses = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const filter = {};
    if (status) filter.status = status;

    const businesses = await Business.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate("ownerId", "name email phone")
      .lean();

    const total = await Business.countDocuments(filter);

    return res.status(200).json({
      success: true,
      businesses,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get all businesses error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch businesses",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { role, page = 1, limit = 20 } = req.query;

    const filter = {};
    if (role) filter.role = role;

    const users = await User.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .select("name email phone role isActive createdAt")
      .lean();

    const total = await User.countDocuments(filter);

    return res.status(200).json({
      success: true,
      users,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get all users error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
};
