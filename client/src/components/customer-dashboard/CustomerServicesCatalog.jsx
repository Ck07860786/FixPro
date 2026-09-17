import { Wrench, IndianRupee, Clock, ArrowRight, PackageOpen } from "lucide-react";
import { API_BASE } from "@/components/services-management/serviceConstants";

export default function CustomerServicesCatalog({ services = [] }) {
  const activeServices = services.filter((s) => s.isActive);

  return (
    <div id="services-catalog" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Available Services Catalog
          </h2>
          <p className="text-xs text-slate-500">
            Book trusted technicians with upfront pricing
          </p>
        </div>
        <span className="text-xs font-semibold text-blue-600">
          {activeServices.length} service{activeServices.length !== 1 ? "s" : ""} available
        </span>
      </div>

      {activeServices.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <PackageOpen className="h-6 w-6" />
          </div>
          <p className="text-sm font-semibold text-slate-700">
            No services currently listed
          </p>
          <p className="mt-1 text-xs text-slate-400">
            New services are added daily. Please check back shortly.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {activeServices.map((service) => {
            const thumb = service.images?.[0];
            const thumbSrc = thumb
              ? thumb.startsWith("http")
                ? thumb
                : `${API_BASE}${thumb}`
              : null;

            return (
              <div
                key={service._id}
                className="group flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-md"
              >
                <div>
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-semibold text-blue-600">
                      {service.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Clock className="h-3 w-3" />
                      {service.estimatedDuration} mins
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {thumbSrc ? (
                      <img
                        src={thumbSrc}
                        alt={service.name}
                        className="h-12 w-12 rounded-xl object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                        <Wrench className="h-5 w-5" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600">
                        {service.name}
                      </h3>
                      {service.description && (
                        <p className="mt-0.5 line-clamp-1 text-xs text-slate-400">
                          {service.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                  <div className="flex items-center text-sm font-bold text-slate-900">
                    <IndianRupee className="h-3.5 w-3.5 text-slate-400" />
                    {Number(service.price).toLocaleString("en-IN")}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      alert(`Booking for "${service.name}" selected. Our technician will be scheduled!`)
                    }
                    className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 transition group-hover:bg-blue-600 group-hover:text-white"
                  >
                    Book Now <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
