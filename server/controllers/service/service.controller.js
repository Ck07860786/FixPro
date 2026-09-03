import Service from "../../models/serviceModel.js";

export const createService = async (req, res) => {
  try {
    const { name, description, category, price, estimatedDuration, images } =
      req.body;

    const businessId = req.user.businessId;

    if (!name || !category || price === undefined || !estimatedDuration) {
      return res.status(400).json({
        success: false,
        message: "Name, category, price and estimated duration are required",
      });
    }

    const existingService = await Service.findOne({
      businessId,
      name: name.trim(),
    });

    if (existingService) {
      return res.status(409).json({
        success: false,
        message: "This service already exists",
      });
    }

    const service = await Service.create({
      businessId,
      name: name.trim(),
      description,
      category: category.trim(),
      price,
      estimatedDuration,
      images,
    });

    return res.status(201).json({
      success: true,
      message: "Service created successfully",
      service,
    });
  } catch (error) {
    console.error("Create service error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//get all services of logged in business
export const getBusinessServices = async (req, res) => {
  try {
    const businessId = req.user.businessId;

    const services = await Service.find({
      businessId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    console.log("Error in getting services", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// get single service
export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const businessId = req.user.businessId;

    const service = await Service.findOne({
      _id: id,
      businessId,
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    return res.status(200).json({
      success: true,
      service,
    });
  } catch (error) {
    console.error("Get service error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//update service
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const businessId = req.user.businessId;

    const service = await Service.findOneAndUpdate(
      {
        _id: id,
        businessId,
      },
      {
        $set: req.body,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Service updated successfully",
      service,
    });
  } catch (error) {
    console.error("Update service error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// delete service

export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const businessId = req.user.businessId;

    const service = await Service.findOneAndDelete({
      _id: id,
      businessId,
    });

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Delete service error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
