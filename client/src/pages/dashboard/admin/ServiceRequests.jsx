import { useState } from "react";
import {
  Search,
  ChevronDown,
  Calendar,
  SlidersHorizontal,
  Download,
  UserPlus,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function ServiceRequests() {
  const [search, setSearch] = useState("");

  const requests = [
    {
      id: "SR-1024",
      customer: "Acme Corp",
      customerAvatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&q=80",
      service: "HVAC Maintenance",
      technician: null,
      priority: "High",
      status: "New",
    },
    {
      id: "SR-1023",
      customer: "Sarah Jenkins",
      customerInitials: "SJ",
      service: "Plumbing Repair",
      technician: {
        name: "Mike T.",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&q=80",
      },
      priority: "Medium",
      status: "Assigned",
    },
  ];

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Service Requests
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage and assign all incoming service tickets.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
          <Download className="h-4 w-4" />
          Export
        </button>
      </div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="flex min-w-[280px] flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by ID, customer, or service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent outline-none placeholder:text-slate-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
            Status: All <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </button>

          <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
            Priority: All <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </button>

          <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50">
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
            This Week <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </button>

          <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm hover:bg-slate-50">
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Service</th>
                <th className="px-6 py-4">Technician</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/60">
                  <td className="px-6 py-4 font-semibold text-slate-800">
                    {req.id}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {req.customerAvatar ? (
                        <img
                          src={req.customerAvatar}
                          alt={req.customer}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                          {req.customerInitials}
                        </div>
                      )}
                      <span className="font-medium text-slate-800">
                        {req.customer}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{req.service}</td>
                  <td className="px-6 py-4">
                    {req.technician ? (
                      <div className="flex items-center gap-2">
                        <img
                          src={req.technician.avatar}
                          alt={req.technician.name}
                          className="h-6 w-6 rounded-full object-cover"
                        />
                        <span className="text-sm font-medium text-slate-700">
                          {req.technician.name}
                        </span>
                      </div>
                    ) : (
                      <button className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-blue-400 bg-blue-50/40 px-3 py-1 text-xs font-semibold text-blue-600 transition hover:bg-blue-50">
                        <UserPlus className="h-3 w-3" />
                        Assign
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        req.priority === "High"
                          ? "bg-rose-50 text-rose-600"
                          : req.priority === "Medium"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {req.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        req.status === "New"
                          ? "bg-slate-100 text-slate-700"
                          : req.status === "Assigned"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          req.status === "New"
                            ? "bg-slate-500"
                            : req.status === "Assigned"
                            ? "bg-blue-600"
                            : "bg-emerald-600"
                        }`}
                      />
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-slate-600">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 text-xs text-slate-500">
          <span>Showing 1 to 2 of 24 entries</span>
          <div className="flex items-center gap-1">
            <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50">
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 font-semibold text-white">
              1
            </button>
            <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50">
              2
            </button>
            <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

