import { Link } from "react-router-dom";
import { Clock, IndianRupee, ArrowRight, Building2, Eye, Wrench } from "lucide-react";
import { API_BASE } from "@/components/services-management/serviceConstants";

export default function PublicServiceCard({ service, onQuickView, bookingTarget }) {
  const thumb = service.images?.[0];
  const thumbSrc = thumb
    ? thumb.startsWith("http")
      ? thumb
      : `${API_BASE}${thumb}`
    : null;

  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/50">
      <div>
        <div className="relative aspect-16/10 overflow-hidden rounded-xl bg-slate-100">
          {thumbSrc ? (
            <img
              src={thumbSrc}
              alt={service.name}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling?.classList.remove("hidden");
              }}
            />
          ) : null}
          <div
            className={`${
              thumbSrc ? "hidden" : "flex"
            } h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-blue-50/60 text-slate-400`}
          >
            <Wrench className="h-9 w-9 text-slate-300" />
          </div>

          <span className="absolute left-3 top-3 rounded-full bg-slate-950/70 px-3 py-1 text-[10px] font-semibold text-white backdrop-blur-md">
            {service.category}
          </span>

          <button
            type="button"
            onClick={() => onQuickView(service)}
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm opacity-0 group-hover:opacity-100 backdrop-blur-sm hover:bg-white hover:text-blue-600 transition"
            title="Quick view"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            <span>{service.estimatedDuration} mins estimated</span>
          </div>

          <h3 className="mt-1.5 text-base font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {service.name}
          </h3>

          <p className="mt-1.5 text-xs leading-relaxed text-slate-500 line-clamp-2">
            {service.description || "Professional on-demand service backed by verified experts."}
          </p>

          {service.businessId?.name && (
            <div className="mt-2.5 flex items-center gap-1 text-[11px] font-medium text-slate-400">
              <Building2 className="h-3 w-3" />
              <span>By {service.businessId.name}</span>
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3.5">
        <div>
          <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
            Fixed Price
          </span>
          <p className="flex items-center text-lg font-extrabold text-slate-900">
            <IndianRupee className="h-4 w-4 text-slate-700" />
            {service.price}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onQuickView(service)}
            className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
          >
            Details
          </button>
          <Link
            to={bookingTarget}
            className="inline-flex items-center gap-1 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-blue-600"
          >
            <span>Book</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
