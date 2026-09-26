import { ClipboardList, IndianRupee } from "lucide-react";

const statusConfig = {
  PENDING: { color: "bg-amber-500", bgLight: "bg-amber-50", text: "text-amber-700" },
  CONFIRMED: { color: "bg-blue-500", bgLight: "bg-blue-50", text: "text-blue-700" },
  IN_PROGRESS: { color: "bg-indigo-500", bgLight: "bg-indigo-50", text: "text-indigo-700" },
  COMPLETED: { color: "bg-emerald-500", bgLight: "bg-emerald-50", text: "text-emerald-700" },
  CANCELLED: { color: "bg-red-500", bgLight: "bg-red-50", text: "text-red-700" },
  ON_HOLD: { color: "bg-slate-400", bgLight: "bg-slate-50", text: "text-slate-600" },
};

export default function ServiceRequestOverview({ stats, recentServiceRequests }) {
  if (!stats) return null;

  const { serviceRequests } = stats;

  const statuses = [
    { key: "pending", label: "Pending", count: serviceRequests.pending },
    { key: "confirmed", label: "Confirmed", count: serviceRequests.confirmed },
    { key: "inProgress", label: "In Progress", count: serviceRequests.inProgress },
    { key: "completed", label: "Completed", count: serviceRequests.completed },
    { key: "cancelled", label: "Cancelled", count: serviceRequests.cancelled },
    { key: "onHold", label: "On Hold", count: serviceRequests.onHold },
  ];

  return (
    <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-50">
            <ClipboardList className="h-4.5 w-4.5 text-pink-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800">Service Requests Overview</h3>
            <p className="text-[11px] text-slate-400">
              {serviceRequests.total} total requests across all businesses
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {statuses.map((s) => {
          const config = statusConfig[s.label.toUpperCase().replace(" ", "_")] || statusConfig.PENDING;
          return (
            <div
              key={s.key}
              className={`flex items-center gap-2 rounded-xl ${config.bgLight} px-3.5 py-2`}
            >
              <div className={`h-2 w-2 rounded-full ${config.color}`} />
              <span className="text-xs font-medium text-slate-600">{s.label}</span>
              <span className={`text-sm font-bold ${config.text}`}>{s.count}</span>
            </div>
          );
        })}
      </div>


      {recentServiceRequests && recentServiceRequests.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80">
                <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Customer
                </th>
                <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Service
                </th>
                <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Business
                </th>
                <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Amount
                </th>
                <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Status
                </th>
                <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {recentServiceRequests.map((req) => {
                const config = statusConfig[req.status] || statusConfig.PENDING;
                return (
                  <tr
                    key={req._id}
                    className="border-b border-slate-50 transition-colors hover:bg-slate-50/50"
                  >
                    <td className="px-4 py-3">
                      <div className="text-xs font-medium text-slate-700">
                        {req.customerId?.name || "Unknown"}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {req.customerId?.email || ""}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-600">
                      {req.serviceId?.name || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-600">
                      {req.businessId?.name || "N/A"}
                    </td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-0.5 text-xs font-semibold text-slate-700">
                        <IndianRupee className="h-3 w-3" />
                        {(req.totalAmount || 0).toLocaleString("en-IN")}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${config.bgLight} ${config.text}`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${config.color}`} />
                        {req.status?.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[11px] text-slate-400">
                      {new Date(req.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {(!recentServiceRequests || recentServiceRequests.length === 0) && (
        <div className="flex h-24 items-center justify-center rounded-xl bg-slate-50">
          <p className="text-sm text-slate-400">No service requests yet</p>
        </div>
      )}
    </div>
  );
}
