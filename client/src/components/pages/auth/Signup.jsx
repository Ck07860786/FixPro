import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Building2,
  UserRound,
  ShieldCheck,
  Info,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { customerSignup, clearAuthError } from "../../../features/auth/authSlice";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const [accountType, setAccountType] = useState("owner");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
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

  const handleAccountTypeChange = (type) => {
    setAccountType(type);

    setForm({
      name: "",
      email: "",
      phone: "",
      password: "",
    });

    dispatch(clearAuthError());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (accountType === "owner") {
      navigate("/business-signup", {
        state: {
          accountDetails: form,
        },
      });

      return;
    }

    try {
      await dispatch(customerSignup(form)).unwrap();

      navigate("/login", {
        state: {
          message: "Account created successfully. Please login.",
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex w-full flex-col px-8 py-8 lg:w-1/2 lg:px-16">
    
        <Link to="/" className="mb-10 flex items-center gap-2">
           <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-slate-900 to-blue-600 text-[10px] font-bold text-white shadow-md shadow-blue-500/20">
          ✦
        </span>
          <span className="text-lg font-bold text-blue-600">FixPro</span>
        </Link>

        <h1 className="text-[2rem] font-bold tracking-[-0.03em] text-slate-900">
          Join FixPro
        </h1>
        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
          Set up your account to streamline your field operations or book a
          service.
        </p>

        <div className="mt-8">
          <p className="mb-3 text-sm font-medium text-slate-700">
            I am signing up as a...
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => handleAccountTypeChange("owner")}
              className={`flex-1 rounded-xl border-2 p-4 text-left transition ${
                accountType === "owner"
                  ? "border-blue-500 bg-blue-50/40"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <Building2
                className={`mb-3 h-6 w-6 ${
                  accountType === "owner" ? "text-blue-600" : "text-slate-400"
                }`}
              />
              <div className="text-sm font-semibold text-slate-900">
                Business Owner
              </div>
              <div className="mt-0.5 text-xs text-slate-500">
                Manage team & jobs
              </div>
            </button>
            <button
              type="button"
              onClick={() => handleAccountTypeChange("customer")}
              className={`flex-1 rounded-xl border-2 p-4 text-left transition ${
                accountType === "customer"
                  ? "border-blue-500 bg-blue-50/40"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <UserRound
                className={`mb-3 h-6 w-6 ${
                  accountType === "customer"
                    ? "text-blue-600"
                    : "text-slate-400"
                }`}
              />
              <div className="text-sm font-semibold text-slate-900">
                Customer
              </div>
              <div className="mt-0.5 text-xs text-slate-500">Book services</div>
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-800">
              Full Name
            </label>
            <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2.5 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
              <User className="h-4 w-4 shrink-0 text-slate-400" />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Jane Doe"
                className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-800">
              Work Email
            </label>
            <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2.5 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
              <Mail className="h-4 w-4 shrink-0 text-slate-400" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="jane@company.com"
                className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-800">
              Phone
            </label>
            <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2.5 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder="Enter phone number"
                className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-800">
              Password
            </label>
            <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2.5 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20">
              <Lock className="h-4 w-4 shrink-0 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="shrink-0 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <p className="mt-1.5 flex items-center gap-1 text-xs text-slate-400">
              <Info className="h-3 w-3" />
              Must be at least 8 characters.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading
              ? "Creating account..."
              : accountType === "owner"
                ? "Continue"
                : "Create Account"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-2 hover:text-blue-600"
          >
            Sign in
          </Link>
        </p>
      </div>

      <div className="relative hidden w-1/2 lg:block">
        <img
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&h=1600&fit=crop&q=80"
          alt="Professional woman"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/60" />

        <div className="relative z-10 flex h-full items-end p-10 pb-16">
          <div className="max-w-md rounded-2xl bg-slate-800/80 p-8 backdrop-blur-sm">
            <div className="mb-4 text-3xl font-bold leading-none text-emerald-400">
              99
            </div>
            <blockquote className="text-[1.05rem] font-medium leading-7 text-white">
              "Switching to FixPro was the best operational decision we made
              this year. We've eliminated paperwork, streamlined our
              dispatching, and improved customer satisfaction across the board."
            </blockquote>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-10 w-10 overflow-hidden rounded-full bg-slate-600">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&q=80"
                  alt="Michael Chen"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">
                  Michael Chen
                </div>
                <div className="text-xs text-slate-400">
                  Director of Operations, Apex Climate Control
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
