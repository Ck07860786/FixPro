import { Users } from "lucide-react";

export default function UserRoleChart({ stats }) {
  if (!stats) return null;

  const { users } = stats;
  const total = users.total || 1;

  const roles = [
    {
      label: "Customers",
      count: users.customers,
      percent: Math.round((users.customers / total) * 100),
      color: "bg-blue-500",
      textColor: "text-blue-600",
      bgLight: "bg-blue-50",
    },
    {
      label: "Admins",
      count: users.admins,
      percent: Math.round((users.admins / total) * 100),
      color: "bg-violet-500",
      textColor: "text-violet-600",
      bgLight: "bg-violet-50",
    },
    {
      label: "Technicians",
      count: users.technicians,
      percent: Math.round((users.technicians / total) * 100),
      color: "bg-emerald-500",
      textColor: "text-emerald-600",
      bgLight: "bg-emerald-50",
    },
    {
      label: "Super Admins",
      count: users.superAdmins,
      percent: Math.round((users.superAdmins / total) * 100),
      color: "bg-fuchsia-500",
      textColor: "text-fuchsia-600",
      bgLight: "bg-fuchsia-50",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50">
            <Users className="h-4.5 w-4.5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800">User Distribution</h3>
            <p className="text-[11px] text-slate-400">{users.total} total users</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {roles.map((role) => (
          <div key={role.label}>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600">{role.label}</span>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold ${role.textColor}`}>{role.count}</span>
                <span className="text-[10px] text-slate-400">({role.percent}%)</span>
              </div>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full ${role.color} transition-all duration-700`}
                style={{ width: `${Math.max(role.percent, role.count > 0 ? 3 : 0)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
