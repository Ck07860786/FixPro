import { useState } from "react";
import { useDispatch } from "react-redux";
import { Calendar, Briefcase, Check, Loader2, Signal } from "lucide-react";
import { updateTechnicianAvailability } from "@/features/auth/authSlice";
import {
  AVAILABILITY_COLORS,
  AVAILABILITY_DOT,
} from "@/components/technicians-management/technicianConstants";

const STATUS_OPTIONS = [
  {
    key: "AVAILABLE",
    label: "Online",
    sublabel: "Ready for jobs",
    dotClass: "bg-emerald-500",
    activeClass: "bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-600/20",
    inactiveClass: "bg-white text-slate-700 hover:bg-emerald-50 border-slate-200",
  },
  {
    key: "BUSY",
    label: "Busy",
    sublabel: "Working on task",
    dotClass: "bg-amber-500",
    activeClass: "bg-amber-500 text-white shadow-sm ring-2 ring-amber-500/20",
    inactiveClass: "bg-white text-slate-700 hover:bg-amber-50 border-slate-200",
  },
  {
    key: "ON_SITE",
    label: "On Site",
    sublabel: "At customer location",
    dotClass: "bg-blue-500",
    activeClass: "bg-blue-600 text-white shadow-sm ring-2 ring-blue-600/20",
    inactiveClass: "bg-white text-slate-700 hover:bg-blue-50 border-slate-200",
  },
  {
    key: "OFFLINE",
    label: "Offline",
    sublabel: "Off duty",
    dotClass: "bg-slate-400",
    activeClass: "bg-slate-700 text-white shadow-sm ring-2 ring-slate-700/20",
    inactiveClass: "bg-white text-slate-700 hover:bg-slate-100 border-slate-200",
  },
];

export default function TechnicianHeader({ user, business, technician }) {
  const dispatch = useDispatch();
  const [updating, setUpdating] = useState(false);
  const [feedback, setFeedback] = useState("");

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const rawAvailability = technician?.availabilityStatus || "AVAILABLE";
  const currentStatus = rawAvailability === "ONLINE" ? "AVAILABLE" : rawAvailability;

  const handleStatusChange = async (newStatus) => {
    if (newStatus === currentStatus || updating) return;
    setUpdating(true);
    try {
      await dispatch(updateTechnicianAvailability(newStatus)).unwrap();
      const opt = STATUS_OPTIONS.find((s) => s.key === newStatus);
      setFeedback(`Status changed to ${opt?.label || newStatus}`);
      setTimeout(() => setFeedback(""), 3000);
    } catch (err) {
      setFeedback("Failed to update status");
      setTimeout(() => setFeedback(""), 3000);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
              Welcome back, {user?.name || "Technician"}! 👋
            </h1>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                AVAILABILITY_COLORS[currentStatus] || AVAILABILITY_COLORS.AVAILABLE
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  AVAILABILITY_DOT[currentStatus] || AVAILABILITY_DOT.AVAILABLE
                } ${currentStatus === "AVAILABLE" ? "animate-pulse" : ""}`}
              />
              {currentStatus === "AVAILABLE" ? "Online / Available" : currentStatus.replace("_", " ")}
            </span>
          </div>
          <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <Briefcase className="h-3.5 w-3.5 text-slate-400" />
              Assigned Business:{" "}
              <strong className="font-semibold text-slate-700">
                {business?.name || "FixPro Network"}
              </strong>
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-500 shadow-sm">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            {formattedDate}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Signal className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Live Availability Status
              </p>
              <p className="text-xs text-slate-500">
                Set your operational state so dispatchers know when to assign you jobs
              </p>
            </div>
          </div>

          {feedback && (
            <span className="text-xs font-semibold text-emerald-600 animate-fade-in">
              {feedback}
            </span>
          )}
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {STATUS_OPTIONS.map((opt) => {
            const isSelected = currentStatus === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => handleStatusChange(opt.key)}
                disabled={updating}
                className={`relative flex items-center justify-between gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-semibold transition-all ${
                  isSelected ? opt.activeClass : opt.inactiveClass
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${opt.dotClass} ${
                      isSelected && opt.key === "AVAILABLE" ? "animate-ping" : ""
                    }`}
                  />
                  <div className="text-left">
                    <p className="font-bold leading-tight">{opt.label}</p>
                    <p
                      className={`text-[10px] leading-tight ${
                        isSelected ? "text-white/80" : "text-slate-400"
                      }`}
                    >
                      {opt.sublabel}
                    </p>
                  </div>
                </div>

                {isSelected && (
                  updating ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-white" />
                  ) : (
                    <Check className="h-3.5 w-3.5 text-white" />
                  )
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
