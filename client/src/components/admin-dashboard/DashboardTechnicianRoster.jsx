import { Link } from "react-router-dom";
import { ArrowUpRight, Users, CheckCircle2, XCircle, UserPlus } from "lucide-react";
import {
  AVAILABILITY_COLORS,
  AVAILABILITY_DOT,
} from "@/components/technicians-management/technicianConstants";

export default function DashboardTechnicianRoster({ technicians = [] }) {
  const previewList = technicians.slice(0, 5);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900">
            Active Technicians Roster
          </h2>
          <p className="text-xs text-slate-400">
            Recently registered team members and current status
          </p>
        </div>
        <Link
          to="/business/technicians"
          className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
        >
          View All <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>

      {technicians.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <Users className="h-6 w-6" />
          </div>
          <p className="text-sm font-semibold text-slate-700">No technicians registered</p>
          <p className="mt-1 text-xs text-slate-400">
            Add team members to assign jobs and manage field operations.
          </p>
          <Link
            to="/business/technicians"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            <UserPlus className="h-3.5 w-3.5" />
            Add Technician
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                <th className="pb-3 pr-4">Technician</th>
                <th className="pb-3 pr-4">Specialization</th>
                <th className="pb-3 pr-4">Availability</th>
                <th className="pb-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {previewList.map((tech) => {
                const initials = tech.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase();

                return (
                  <tr
                    key={tech._id}
                    className="border-b border-slate-50 transition hover:bg-slate-50/50 last:border-0"
                  >
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 text-[11px] font-bold text-blue-700">
                          {initials}
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-800">
                            {tech.name}
                          </p>
                          <p className="text-[10px] text-slate-400">{tech.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="inline-flex rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-600">
                        {tech.specialization}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
                          AVAILABILITY_COLORS[tech.availabilityStatus] ||
                          AVAILABILITY_COLORS.OFFLINE
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            AVAILABILITY_DOT[tech.availabilityStatus] ||
                            AVAILABILITY_DOT.OFFLINE
                          }`}
                        />
                        {tech.availabilityStatus}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      {tech.isActive ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                          <CheckCircle2 className="h-3 w-3" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400">
                          <XCircle className="h-3 w-3" /> Inactive
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
