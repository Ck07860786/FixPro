import React from "react";
import {
  ChevronDown,
  CheckCircle2,
  XCircle,
  Ban,
  Clock,
} from "lucide-react";

export default function BusinessStatusDropdown({
  business,
  isOpen,
  onToggle,
  onStatusChange,
  loading = false,
}) {
  return (
    <div className="relative" data-dropdown>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        disabled={loading}
        className="flex h-8 items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 text-[11px] font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 disabled:opacity-50"
      >
        Update Status
        <ChevronDown className="h-3 w-3" />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full z-30 mt-1 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl shadow-slate-200/50"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="border-b border-slate-100 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Change Status
          </div>


          {business.status !== "ACTIVE" && (
            <button
              type="button"
              onClick={() => onStatusChange(business._id, "ACTIVE")}
              disabled={loading}
              className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-xs text-slate-700 transition hover:bg-emerald-50 disabled:opacity-50"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-3.5 w-3.5" />
              </div>
              <div>
                <p className="font-semibold text-emerald-700">
                  {business.status === "PENDING"
                    ? "Approve Business"
                    : "Activate Business"}
                </p>
                <p className="text-[10px] text-slate-400">Set status to active</p>
              </div>
            </button>
          )}


          {business.status !== "REJECTED" && (
            <button
              type="button"
              onClick={() => onStatusChange(business._id, "REJECTED")}
              disabled={loading}
              className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-xs text-slate-700 transition hover:bg-red-50 disabled:opacity-50"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50 text-red-600">
                <XCircle className="h-3.5 w-3.5" />
              </div>
              <div>
                <p className="font-semibold text-red-700">Reject Business</p>
                <p className="text-[10px] text-slate-400">Deny with reason</p>
              </div>
            </button>
          )}


          {business.status !== "SUSPENDED" && business.status !== "PENDING" && (
            <button
              type="button"
              onClick={() => onStatusChange(business._id, "SUSPENDED")}
              disabled={loading}
              className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-xs text-slate-700 transition hover:bg-amber-50 disabled:opacity-50"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <Ban className="h-3.5 w-3.5" />
              </div>
              <div>
                <p className="font-semibold text-amber-700">Suspend Business</p>
                <p className="text-[10px] text-slate-400">Temporarily disable</p>
              </div>
            </button>
          )}


          {business.status !== "PENDING" && (
            <button
              type="button"
              onClick={() => onStatusChange(business._id, "PENDING")}
              disabled={loading}
              className="flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-xs text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                <Clock className="h-3.5 w-3.5" />
              </div>
              <div>
                <p className="font-semibold text-slate-600">Move to Pending</p>
                <p className="text-[10px] text-slate-400">Send back for review</p>
              </div>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
