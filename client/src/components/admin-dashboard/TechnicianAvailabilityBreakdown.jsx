import { Link } from "react-router-dom";
import { ArrowUpRight, Users } from "lucide-react";

export default function TechnicianAvailabilityBreakdown({ technicians = [] }) {
  const total = technicians.length;
  const available = technicians.filter(
    (t) => t.isActive && t.availabilityStatus === "AVAILABLE"
  ).length;
  const busy = technicians.filter(
    (t) => t.isActive && t.availabilityStatus === "BUSY"
  ).length;
  const offline = technicians.filter(
    (t) => !t.isActive || t.availabilityStatus === "OFFLINE"
  ).length;

  const availablePct = total > 0 ? Math.round((available / total) * 100) : 0;
  const busyPct = total > 0 ? Math.round((busy / total) * 100) : 0;
  const offlinePct = total > 0 ? Math.max(0, 100 - availablePct - busyPct) : 0;

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Technician Availability
            </h2>
            <p className="text-xs text-slate-400">
              Live capacity and operational readiness
            </p>
          </div>
          <Link
            to="/business/technicians"
            className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            Manage <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>

        {total === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
              <Users className="h-5 w-5" />
            </div>
            <p className="text-xs font-medium text-slate-600">No technicians on team yet</p>
            <Link
              to="/business/technicians"
              className="mt-2 text-xs font-semibold text-blue-600 hover:underline"
            >
              Add your first technician
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-5 flex h-3 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                style={{ width: `${availablePct}%` }}
                className="bg-emerald-500 transition-all duration-500"
                title={`Available: ${availablePct}%`}
              />
              <div
                style={{ width: `${busyPct}%` }}
                className="bg-amber-500 transition-all duration-500"
                title={`Busy: ${busyPct}%`}
              />
              <div
                style={{ width: `${offlinePct}%` }}
                className="bg-slate-300 transition-all duration-500"
                title={`Offline: ${offlinePct}%`}
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-700">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  Available Now
                </span>
                <span className="font-semibold text-slate-900">
                  {available} ({availablePct}%)
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-700">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                  Busy on Jobs
                </span>
                <span className="font-semibold text-slate-900">
                  {busy} ({busyPct}%)
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-slate-700">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-400" />
                  Offline / Inactive
                </span>
                <span className="font-semibold text-slate-900">
                  {offline} ({offlinePct}%)
                </span>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-[11px] text-slate-500">
        Total Staff Capacity: <span className="font-bold text-slate-800">{total} technicians</span>
      </div>
    </div>
  );
}
