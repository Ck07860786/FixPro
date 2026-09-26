import { Building2, Mail, Phone, MapPin, ExternalLink } from "lucide-react";

const statusStyles = {
  ACTIVE: "bg-emerald-50 text-emerald-700 border-emerald-200",
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  REJECTED: "bg-red-50 text-red-700 border-red-200",
  SUSPENDED: "bg-slate-100 text-slate-600 border-slate-300",
};

export default function RecentBusinesses({ businesses }) {
  if (!businesses || businesses.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50">
            <Building2 className="h-4.5 w-4.5 text-violet-600" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">Recent Businesses</h3>
        </div>
        <div className="flex h-32 items-center justify-center rounded-xl bg-slate-50">
          <p className="text-sm text-slate-400">No businesses registered yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50">
            <Building2 className="h-4.5 w-4.5 text-violet-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800">Recent Businesses</h3>
            <p className="text-[11px] text-slate-400">Latest registered businesses</p>
          </div>
        </div>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
        {businesses.map((biz) => (
          <div
            key={biz._id}
            className="group rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-all duration-200 hover:border-slate-200 hover:bg-white hover:shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-slate-800 truncate">
                    {biz.name}
                  </h4>
                  <span
                    className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${statusStyles[biz.status] || statusStyles.PENDING
                      }`}
                  >
                    {biz.status}
                  </span>
                </div>

                {biz.businessType && (
                  <p className="mt-1 text-[11px] text-slate-400">{biz.businessType}</p>
                )}

                <div className="mt-2 flex flex-wrap items-center gap-3">
                  {biz.email && (
                    <span className="flex items-center gap-1 text-[11px] text-slate-500">
                      <Mail className="h-3 w-3 text-slate-400" />
                      {biz.email}
                    </span>
                  )}
                  {biz.phone && (
                    <span className="flex items-center gap-1 text-[11px] text-slate-500">
                      <Phone className="h-3 w-3 text-slate-400" />
                      {biz.phone}
                    </span>
                  )}
                </div>

                {biz.address?.city && (
                  <span className="mt-1.5 flex items-center gap-1 text-[11px] text-slate-400">
                    <MapPin className="h-3 w-3" />
                    {[biz.address.city, biz.address.state].filter(Boolean).join(", ")}
                  </span>
                )}

                {biz.ownerId && (
                  <p className="mt-1.5 text-[10px] text-slate-400">
                    Owner: <span className="font-medium text-slate-500">{biz.ownerId.name}</span>
                    {biz.ownerId.email && ` · ${biz.ownerId.email}`}
                  </p>
                )}
              </div>

              <div className="text-right shrink-0">
                <p className="text-[10px] text-slate-400">
                  {new Date(biz.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
