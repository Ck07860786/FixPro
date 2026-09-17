import { Calendar, UserPlus, Plus, CheckCircle2, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardHeader({ business }) {
  const isApproved = business?.approvalStatus === "APPROVED";

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            {business?.name ? `${business.name} Overview` : "Dashboard Overview"}
          </h1>
          {business?.approvalStatus && (
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                isApproved
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-amber-50 text-amber-700 border border-amber-200"
              }`}
            >
              {isApproved ? (
                <CheckCircle2 className="h-3 w-3 text-emerald-600" />
              ) : (
                <Clock className="h-3 w-3 text-amber-600" />
              )}
              {business.approvalStatus}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-slate-500">
          Real-time operations, technician roster, and service catalog metrics.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="hidden items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-500 shadow-sm md:flex">
          <Calendar className="h-3.5 w-3.5 text-slate-400" />
          {formattedDate}
        </div>

        <Link
          to="/business/technicians"
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <UserPlus className="h-3.5 w-3.5 text-slate-500" />
          Add Technician
        </Link>

        <Link
          to="/business/services"
          className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <Plus className="h-3.5 w-3.5" />
          List Service
        </Link>
      </div>
    </div>
  );
}
