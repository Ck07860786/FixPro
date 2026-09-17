import { Calendar, Briefcase } from "lucide-react";
import {
  AVAILABILITY_COLORS,
  AVAILABILITY_DOT,
} from "@/components/technicians-management/technicianConstants";

export default function TechnicianHeader({ user, business, technician }) {
  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const availability = technician?.availabilityStatus || "AVAILABLE";

  return (
    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Welcome back, {user?.name || "Technician"}! 👋
          </h1>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
              AVAILABILITY_COLORS[availability] || AVAILABILITY_COLORS.AVAILABLE
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                AVAILABILITY_DOT[availability] || AVAILABILITY_DOT.AVAILABLE
              }`}
            />
            {availability}
          </span>
        </div>
        <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Briefcase className="h-3.5 w-3.5 text-slate-400" />
            Assigned Business: <strong className="font-semibold text-slate-700">{business?.name || "FixPro Network"}</strong>
          </span>
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-500 shadow-sm">
          <Calendar className="h-3.5 w-3.5 text-slate-400" />
          {formattedDate}
        </div>
      </div>
    </div>
  );
}
