import { Building2 } from "lucide-react";

export default function BusinessStatusChart({ stats }) {
  if (!stats) return null;

  const { businesses } = stats;
  const total = businesses.total || 1;

  const segments = [
    {
      label: "Active",
      count: businesses.active,
      percent: Math.round((businesses.active / total) * 100),
      color: "bg-emerald-500",
      textColor: "text-emerald-600",
      bgLight: "bg-emerald-50",
    },
    {
      label: "Pending",
      count: businesses.pending,
      percent: Math.round((businesses.pending / total) * 100),
      color: "bg-amber-500",
      textColor: "text-amber-600",
      bgLight: "bg-amber-50",
    },
    {
      label: "Rejected",
      count: businesses.rejected,
      percent: Math.round((businesses.rejected / total) * 100),
      color: "bg-red-500",
      textColor: "text-red-600",
      bgLight: "bg-red-50",
    },
    {
      label: "Suspended",
      count: businesses.suspended,
      percent: Math.round((businesses.suspended / total) * 100),
      color: "bg-slate-400",
      textColor: "text-slate-600",
      bgLight: "bg-slate-50",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50">
            <Building2 className="h-4.5 w-4.5 text-violet-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800">Business Status</h3>
            <p className="text-[11px] text-slate-400">{businesses.total} total businesses</p>
          </div>
        </div>
      </div>


      <div className="mb-5 flex h-3 w-full overflow-hidden rounded-full bg-slate-100">
        {segments.map(
          (seg) =>
            seg.count > 0 && (
              <div
                key={seg.label}
                className={`${seg.color} transition-all duration-700`}
                style={{ width: `${seg.percent}%` }}
                title={`${seg.label}: ${seg.count}`}
              />
            )
        )}
      </div>


      <div className="grid grid-cols-2 gap-3">
        {segments.map((seg) => (
          <div
            key={seg.label}
            className={`flex items-center justify-between rounded-xl ${seg.bgLight} px-3.5 py-2.5`}
          >
            <div className="flex items-center gap-2">
              <div className={`h-2.5 w-2.5 rounded-full ${seg.color}`} />
              <span className="text-xs font-medium text-slate-600">{seg.label}</span>
            </div>
            <span className={`text-sm font-bold ${seg.textColor}`}>{seg.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
