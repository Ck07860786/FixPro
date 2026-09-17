import {
  CircleUser,
  Mail,
  Phone,
  BadgeCheck,
  Zap,
  Briefcase,
} from "lucide-react";

export default function ProfileHero({ user, technician, business }) {
  const initials = user?.name
    ? user.name
      .split(" ")
      .map((n) => n.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
    : "T";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">

      <div className="relative h-32 sm:h-40">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #1e3a5f 0%, #2563eb 50%, #60a5fa 100%)",
          }}
        />
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5" />
        <div className="absolute left-1/3 top-8 h-20 w-20 rounded-full bg-white/5" />


        <div className="absolute right-4 top-4">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm ${technician?.availabilityStatus === "AVAILABLE"
              ? "bg-emerald-500/20 text-emerald-100"
              : technician?.availabilityStatus === "BUSY"
                ? "bg-amber-500/20 text-amber-100"
                : "bg-slate-500/20 text-slate-200"
              }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${technician?.availabilityStatus === "AVAILABLE"
                ? "bg-emerald-400"
                : technician?.availabilityStatus === "BUSY"
                  ? "bg-amber-400"
                  : "bg-slate-400"
                }`}
            />
            {technician?.availabilityStatus?.replace("_", " ") || "OFFLINE"}
          </span>
        </div>
      </div>


      <div className="relative px-6 pb-6 sm:px-8">
        <div className="-mt-12 flex items-end gap-4">

          {user?.profilePic ? (
            <img
              src={user.profilePic}
              alt={user.name}
              className="h-22 w-22 rounded-2xl border-4 border-white object-cover shadow-md sm:h-24 sm:w-24"
            />
          ) : (
            <div className="flex h-22 w-22 items-center justify-center rounded-2xl border-4 border-white bg-gradient-to-br from-blue-600 to-indigo-600 shadow-md sm:h-24 sm:w-24">
              <span className="text-2xl font-bold text-white">{initials}</span>
            </div>
          )}


          <div className="mb-1 flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="truncate text-xl text-white font-bold tracking-tight">
                {user?.name}
              </h2>
              <BadgeCheck className="h-5 w-5 shrink-0 text-white" />
            </div>
            <p className="mt-4 text-sm p-2 text-slate-500">
              {technician?.specialization || "Field Technician"}
              {business?.name ? ` at ${business.name}` : ""}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700 border border-blue-100">
                <Briefcase className="h-3 w-3" />
                {user?.role?.replace("_", " ") || "TECHNICIAN"}
              </span>
            </div>
          </div>
        </div>


        <div className="mt-4 flex flex-wrap gap-4 border-t border-slate-100 pt-4 text-xs text-slate-600">
          <span className="flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5 text-slate-400" />
            {user?.email}
          </span>
          {user?.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-slate-400" />
              {user.phone}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
