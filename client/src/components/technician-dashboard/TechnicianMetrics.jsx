import { Clock, CircleDot, Briefcase, Star } from "lucide-react";
import { EMPLOYMENT_TYPES } from "@/components/technicians-management/technicianConstants";

export default function TechnicianMetrics({ technician }) {
  const experience = Number(technician?.experienceYears) || 0;
  const employmentLabel =
    EMPLOYMENT_TYPES.find((t) => t.value === technician?.employmentType)?.label ||
    technician?.employmentType ||
    "Full Time";

  const skillsCount = Array.isArray(technician?.skills)
    ? technician.skills.length
    : technician?.skills
    ? technician.skills.split(",").length
    : 0;

  const cards = [
    {
      label: "Experience",
      value: `${experience} yr${experience !== 1 ? "s" : ""}`,
      subtitle: "Verified industry experience",
      icon: Clock,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Live Status",
      value: technician?.availabilityStatus || "AVAILABLE",
      subtitle: "Current operational mode",
      icon: CircleDot,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Employment Type",
      value: employmentLabel,
      subtitle: "Business contract terms",
      icon: Briefcase,
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      label: "Core Skillsets",
      value: skillsCount > 0 ? `${skillsCount} Skills` : "Specialist",
      subtitle: "Technical competencies",
      icon: Star,
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
