import {
  Users,
  CheckCircle2,
  Wrench,
  Tag,
  IndianRupee,
  ShieldCheck,
} from "lucide-react";

export default function DashboardStats({
  totalTechnicians,
  availableTechnicians,
  activeTechnicians,
  totalServices,
  activeServices,
  avgServicePrice,
}) {
  const cards = [
    {
      label: "Total Technicians",
      value: totalTechnicians,
      subtitle: `${activeTechnicians} active on roster`,
      icon: Users,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Available Now",
      value: availableTechnicians,
      subtitle: totalTechnicians > 0
        ? `${Math.round((availableTechnicians / totalTechnicians) * 100)}% of team`
        : "Ready for dispatch",
      icon: CheckCircle2,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Services Offered",
      value: totalServices,
      subtitle: `${activeServices} active listings`,
      icon: Wrench,
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      label: "Active Services",
      value: activeServices,
      subtitle: totalServices > 0
        ? `${Math.round((activeServices / totalServices) * 100)}% available to clients`
        : "Visible to customers",
      icon: Tag,
      color: "bg-amber-50 text-amber-600",
    },
    {
      label: "Avg. Service Rate",
      value: avgServicePrice > 0 ? `₹${Math.round(avgServicePrice).toLocaleString("en-IN")}` : "₹0",
      subtitle: "Across service catalog",
      icon: IndianRupee,
      color: "bg-purple-50 text-purple-600",
    },
    {
      label: "Service Readiness",
      value: availableTechnicians > 0 && activeServices > 0 ? "Optimal" : "Setup Mode",
      subtitle: "Live operation status",
      icon: ShieldCheck,
      color: "bg-slate-100 text-slate-700",
    },
  ];

  return (
    <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
      {cards.map((c) => (
        <div
          key={c.label}
          className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">{c.label}</span>
            <span className={`flex h-8 w-8 items-center justify-center rounded-xl ${c.color}`}>
              <c.icon className="h-4 w-4" />
            </span>
          </div>
          <div>
            <div className="text-2xl font-bold tracking-tight text-slate-900">
              {c.value}
            </div>
            <p className="mt-1 text-[11px] text-slate-400">{c.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
