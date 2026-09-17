import { Wrench, Tag, CheckCircle2, Headphones } from "lucide-react";

export default function CustomerStats({ totalServices, categoriesCount, activeServices }) {
  const cards = [
    {
      label: "Available Services",
      value: totalServices,
      subtitle: `${activeServices} active listings ready for booking`,
      icon: Wrench,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Service Categories",
      value: categoriesCount,
      subtitle: "HVAC, Plumbing, Electrical & more",
      icon: Tag,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Account Status",
      value: "Active",
      subtitle: "Verified customer profile",
      icon: CheckCircle2,
      color: "bg-purple-50 text-purple-600",
    },
    {
      label: "Customer Support",
      value: "24/7",
      subtitle: "Dedicated emergency response",
      icon: Headphones,
      color: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">
              {stat.label}
            </span>
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-xl ${stat.color}`}
            >
              <stat.icon className="h-4 w-4" />
            </span>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="mt-1 text-[11px] text-slate-400">{stat.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
