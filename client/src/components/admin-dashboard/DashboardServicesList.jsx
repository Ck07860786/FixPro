import { Link } from "react-router-dom";
import { ArrowUpRight, Wrench, IndianRupee, Clock, Plus } from "lucide-react";

export default function DashboardServicesList({ services = [] }) {
  const previewList = services.slice(0, 5);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-900">
            Live Service Catalog
          </h2>
          <p className="text-xs text-slate-400">
            Active services available for booking
          </p>
        </div>
        <Link
          to="/business/services"
          className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
        >
          View All <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>

      {services.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <Wrench className="h-6 w-6" />
          </div>
          <p className="text-sm font-semibold text-slate-700">No services listed yet</p>
          <p className="mt-1 text-xs text-slate-400">
            Create your service offerings to start receiving customer requests.
          </p>
          <Link
            to="/business/services"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            <Plus className="h-3.5 w-3.5" />
            List Service
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-slate-50">
          {previewList.map((service) => (
            <div
              key={service._id}
              className="flex items-center justify-between py-3 transition hover:bg-slate-50/50"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Wrench className="h-4 w-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-slate-800">
                      {service.name}
                    </p>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                      {service.category}
                    </span>
                  </div>
                  <div className="mt-0.5 flex items-center gap-3 text-[11px] text-slate-400">
                    <span className="flex items-center gap-0.5">
                      <Clock className="h-3 w-3" />
                      {service.estimatedDuration} mins
                    </span>
                    <span>•</span>
                    <span className={service.isActive ? "text-emerald-600 font-medium" : "text-slate-400"}>
                      {service.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 font-bold text-xs text-slate-900">
                <IndianRupee className="h-3.5 w-3.5 text-slate-400" />
                {Number(service.price).toLocaleString("en-IN")}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
