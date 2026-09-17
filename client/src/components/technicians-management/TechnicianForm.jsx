import { useState } from "react";
import {
  X,
  Loader2,
  Wrench,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Clock,
  User,
  Star,
  ChevronDown,
} from "lucide-react";
import { EMPTY_FORM, EMPLOYMENT_TYPES } from "./technicianConstants";


export default function TechnicianForm({ initial, onSubmit, onCancel, isBusy }) {
  const isEdit = !!initial?._id;

  const [form, setForm] = useState(() => {
    if (initial) {
      return {
        name: initial.name || "",
        email: initial.email || "",
        phone: initial.phone || "",
        specialization: initial.specialization || "",
        experienceYears: initial.experienceYears?.toString() || "",
        skills: Array.isArray(initial.skills)
          ? initial.skills.join(", ")
          : initial.skills || "",
        employmentType: initial.employmentType || "FULL_TIME",
        address: {
          street: initial.address?.street || "",
          city: initial.address?.city || "",
          state: initial.address?.state || "",
          pincode: initial.address?.pincode || "",
        },
      };
    }
    return { ...EMPTY_FORM, address: { ...EMPTY_FORM.address } };
  });

  const set = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const setAddress = (field) => (e) =>
    setForm((prev) => ({
      ...prev,
      address: { ...prev.address, [field]: e.target.value },
    }));

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      specialization: form.specialization.trim(),
      experienceYears: Number(form.experienceYears) || 0,
      skills: form.skills,
      employmentType: form.employmentType,
      address: form.address,
    };

    if (!isEdit) {
      payload.name = form.name.trim();
      payload.email = form.email.trim();
      payload.phone = form.phone.trim();
    }

    onSubmit(payload);
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100";

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-900">
          {isEdit ? "Update Technician" : "Add New Technician"}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        {!isEdit && (
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 text-slate-400" />
                  Full Name *
                </span>
              </label>
              <input
                required
                type="text"
                value={form.name}
                onChange={set("name")}
                placeholder="e.g. Rajesh Kumar"
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  Email *
                </span>
              </label>
              <input
                required
                type="email"
                value={form.email}
                onChange={set("email")}
                placeholder="e.g. rajesh@email.com"
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-slate-400" />
                  Phone *
                </span>
              </label>
              <input
                required
                type="tel"
                value={form.phone}
                onChange={set("phone")}
                placeholder="e.g. 9876543210"
                className={inputClass}
              />
            </div>
          </div>
        )}


        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Wrench className="h-3.5 w-3.5 text-slate-400" />
                Specialization *
              </span>
            </label>
            <input
              required
              type="text"
              value={form.specialization}
              onChange={set("specialization")}
              placeholder="e.g. HVAC, Plumbing, Electrical"
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                Experience (years)
              </span>
            </label>
            <input
              type="number"
              min="0"
              value={form.experienceYears}
              onChange={set("experienceYears")}
              placeholder="e.g. 5"
              className={inputClass}
            />
          </div>
        </div>


        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 text-slate-400" />
                Skills (comma-separated)
              </span>
            </label>
            <input
              type="text"
              value={form.skills}
              onChange={set("skills")}
              placeholder="e.g. AC Repair, Installation, Maintenance"
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-700">
              <span className="flex items-center gap-1.5">
                <Briefcase className="h-3.5 w-3.5 text-slate-400" />
                Employment Type
              </span>
            </label>
            <div className="relative">
              <select
                value={form.employmentType}
                onChange={set("employmentType")}
                className={`${inputClass} appearance-none pr-9`}
              >
                {EMPLOYMENT_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-700">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-slate-400" />
              Address
            </span>
          </label>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <input
              type="text"
              value={form.address.street}
              onChange={setAddress("street")}
              placeholder="Street"
              className={inputClass}
            />
            <input
              type="text"
              value={form.address.city}
              onChange={setAddress("city")}
              placeholder="City"
              className={inputClass}
            />
            <input
              type="text"
              value={form.address.state}
              onChange={setAddress("state")}
              placeholder="State"
              className={inputClass}
            />
            <input
              type="text"
              value={form.address.pincode}
              onChange={setAddress("pincode")}
              placeholder="Pincode"
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={isBusy}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-60"
          >
            {isBusy && <Loader2 className="h-4 w-4 animate-spin" />}
            {isEdit ? "Update Technician" : "Add Technician"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
