export const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  specialization: "",
  experienceYears: "",
  skills: "",
  employmentType: "FULL_TIME",
  address: { street: "", city: "", state: "", pincode: "" },
};

export const EMPLOYMENT_TYPES = [
  { value: "FULL_TIME", label: "Full Time" },
  { value: "PART_TIME", label: "Part Time" },
  { value: "CONTRACT", label: "Contract" },
];

export const STATUS_FILTERS = ["All", "Active", "Inactive"];

export const AVAILABILITY_COLORS = {
  AVAILABLE: "bg-emerald-50 text-emerald-700 border-emerald-200",
  ONLINE: "bg-emerald-50 text-emerald-700 border-emerald-200",
  BUSY: "bg-amber-50 text-amber-700 border-amber-200",
  ON_SITE: "bg-blue-50 text-blue-700 border-blue-200",
  OFFLINE: "bg-slate-100 text-slate-500 border-slate-200",
};

export const AVAILABILITY_DOT = {
  AVAILABLE: "bg-emerald-500",
  ONLINE: "bg-emerald-500",
  BUSY: "bg-amber-500",
  ON_SITE: "bg-blue-500",
  OFFLINE: "bg-slate-400",
};
