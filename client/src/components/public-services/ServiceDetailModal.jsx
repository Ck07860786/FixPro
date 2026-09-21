import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  X,
  Clock,
  IndianRupee,
  ShieldCheck,
  Building2,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Sparkles,
  Wrench,
} from "lucide-react";
import { API_BASE } from "@/components/services-management/serviceConstants";

export default function ServiceDetailModal({ service, onClose }) {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  if (!service) return null;

  const images = service.images && service.images.length > 0 ? service.images : [];
  const currentImage = images[activeImageIdx]
    ? images[activeImageIdx].startsWith("http")
      ? images[activeImageIdx]
      : `${API_BASE}${images[activeImageIdx]}`
    : null;

  const bookingTarget = !isAuthenticated
    ? "/login"
    : user?.role === "ADMIN"
    ? "/business/services"
    : user?.role === "TECHNICIAN"
    ? "/technician/dashboard"
    : `/customer/book-service?serviceId=${service._id}&businessId=${service.businessId?._id || service.businessId || ""}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl border border-slate-100 p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {service.category}
          </span>
          <span className="flex items-center gap-1 text-xs font-medium text-slate-400">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            {service.estimatedDuration} mins
          </span>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 pr-8">
          {service.name}
        </h2>

        <div className="mt-5 overflow-hidden rounded-2xl bg-slate-100 aspect-16/9 relative">
          {currentImage ? (
            <img
              src={currentImage}
              alt={service.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-300">
              <Wrench className="h-12 w-12 text-slate-300" />
            </div>
          )}
        </div>

        {images.length > 1 && (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {images.map((img, idx) => {
              const src = img.startsWith("http") ? img : `${API_BASE}${img}`;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative h-16 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition ${
                    activeImageIdx === idx
                      ? "border-blue-600 ring-2 ring-blue-500/20"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-6 space-y-4">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Service Overview
            </h4>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
              {service.description || "Comprehensive service delivered by certified technicians."}
            </p>
          </div>

          {service.businessId && (
            <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Service Provider
              </span>
              <div className="mt-2 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-600">
                <span className="flex items-center gap-1.5 font-bold text-slate-800">
                  <Building2 className="h-4 w-4 text-blue-600" />
                  {service.businessId.name}
                </span>
                {service.businessId.phone && (
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <Phone className="h-3.5 w-3.5 text-slate-400" />
                    {service.businessId.phone}
                  </span>
                )}
                {service.businessId.email && (
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <Mail className="h-3.5 w-3.5 text-slate-400" />
                    {service.businessId.email}
                  </span>
                )}
                {service.businessId.address?.city && (
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    {[service.businessId.address.city, service.businessId.address.state]
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 rounded-xl bg-emerald-50/70 border border-emerald-100 px-4 py-3 text-xs text-emerald-800">
            <ShieldCheck className="h-4 w-4 text-emerald-600 flex-shrink-0" />
            <span>
              Backed by FixPro Verified Quality Guarantee and upfront pricing guarantee.
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 pt-5">
          <div>
            <span className="text-xs font-medium text-slate-400">Total Upfront Price</span>
            <p className="flex items-center text-2xl font-black text-slate-900">
              <IndianRupee className="h-5 w-5 text-slate-700" />
              {service.price}
            </p>
          </div>

          <div className="flex w-full sm:w-auto items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Close
            </button>
            <Link
              to={bookingTarget}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:brightness-110 transition"
            >
              <span>Book This Service</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
