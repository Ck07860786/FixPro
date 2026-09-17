import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Service from "../../models/serviceModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getImagePaths = (files) => {
  if (!files || files.length === 0) return [];
  return files.map((f) => `/uploads/services/${f.filename}`);
};
const deleteImageFile = (urlPath) => {
  try {
    const filePath = path.join(__dirname, "..", "..", urlPath);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  } catch {
    
  }
};
export const createService = async (req, res) => {
  try {
    const { name, description, category, price, estimatedDuration, isActive } =
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
    const images = getImagePaths(req.files);

    const service = await Service.create({
      businessId,
      name: name.trim(),
      description,
      category: category.trim(),
      price,
      estimatedDuration,
      images,
      isActive: isActive === "false" ? false : true,
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
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const businessId = req.user.businessId;

    const existing = await Service.findOne({ _id: id, businessId });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }
    let keepImages = [];
    if (req.body.existingImages) {
      try {
        keepImages =
          typeof req.body.existingImages === "string"
            ? JSON.parse(req.body.existingImages)
            : Array.isArray(req.body.existingImages)
            ? req.body.existingImages
            : [req.body.existingImages];
      } catch {
        keepImages = [];
      }
    }

    const newImages = getImagePaths(req.files);
    const finalImages = [...keepImages, ...newImages];
    const removedImages = (existing.images || []).filter(
      (img) => !keepImages.includes(img)
    );
    removedImages.forEach(deleteImageFile);
    const { existingImages, images, isActive, ...rest } = req.body;

    const updateData = {
      ...rest,
      images: finalImages,
    };
    if (isActive !== undefined) {
      updateData.isActive = isActive === "false" ? false : true;
    }

    const service = await Service.findOneAndUpdate(
      { _id: id, businessId },
      { $set: updateData },
      { new: true, runValidators: true }
    );

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
    (service.images || []).forEach(deleteImageFile);

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
