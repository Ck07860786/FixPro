import { ClipboardList, ShieldCheck, Mail, Phone } from "lucide-react";

export default function CustomerActivityFeed({ user }) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">Customer Profile</h2>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
            <ShieldCheck className="h-3.5 w-3.5" /> Active Account
          </span>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Full Name
            </span>
            <p className="font-semibold text-slate-800">{user?.name || "Customer"}</p>
          </div>

          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Email Address
            </span>
            <p className="flex items-center gap-1 text-slate-600">
              <Mail className="h-3 w-3 text-slate-400" />
              {user?.email || "—"}
            </p>
          </div>

          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Phone Number
            </span>
            <p className="flex items-center gap-1 text-slate-600">
              <Phone className="h-3 w-3 text-slate-400" />
              {user?.phone || "Not provided"}
            </p>
          </div>
        </div>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">Current Service Tickets</h2>
          <span className="text-xs text-slate-400">Real-time status</span>
        </div>

        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <ClipboardList className="h-5 w-5" />
          </div>
          <p className="text-sm font-semibold text-slate-700">
            No active service requests
          </p>
          <p className="mt-1 max-w-sm text-xs text-slate-400">
            You don't have any pending or ongoing service requests right now. Select a service from the catalog below to create your first booking.
          </p>
        </div>
      </div>
    </div>
  );
}
