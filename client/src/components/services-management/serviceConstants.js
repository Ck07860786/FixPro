export const EMPTY_FORM = {
  name: "",
  description: "",
  category: "",
  price: "",
  estimatedDuration: "",
  newFiles: [],
  existingImages: [],
  isActive: true,
};

export const FORM_CATEGORIES = [
  "HVAC",
  "Plumbing",
  "Electrical",
  "Appliance",
  "Cleaning",
  "Carpentry",
  "Painting",
  "Other",
];

export const FILTER_CATEGORIES = ["All", ...FORM_CATEGORIES];

export const API_BASE = (import.meta.env.VITE_BACKEND_URL || "http://localhost:8000").replace(/\/+$/, "");
