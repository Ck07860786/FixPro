import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Building2,
  MapPin,
  Phone,
  Image,
  ShieldCheck,
  ArrowRight,
  Check,
} from "lucide-react";

import { businessSignup, clearAuthError } from "../../../features/auth/authSlice";

const steps = [
  { label: "Business Details", desc: "Company information" },
  { label: "Address", desc: "Business location" },
  { label: "Finish Setup", desc: "Review & submit" },
];

export default function BusinessSignup() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const accountDetails = location.state?.accountDetails || {};

  const [currentStep, setCurrentStep] = useState(0);

  const [form, setForm] = useState({
    businessName: "",
    businessType: "",
    phone: accountDetails.phone || "",
    address: {
      street: "",
      city: "",
      state: "",
      pincode: "",
      logo: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      dispatch(clearAuthError());
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));

    if (error) {
      dispatch(clearAuthError());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: accountDetails.name,
      email: accountDetails.email,
      password: accountDetails.password,

      businessName: form.businessName,
      businessType: form.businessType,
      phone: form.phone,

      address: form.address,
      logo: form.logo,
    };

    try {
      await dispatch(businessSignup(payload)).unwrap();

      navigate("/pending-approval");
    } catch (error) {
      console.error(error);
    }
  };

  const canProceed = () => {
    if (currentStep === 0) {
      return form.businessName && form.businessType && form.phone;
    }
    if (currentStep === 1) {
      return (
        form.address.street &&
        form.address.city &&
        form.address.state &&
        form.address.pincode
      );
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-blue-50/60 px-4 py-10">
      <div className="flex w-full max-w-[920px] overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-200/60">
        <div className="hidden w-[280px] shrink-0 flex-col bg-blue-50 p-8 md:flex">
          <div className="mb-8 flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-slate-900 to-blue-600 text-[10px] font-bold text-white shadow-md shadow-blue-500/20">
          ✦
        </span>
            <span className="text-lg font-bold text-slate-900">FixPro</span>
          </div>

          <h2 className="text-lg font-bold text-slate-900">
            Setup your workspace
          </h2>
          <p className="mt-2 text-[0.82rem] leading-relaxed text-slate-500">
            Follow these steps to get your business ready for operations.
          </p>

          <div className="mt-8 flex flex-col gap-0">
            {steps.map((step, i) => {
              const isActive = i === currentStep;
              const isCompleted = i < currentStep;

              return (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                        isCompleted
                          ? "bg-blue-600 text-white"
                          : isActive
                            ? "border-2 border-blue-600 bg-white text-blue-600"
                            : "border-2 border-slate-300 bg-white text-slate-400"
                      }`}
                    >
                      {isCompleted ? <Check className="h-4 w-4" /> : i + 1}
                    </div>
                    {i < steps.length - 1 && (
                      <div
                        className={`my-1 w-0.5 flex-1 min-h-[32px] ${
                          isCompleted ? "bg-blue-600" : "bg-slate-200"
                        }`}
                      />
                    )}
                  </div>

                  <div className="pb-8">
                    <p
                      className={`text-sm font-semibold ${
                        isActive
                          ? "text-blue-600"
                          : isCompleted
                            ? "text-slate-900"
                            : "text-slate-500"
                      }`}
                    >
                      {step.label}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-auto overflow-hidden rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=250&fit=crop&q=80"
              alt="Technician"
              className="h-[140px] w-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-8 md:p-10">
          <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
            <div className="flex-1">
              {currentStep === 0 && (
                <>
                  <h1 className="text-[1.8rem] font-bold tracking-[-0.03em] text-slate-900">
                    Business Details
                  </h1>
                  <p className="mt-2 text-sm text-slate-500">
                    Tell us about your company and services.
                  </p>

                  {error && (
                    <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                      {error}
                    </div>
                  )}

                  <div className="mt-8 space-y-5">
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-slate-800">
                        Business Name
                      </label>
                      <div className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-2.5 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
                        <Building2 className="h-4 w-4 shrink-0 text-slate-400" />
                        <input
                          type="text"
                          name="businessName"
                          value={form.businessName}
                          onChange={handleChange}
                          placeholder="e.g. CoolCare Services"
                          required
                          className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-slate-800">
                        Business Type
                      </label>
                      <select
                        name="businessType"
                        value={form.businessType}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      >
                        <option value="">Select business type</option>
                        <option value="AC_REPAIR">AC Repair</option>
                        <option value="APPLIANCE_REPAIR">
                          Appliance Repair
                        </option>
                        <option value="PLUMBING">Plumbing</option>
                        <option value="ELECTRICAL">Electrical</option>
                        <option value="CCTV">CCTV</option>
                        <option value="SOLAR">Solar</option>
                        <option value="OTHER">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-slate-800">
                        Business Phone
                      </label>
                      <div className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-2.5 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
                        <Phone className="h-4 w-4 shrink-0 text-slate-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          required
                          placeholder="Enter business phone"
                          className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-slate-800">
                        Business Logo
                      </label>
                      <div className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-2.5 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
                        <Image className="h-4 w-4 shrink-0 text-slate-400" />
                        <input
                          type="file"
                          name="logo"
                          value={form.logo}
                          onChange={handleChange}
                          className="w-full bg-transparent text-sm text-slate-800 outline-none file:mr-3 file:rounded-md file:border-0 file:bg-blue-50 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-blue-600"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {currentStep === 1 && (
                <>
                  <h1 className="text-[1.8rem] font-bold tracking-[-0.03em] text-slate-900">
                    Business Address
                  </h1>
                  <p className="mt-2 text-sm text-slate-500">
                    Enter your primary business location.
                  </p>

                  {error && (
                    <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                      {error}
                    </div>
                  )}

                  <div className="mt-8 space-y-5">
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-slate-800">
                        Street Address
                      </label>
                      <div className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-2.5 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
                        <MapPin className="h-4 w-4 shrink-0 text-slate-400" />
                        <input
                          type="text"
                          name="street"
                          value={form.address.street}
                          onChange={handleAddressChange}
                          placeholder="123 Main St"
                          required
                          className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-semibold text-slate-800">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={form.address.city}
                          onChange={handleAddressChange}
                          placeholder="City"
                          required
                          className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-semibold text-slate-800">
                          State
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={form.address.state}
                          onChange={handleAddressChange}
                          placeholder="State"
                          required
                          className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-slate-800">
                        Pincode
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={form.address.pincode}
                        onChange={handleAddressChange}
                        placeholder="Pincode"
                        required
                        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      />
                    </div>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <h1 className="text-[1.8rem] font-bold tracking-[-0.03em] text-slate-900">
                    Finish Setup
                  </h1>
                  <p className="mt-2 text-sm text-slate-500">
                    Review your details and submit for approval.
                  </p>

                  {error && (
                    <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                      {error}
                    </div>
                  )}

                  <div className="mt-8 space-y-4">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                      <h3 className="mb-3 text-sm font-semibold text-slate-800">
                        Account
                      </h3>
                      <div className="space-y-1.5 text-sm text-slate-600">
                        <p>
                          <span className="text-slate-400">Name:</span>{" "}
                          {accountDetails.name}
                        </p>
                        <p>
                          <span className="text-slate-400">Email:</span>{" "}
                          {accountDetails.email}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                      <h3 className="mb-3 text-sm font-semibold text-slate-800">
                        Business
                      </h3>
                      <div className="space-y-1.5 text-sm text-slate-600">
                        <p>
                          <span className="text-slate-400">Name:</span>{" "}
                          {form.businessName}
                        </p>
                        <p>
                          <span className="text-slate-400">Type:</span>{" "}
                          {form.businessType}
                        </p>
                        <p>
                          <span className="text-slate-400">Phone:</span>{" "}
                          {form.phone}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                      <h3 className="mb-3 text-sm font-semibold text-slate-800">
                        Address
                      </h3>
                      <p className="text-sm text-slate-600">
                        {form.address.street}, {form.address.city},{" "}
                        {form.address.state} - {form.address.pincode}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="mt-10 flex items-center justify-between border-t border-slate-200 pt-6">
              {currentStep > 0 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  ← Back
                </button>
              ) : (
                <div />
              )}

              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-40"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit for Approval"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </form>

          <div className="mt-6 flex justify-center gap-2 md:hidden">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-2 w-2 rounded-full transition ${
                  i === currentStep
                    ? "bg-blue-600"
                    : i < currentStep
                      ? "bg-blue-300"
                      : "bg-slate-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
