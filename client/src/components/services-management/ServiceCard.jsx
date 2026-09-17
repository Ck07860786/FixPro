import { useState } from "react";
import {
  Wrench,
  ImagePlus,
  IndianRupee,
  Clock,
  Pencil,
  Trash2,
  Loader2,
} from "lucide-react";
import { API_BASE } from "./serviceConstants";
export default function ServiceCard({ service, onEdit, onDelete, isDeleting }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const thumb = service.images?.[0];
  const thumbSrc = thumb
    ? thumb.startsWith("http")
      ? thumb
      : `${API_BASE}${thumb}`
    : null;

  const handleDelete = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    onDelete(service._id);
  };

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative h-40 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
        {thumbSrc ? (
          <img
            src={thumbSrc}
            alt={service.name}
            className="h-full w-full object-cover transition group-hover:scale-105"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Wrench className="h-10 w-10 text-slate-300" />
          </div>
        )}
        <span
          className={`absolute right-3 top-3 flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold backdrop-blur-sm ${
            service.isActive
              ? "bg-emerald-50/90 text-emerald-700"
              : "bg-slate-100/90 text-slate-500"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              service.isActive ? "bg-emerald-500" : "bg-slate-400"
            }`}
          />
          {service.isActive ? "Active" : "Inactive"}
        </span>
        {service.images?.length > 1 && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
            <ImagePlus className="h-3 w-3" />
            {service.images.length}
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="text-sm font-bold text-slate-900 leading-snug">
            {service.name}
          </h3>
          <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-blue-600">
            {service.category}
          </span>
        </div>

        {service.description && (
          <p className="mb-3 text-xs leading-relaxed text-slate-500 line-clamp-2">
            {service.description}
          </p>
        )}
        <div className="mb-4 flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <IndianRupee className="h-3 w-3 text-slate-400" />
            <span className="font-semibold text-slate-800">
              ₹{Number(service.price).toLocaleString("en-IN")}
            </span>
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-slate-400" />
            {service.estimatedDuration} mins
          </span>
        </div>
        {confirmDelete ? (
          <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2">
            <span className="flex-1 text-xs font-medium text-red-700">
              Delete this service?
            </span>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="inline-flex items-center gap-1 rounded-lg bg-red-600 px-3 py-1.5 text-[11px] font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
            >
              {isDeleting && <Loader2 className="h-3 w-3 animate-spin" />}
              Yes
            </button>
            <button
              type="button"
              onClick={() => setConfirmDelete(false)}
              className="rounded-lg border border-red-200 px-3 py-1.5 text-[11px] font-semibold text-red-700 transition hover:bg-red-100"
            >
              No
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onEdit(service)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <Pencil className="h-3 w-3" />
              Edit
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 hover:border-red-200"
            >
              <Trash2 className="h-3 w-3" />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
