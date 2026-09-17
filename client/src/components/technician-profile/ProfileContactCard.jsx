import {
  CircleUser,
  Mail,
  Phone,
  MapPin,
  Shield,
  ShieldCheck,
  Zap,
  Calendar,
} from "lucide-react";

export default function ProfileContactCard({ user, technician }) {

  const address = technician?.address || {};
  const addressText = [address?.street, address?.city, address?.state, address?.pincode]
    .filter(Boolean)
    .join(", ");

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    try {
      return new Date(dateStr).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return null;
    }
  };


  const infoRows = [
    { icon: CircleUser, label: "Full Name", value: user?.name },
    { icon: Mail, label: "Email", value: user?.email },
    { icon: Phone, label: "Phone", value: user?.phone },
    { icon: MapPin, label: "Address", value: addressText || user?.address },
  ].filter((row) => row.value);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">

      <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <CircleUser className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">Contact Information</h3>
          <p className="text-[11px] text-slate-500">Personal details</p>
        </div>
      </div>


      <div className="space-y-3">
        {infoRows.map((row) => (
          <div
            key={row.label}
            className="rounded-xl bg-slate-50/70 border border-slate-100 p-3.5"
          >
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              {row.label}
            </span>
            <p className="mt-1 flex items-center gap-2 text-sm font-medium text-slate-700">
              <row.icon className="h-4 w-4 shrink-0 text-slate-400" />
              {row.value}
            </p>
          </div>
        ))}
      </div>


      <div className="mt-4 space-y-2.5">
        <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-3">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-slate-500" />
            <span className="text-xs font-medium text-slate-700">Availability</span>
          </div>
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold ${technician?.availabilityStatus === "AVAILABLE"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
              : technician?.availabilityStatus === "BUSY"
                ? "bg-amber-50 text-amber-700 border border-amber-200/60"
                : "bg-slate-100 text-slate-600 border border-slate-200/60"
              }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${technician?.availabilityStatus === "AVAILABLE"
                ? "bg-emerald-500"
                : technician?.availabilityStatus === "BUSY"
                  ? "bg-amber-500"
                  : "bg-slate-400"
                }`}
            />
            {technician?.availabilityStatus?.replace("_", " ") || "Offline"}
          </span>
        </div>

        {technician?.joiningDate && (
          <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-slate-500" />
              <span className="text-xs font-medium text-slate-700">Joined</span>
            </div>
            <span className="text-xs font-semibold text-slate-800">
              {formatDate(technician.joiningDate)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
