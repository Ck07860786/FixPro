import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Check,
  X,
  Shield,
  Laptop,
  Smartphone,
  Bell,
  User,
  Sparkles,
  ChevronRight,
  Info,
  RefreshCw,
} from "lucide-react";
import { updatePassword } from "@/features/auth/authSlice";

export default function Setting() {
  const dispatch = useDispatch();
  const { user, technician } = useSelector((state) => state.auth);


  const [activeTab, setActiveTab] = useState("security");


  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);


  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [notifications, setNotifications] = useState({
    jobAlerts: true,
    statusUpdates: true,
    emergencyDispatch: true,
    emailDigest: false,
  });


  const requirements = [
    { label: "At least 8 characters", met: newPassword.length >= 8 },
    { label: "One uppercase letter (A-Z)", met: /[A-Z]/.test(newPassword) },
    { label: "One lowercase letter (a-z)", met: /[a-z]/.test(newPassword) },
    { label: "One numerical digit (0-9)", met: /[0-9]/.test(newPassword) },
    {
      label: "One special character (!@#$%^&*)",
      met: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
    },
  ];


  const metCount = requirements.filter((r) => r.met).length;
  const getStrengthMeta = () => {
    if (!newPassword) {
      return { score: 0, label: "Not entered", color: "bg-slate-200", textColor: "text-slate-400" };
    }
    if (metCount <= 2) {
      return { score: 1, label: "Weak", color: "bg-rose-500", textColor: "text-rose-600" };
    }
    if (metCount === 3) {
      return { score: 2, label: "Fair", color: "bg-amber-500", textColor: "text-amber-600" };
    }
    if (metCount === 4) {
      return { score: 3, label: "Good", color: "bg-blue-500", textColor: "text-blue-600" };
    }
    return { score: 4, label: "Strong", color: "bg-emerald-500", textColor: "text-emerald-600" };
  };

  const strength = getStrengthMeta();
  const passwordsMatch = confirmPassword.length > 0 && newPassword === confirmPassword;
  const passwordsMismatch = confirmPassword.length > 0 && newPassword !== confirmPassword;


  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback(null);


    if (!currentPassword.trim()) {
      setFeedback({
        type: "error",
        message: "Please enter your current password.",
      });
      return;
    }

    if (newPassword.length < 6) {
      setFeedback({
        type: "error",
        message: "New password must be at least 6 characters long.",
      });
      return;
    }

    if (currentPassword === newPassword) {
      setFeedback({
        type: "error",
        message: "New password must be different from your current password.",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setFeedback({
        type: "error",
        message: "The new password and confirmation password do not match.",
      });
      return;
    }

    setLoading(true);

    try {
      const resultAction = await dispatch(
        updatePassword({ currentPassword, newPassword })
      );

      if (updatePassword.fulfilled.match(resultAction)) {
        setFeedback({
          type: "success",
          message:
            "Your password has been changed successfully! Please use your new password next time you sign in.",
        });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setShowCurrent(false);
        setShowNew(false);
        setShowConfirm(false);
      } else {
        setFeedback({
          type: "error",
          message:
            resultAction.payload ||
            "Failed to change password. Please verify your current password and try again.",
        });
      }
    } catch (err) {
      setFeedback({
        type: "error",
        message: err.message || "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setFeedback(null);
    setShowCurrent(false);
    setShowNew(false);
    setShowConfirm(false);
  };

  return (
    <div className="min-h-full bg-slate-50/50 p-6 lg:p-8">

      <div className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Link to="/technician/dashboard" className="transition hover:text-blue-600">
                Technician Portal
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              <span className="text-slate-800">Settings</span>
            </div>
            <h1 className="mt-1.5 text-2xl font-bold tracking-tight text-slate-900">
              Account & Security Settings
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage your technician credentials, change your password, and protect your account.
            </p>
          </div>


          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-xs">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white shadow-xs">
              {user?.name?.charAt(0)?.toUpperCase() || "T"}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-900">{user?.name || "Technician"}</span>
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" title="Active"></span>
              </div>
              <p className="text-[11px] text-slate-500">{technician?.specialization || "Field Specialist"}</p>
            </div>
          </div>
        </div>


        <div className="mt-6 flex flex-wrap gap-2 border-b border-slate-200 pb-3">
          <button
            type="button"
            onClick={() => setActiveTab("security")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
              activeTab === "security"
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <KeyRound className="h-3.5 w-3.5" />
            Password & Security
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("notifications")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
              activeTab === "notifications"
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <Bell className="h-3.5 w-3.5" />
            Notification Preferences
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("sessions")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
              activeTab === "sessions"
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <Laptop className="h-3.5 w-3.5" />
            Active Sessions
          </button>
        </div>
      </div>


      {activeTab === "security" && (
        <div className="grid gap-6 lg:grid-cols-12">

          <div className="lg:col-span-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">

              <div className="flex items-start justify-between border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <KeyRound className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Change Account Password</h2>
                    <p className="text-xs text-slate-500">
                      Update your login password regularly to ensure your technician account remains protected.
                    </p>
                  </div>
                </div>

                <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 border border-emerald-200/60">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  256-Bit Encrypted
                </span>
              </div>


              {feedback && (
                <div
                  className={`mt-6 flex items-start gap-3 rounded-xl p-4 text-xs font-medium ${
                    feedback.type === "success"
                      ? "border border-emerald-200 bg-emerald-50 text-emerald-900"
                      : "border border-rose-200 bg-rose-50 text-rose-900"
                  }`}
                >
                  {feedback.type === "success" ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  ) : (
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
                  )}
                  <div className="flex-1">
                    <p className="font-semibold">
                      {feedback.type === "success" ? "Success!" : "Action Required"}
                    </p>
                    <p className="mt-0.5 text-slate-600">{feedback.message}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFeedback(null)}
                    className="text-slate-400 transition hover:text-slate-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}


              <form onSubmit={handleSubmit} className="mt-6 space-y-6">

                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Current Password <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[11px] text-slate-400">Required for verification</span>
                  </div>
                  <div className="relative mt-2">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                      <Lock className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type={showCurrent ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter your current password"
                      required
                      className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pr-11 pl-10 text-xs text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrent(!showCurrent)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 transition hover:text-slate-600"
                      tabIndex={-1}
                    >
                      {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <p className="mt-1.5 text-[11px] text-slate-400">
                    If you don't remember your current password, contact your company dispatcher or administrator.
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-5"></div>


                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      New Password <span className="text-rose-500">*</span>
                    </label>
                    {newPassword && (
                      <span className={`text-[11px] font-semibold ${strength.textColor}`}>
                        Strength: {strength.label}
                      </span>
                    )}
                  </div>
                  <div className="relative mt-2">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                      <KeyRound className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type={showNew ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter a strong new password"
                      required
                      className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pr-11 pl-10 text-xs text-slate-900 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 transition hover:text-slate-600"
                      tabIndex={-1}
                    >
                      {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>


                  {newPassword && (
                    <div className="mt-2.5">
                      <div className="grid grid-cols-4 gap-1.5">
                        {[1, 2, 3, 4].map((step) => (
                          <div
                            key={step}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              strength.score >= step ? strength.color : "bg-slate-200"
                            }`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  )}


                  <div className="mt-3.5 rounded-xl border border-slate-100 bg-slate-50/70 p-3.5">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      Password Requirements
                    </p>
                    <div className="mt-2 grid gap-2 sm:grid-cols-2">
                      {requirements.map((req, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          {req.met ? (
                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-500 transition-colors" />
                          ) : (
                            <div className="h-3.5 w-3.5 rounded-full border border-slate-300 transition-colors"></div>
                          )}
                          <span
                            className={`text-xs transition-colors ${
                              req.met ? "font-medium text-slate-800" : "text-slate-400"
                            }`}
                          >
                            {req.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>


                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Confirm New Password <span className="text-rose-500">*</span>
                    </label>
                    {passwordsMatch && (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                        <Check className="h-3 w-3" /> Passwords match
                      </span>
                    )}
                    {passwordsMismatch && (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-rose-500">
                        <X className="h-3 w-3" /> Passwords do not match
                      </span>
                    )}
                  </div>
                  <div className="relative mt-2">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                      <Lock className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter your new password"
                      required
                      className={`block w-full rounded-xl border bg-slate-50/50 py-2.5 pr-11 pl-10 text-xs text-slate-900 placeholder-slate-400 transition focus:bg-white focus:ring-2 focus:outline-none ${
                        passwordsMismatch
                          ? "border-rose-300 focus:border-rose-500 focus:ring-rose-100"
                          : passwordsMatch
                          ? "border-emerald-300 focus:border-emerald-500 focus:ring-emerald-100"
                          : "border-slate-200 focus:border-blue-500 focus:ring-blue-100"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 transition hover:text-slate-600"
                      tabIndex={-1}
                    >
                      {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>


                <div className="flex flex-wrap items-center justify-end gap-3 border-t border-slate-100 pt-5">
                  <button
                    type="button"
                    onClick={handleReset}
                    disabled={loading || (!currentPassword && !newPassword && !confirmPassword)}
                    className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Clear Form
                  </button>

                  <button
                    type="submit"
                    disabled={loading || !currentPassword || !newPassword || !confirmPassword || passwordsMismatch}
                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Updating Password...
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="h-4 w-4" />
                        Save New Password
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>


          <div className="space-y-6 lg:col-span-4">

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <Shield className="h-4 w-4" />
                </div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Technician Security Guidelines
                </h3>
              </div>

              <div className="mt-4 space-y-3.5 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600"></div>
                  <div>
                    <strong className="text-slate-900">Never share credentials:</strong> Do not share your login with other technicians or clients.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600"></div>
                  <div>
                    <strong className="text-slate-900">Sign out on shared tablets:</strong> Always log out if using workshop devices or shared dispatch terminals.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600"></div>
                  <div>
                    <strong className="text-slate-900">Unique password:</strong> Avoid reusing passwords from your personal email or social accounts.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600"></div>
                  <div>
                    <strong className="text-slate-900">Automatic Session Expiry:</strong> Sessions automatically refresh every 15 minutes for your protection.
                  </div>
                </div>
              </div>
            </div>


            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Account Status
                </h3>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                  Verified Active
                </span>
              </div>

              <div className="mt-4 space-y-3 text-xs">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Registered Email
                  </span>
                  <p className="font-medium text-slate-800">{user?.email || "technician@fixpro.com"}</p>
                </div>

                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Technician Role
                  </span>
                  <p className="font-medium text-slate-800">
                    {technician?.specialization ? `${technician.specialization} Technician` : "Field Technician"}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Password Protection
                  </span>
                  <p className="flex items-center gap-1.5 font-medium text-emerald-600">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Bcrypt Hash with Salt
                  </p>
                </div>
              </div>

              <div className="mt-5 border-t border-slate-100 pt-4">
                <Link
                  to="/technician/profile"
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                >
                  <User className="h-3.5 w-3.5" />
                  View Complete Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}


      {activeTab === "notifications" && (
        <div className="max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-base font-bold text-slate-900">Job & Dispatch Notifications</h2>
            <p className="text-xs text-slate-500">
              Customize how and when you receive notifications about assigned service tickets.
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {[
              {
                id: "jobAlerts",
                title: "New Job Assignments",
                desc: "Receive instant notifications when a manager assigns you a service request.",
              },
              {
                id: "statusUpdates",
                title: "Customer Status Inquiries",
                desc: "Alerts when a customer requests a time estimate or sends instructions.",
              },
              {
                id: "emergencyDispatch",
                title: "Priority / Emergency Tickets",
                desc: "High-priority sound and visual alerts for urgent repairs.",
              },
              {
                id: "emailDigest",
                title: "Weekly Performance Digest",
                desc: "Summary of completed jobs, customer ratings, and turnaround times.",
              },
            ].map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition hover:bg-slate-50"
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                  <p className="mt-0.5 text-[11px] text-slate-500">{item.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setNotifications((prev) => ({
                      ...prev,
                      [item.id]: !prev[item.id],
                    }))
                  }
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    notifications[item.id] ? "bg-blue-600" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                      notifications[item.id] ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}


      {activeTab === "sessions" && (
        <div className="max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-base font-bold text-slate-900">Current Login Sessions</h2>
            <p className="text-xs text-slate-500">
              Review active devices where your technician account is currently signed in.
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50/30 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <Laptop className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-slate-900">Windows PC — Web Browser</h4>
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                      Current Session
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">IP: 127.0.0.1 • Connected now</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                  <Smartphone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Technician Mobile Companion</h4>
                  <p className="text-[11px] text-slate-500">Last active: 2 hours ago • New Delhi, IN</p>
                </div>
              </div>
              <span className="text-xs font-medium text-slate-400">Idle</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
