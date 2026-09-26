import {
  Building2,
  Users,
  Wrench,
  ClipboardList,
  IndianRupee,
  Clock,
  UserCheck,
  TrendingUp,
} from "lucide-react";

export default function DashboardStats({ stats }) {
  if (!stats) return null;

  const cards = [
    {
      label: "Total Businesses",
      value: stats.businesses.total,
      subtitle: `${stats.businesses.active} active`,
      icon: Building2,
      gradient: "from-violet-500 to-purple-600",
      bgLight: "bg-violet-50",
      textColor: "text-violet-600",
      shadowColor: "shadow-violet-100",
    },
    {
      label: "Pending Approval",
      value: stats.businesses.pending,
      subtitle: "Awaiting review",
      icon: Clock,
      gradient: "from-amber-500 to-orange-500",
      bgLight: "bg-amber-50",
      textColor: "text-amber-600",
      shadowColor: "shadow-amber-100",
      highlight: stats.businesses.pending > 0,
    },
    {
      label: "Total Users",
      value: stats.users.total,
      subtitle: `${stats.users.customers} customers`,
      icon: Users,
      gradient: "from-blue-500 to-cyan-500",
      bgLight: "bg-blue-50",
      textColor: "text-blue-600",
      shadowColor: "shadow-blue-100",
    },
    {
      label: "Active Technicians",
      value: stats.technicians.active,
      subtitle: `${stats.technicians.total} total registered`,
      icon: UserCheck,
      gradient: "from-emerald-500 to-teal-500",
      bgLight: "bg-emerald-50",
      textColor: "text-emerald-600",
      shadowColor: "shadow-emerald-100",
    },
    {
      label: "Total Services",
      value: stats.services.total,
      subtitle: `${stats.services.active} currently active`,
      icon: Wrench,
      gradient: "from-indigo-500 to-blue-600",
      bgLight: "bg-indigo-50",
      textColor: "text-indigo-600",
      shadowColor: "shadow-indigo-100",
    },
    {
      label: "Service Requests",
      value: stats.serviceRequests.total,
      subtitle: `${stats.serviceRequests.completed} completed`,
      icon: ClipboardList,
      gradient: "from-pink-500 to-rose-500",
      bgLight: "bg-pink-50",
      textColor: "text-pink-600",
      shadowColor: "shadow-pink-100",
    },
    {
      label: "Total Revenue",
      value: `₹${(stats.revenue.total || 0).toLocaleString("en-IN")}`,
      subtitle: "From completed jobs",
      icon: IndianRupee,
      gradient: "from-green-500 to-emerald-600",
      bgLight: "bg-green-50",
      textColor: "text-green-600",
      shadowColor: "shadow-green-100",
    },
    {
      label: "Platform Growth",
      value:
        stats.businesses.total > 0
          ? `${Math.round(
            ((stats.businesses.active) / stats.businesses.total) * 100
          )}%`
          : "0%",
      subtitle: "Business activation rate",
      icon: TrendingUp,
      gradient: "from-fuchsia-500 to-purple-600",
      bgLight: "bg-fuchsia-50",
      textColor: "text-fuchsia-600",
      shadowColor: "shadow-fuchsia-100",
    },
  ];

  return (
    <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className={`group relative overflow-hidden rounded-2xl border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${c.highlight
              ? "border-amber-300 ring-1 ring-amber-200"
              : "border-slate-200"
            } ${c.shadowColor}`}
        >
          <div
            className={`absolute left-0 right-0 top-0 h-1 bg-gradient-to-r ${c.gradient} opacity-80`}
          />

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {c.label}
              </span>
              <div className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                {c.value}
              </div>
              <p className="mt-1.5 text-[11px] font-medium text-slate-400">
                {c.subtitle}
              </p>
            </div>
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-2xl ${c.bgLight} transition-transform duration-300 group-hover:scale-110`}
            >
              <c.icon className={`h-5 w-5 ${c.textColor}`} />
            </div>
          </div>

          {c.highlight && (
            <div className="mt-3 flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
              </span>
              <span className="text-[10px] font-semibold text-amber-600">
                Requires attention
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}