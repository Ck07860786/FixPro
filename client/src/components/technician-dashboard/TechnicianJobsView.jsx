import { ClipboardList, CheckCircle2, Shield } from "lucide-react";

export default function TechnicianJobsView({ technician }) {
  const isAvailable = technician?.availabilityStatus === "AVAILABLE";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Assigned Service Jobs
          </h2>
          <p className="text-xs text-slate-400">
            Field tickets assigned by your business dispatch team
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold">
          {isAvailable ? (
            <span className="inline-flex items-center gap-1 text-emerald-600">
              <CheckCircle2 className="h-3.5 w-3.5" /> Ready for Dispatch
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-amber-600">
              <Shield className="h-3.5 w-3.5" /> Assigned / Busy
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <ClipboardList className="h-6 w-6" />
        </div>
        <p className="text-sm font-semibold text-slate-800">
          No new tickets assigned
        </p>
        <p className="mt-1 max-w-sm text-xs text-slate-400">
          When your business administrator or coordinator assigns a customer service request to you, it will appear here with customer contact and service details.
        </p>
      </div>
    </div>
  );
}
