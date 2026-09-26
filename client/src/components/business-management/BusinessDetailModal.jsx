import React from "react";
import {
  Building2,
  X,
  ShieldCheck,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Ban,
} from "lucide-react";
import StatusBadge from "./StatusBadge";
import { formatDate, formatAddress } from "./businessConstants";

function InfoRow({ label, value }) {
  return (
    <div className="flex items-start justify-between px-3.5 py-2.5">
      <span className="shrink-0 text-[11px] font-medium text-slate-400">
        {label}
      </span>
      <span className="ml-4 text-right text-xs font-semibold text-slate-700">
        {value}
      </span>
    </div>
  );
}

export default function BusinessDetailModal({
  business,
  isOpen,
  onClose,
  onStatusChange,
  statusUpdateLoading,
}) {
  if (!isOpen || !business) return null;

  const ownerInitials = business.ownerId?.name
    ? business.ownerId.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()
    : "—";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-purple-100">
              <Building2 className="h-5 w-5 text-violet-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">{business.name}</h2>
              <div className="mt-0.5 flex items-center gap-2">
                <StatusBadge status={business.status} size="sm" />
                {business.businessType && (
                  <span className="text-[11px] text-slate-400">
                    · {business.businessType}
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>


        <div className="custom-scrollbar max-h-[60vh] overflow-y-auto px-6 py-5">
          <div className="grid gap-6 sm:grid-cols-2">

            <div>
              <h4 className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                <Building2 className="h-3.5 w-3.5" />
                Business Info
              </h4>
              <div className="divide-y divide-slate-100 rounded-xl border border-slate-100 bg-slate-50/50">
                <InfoRow label="Name" value={business.name} />
                <InfoRow label="Type" value={business.businessType || "—"} />
                <InfoRow label="Email" value={business.email} />
                <InfoRow label="Phone" value={business.phone || "—"} />
                <InfoRow
                  label="Address"
                  value={formatAddress(business.address)}
                />
              </div>
            </div>


            <div className="space-y-5">
              {business.ownerId && (
                <div>
                  <h4 className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Owner Details
                  </h4>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-purple-500 text-sm font-bold text-white shadow-sm">
                      {ownerInitials}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-700">
                        {business.ownerId.name}
                      </p>
                      <p className="truncate text-[11px] text-slate-500">
                        {business.ownerId.email}
                      </p>
                      {business.ownerId.phone && (
                        <p className="text-[11px] text-slate-400">
                          {business.ownerId.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div>
                <h4 className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <Calendar className="h-3.5 w-3.5" />
                  Timeline
                </h4>
                <div className="divide-y divide-slate-100 rounded-xl border border-slate-100 bg-slate-50/50">
                  <InfoRow
                    label="Registered"
                    value={formatDate(business.createdAt)}
                  />
                  {business.approvedAt && (
                    <InfoRow
                      label="Approved"
                      value={formatDate(business.approvedAt)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {business.status === "REJECTED" && business.rejectionReason && (
            <div className="mt-5">
              <h4 className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-400">
                <AlertTriangle className="h-3.5 w-3.5" />
                Rejection Reason
              </h4>
              <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3">
                <p className="text-sm leading-relaxed text-red-700">
                  {business.rejectionReason}
                </p>
              </div>
            </div>
          )}
        </div>


        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
          <p className="text-[10px] text-slate-400">ID: {business._id}</p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Close
            </button>


            {business.status === "PENDING" && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onStatusChange(business._id, "REJECTED");
                  }}
                  disabled={statusUpdateLoading}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
                >
                  <XCircle className="h-3.5 w-3.5" />
                  Reject
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onStatusChange(business._id, "ACTIVE");
                  }}
                  disabled={statusUpdateLoading}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Approve
                </button>
              </>
            )}

            {business.status === "ACTIVE" && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onStatusChange(business._id, "SUSPENDED");
                }}
                disabled={statusUpdateLoading}
                className="inline-flex items-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-amber-700 disabled:opacity-50"
              >
                <Ban className="h-3.5 w-3.5" />
                Suspend
              </button>
            )}

            {(business.status === "SUSPENDED" ||
              business.status === "REJECTED") && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onStatusChange(business._id, "ACTIVE");
                  }}
                  disabled={statusUpdateLoading}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Activate
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
