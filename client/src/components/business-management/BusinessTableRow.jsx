import React from "react";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Eye,
  CheckCircle2,
} from "lucide-react";
import StatusBadge from "./StatusBadge";
import BusinessStatusDropdown from "./BusinessStatusDropdown";
import { formatDate } from "./businessConstants";

export default function BusinessTableRow({
  business,
  onViewDetails,
  onStatusChange,
  statusUpdateLoading,
  isDropdownOpen,
  onToggleDropdown,
}) {
  const ownerInitials = business.ownerId?.name
    ? business.ownerId.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()
    : "—";

  const locationText = business.address
    ? [business.address.city, business.address.state].filter(Boolean).join(", ")
    : "";

  return (
    <tr className="group transition-colors hover:bg-slate-50/70 border-b border-slate-50 last:border-0">

      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-purple-100">
            <Building2 className="h-4 w-4 text-violet-600" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-800">
              {business.name}
            </p>
            {business.businessType && (
              <p className="truncate text-[11px] text-slate-400">
                {business.businessType}
              </p>
            )}
          </div>
        </div>
      </td>


      <td className="px-5 py-4">
        {business.ownerId ? (
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-200 to-slate-300 text-[10px] font-bold text-slate-600">
              {ownerInitials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-slate-700">
                {business.ownerId.name}
              </p>
              <p className="truncate text-[10px] text-slate-400">
                {business.ownerId.email}
              </p>
            </div>
          </div>
        ) : (
          <span className="text-xs text-slate-400">—</span>
        )}
      </td>


      <td className="px-5 py-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <Mail className="h-3 w-3 text-slate-400 shrink-0" />
            <span className="truncate max-w-[140px]">{business.email}</span>
          </div>
          {business.phone && (
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <Phone className="h-3 w-3 text-slate-400 shrink-0" />
              <span>{business.phone}</span>
            </div>
          )}
        </div>
      </td>


      <td className="px-5 py-4">
        {locationText ? (
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <MapPin className="h-3 w-3 shrink-0 text-slate-400" />
            <span className="truncate max-w-[120px]">{locationText}</span>
          </div>
        ) : (
          <span className="text-[11px] text-slate-300">—</span>
        )}
      </td>


      <td className="px-5 py-4">
        <StatusBadge status={business.status} />
        {business.status === "REJECTED" && business.rejectionReason && (
          <p
            className="mt-1 max-w-[150px] truncate text-[10px] text-red-500 font-medium"
            title={business.rejectionReason}
          >
            Reason: {business.rejectionReason}
          </p>
        )}
      </td>


      <td className="px-5 py-4">
        <div className="text-[11px] text-slate-500">
          {formatDate(business.createdAt)}
        </div>
        {business.approvedAt && (
          <div className="mt-0.5 text-[10px] text-emerald-600 font-medium flex items-center gap-1">
            <span>✓ Approved {formatDate(business.approvedAt)}</span>
          </div>
        )}
      </td>


      <td className="px-5 py-4">
        <div className="flex items-center justify-center gap-1.5">
          <button
            type="button"
            onClick={() => onViewDetails(business)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            title="View details"
          >
            <Eye className="h-4 w-4" />
          </button>


          {business.status === "PENDING" && (
            <button
              type="button"
              onClick={() => onStatusChange(business._id, "ACTIVE")}
              disabled={statusUpdateLoading}
              className="flex h-8 items-center gap-1 rounded-lg bg-emerald-600 px-2.5 text-[11px] font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-50"
              title="Quick approve business"
            >
              <CheckCircle2 className="h-3 w-3" />
              Approve
            </button>
          )}


          <BusinessStatusDropdown
            business={business}
            isOpen={isDropdownOpen}
            onToggle={onToggleDropdown}
            onStatusChange={onStatusChange}
            loading={statusUpdateLoading}
          />
        </div>
      </td>
    </tr>
  );
}
