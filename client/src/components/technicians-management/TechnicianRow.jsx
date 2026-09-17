import {
  CheckCircle2,
  XCircle,
  Pencil,
  Trash2,
  Loader2,
} from "lucide-react";
import {
  EMPLOYMENT_TYPES,
  AVAILABILITY_COLORS,
  AVAILABILITY_DOT,
} from "./technicianConstants";

export default function TechnicianRow({
  tech,
  isConfirmingDelete,
  isDeleting,
  onOpenEdit,
  onRequestDelete,
  onCancelDelete,
  onConfirmDelete,
}) {
  const initials = tech.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const employmentLabel =
    EMPLOYMENT_TYPES.find((t) => t.value === tech.employmentType)?.label ||
    tech.employmentType;

  return (
    <tr className="border-b border-slate-50 transition hover:bg-slate-50/50 last:border-0">
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 text-xs font-bold text-blue-700">
            {initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">{tech.name}</p>
            {tech.experienceYears > 0 && (
              <p className="text-[11px] text-slate-400">
                {tech.experienceYears} yr
                {tech.experienceYears !== 1 ? "s" : ""} experience
              </p>
            )}
          </div>
        </div>
      </td>

      <td className="px-4 py-3.5">
        <p className="text-xs text-slate-700">{tech.email}</p>
        <p className="text-[11px] text-slate-400">{tech.phone}</p>
      </td>

      <td className="px-4 py-3.5">
        <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-blue-600">
          {tech.specialization}
        </span>
      </td>

      <td className="px-4 py-3.5">
        <span className="text-xs text-slate-600">{employmentLabel}</span>
      </td>

      <td className="px-4 py-3.5">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${AVAILABILITY_COLORS[tech.availabilityStatus] ||
            AVAILABILITY_COLORS.OFFLINE
            }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${AVAILABILITY_DOT[tech.availabilityStatus] ||
              AVAILABILITY_DOT.OFFLINE
              }`}
          />
          {tech.availabilityStatus}
        </span>
      </td>

      <td className="px-4 py-3.5">
        {tech.isActive ? (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
            <CheckCircle2 className="h-3.5 w-3.5" /> Active
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400">
            <XCircle className="h-3.5 w-3.5" /> Inactive
          </span>
        )}
      </td>

      <td className="px-4 py-3.5 text-right">
        {isConfirmingDelete ? (
          <div className="inline-flex items-center gap-1.5">
            <span className="text-[11px] text-red-600 font-medium">
              Deactivate?
            </span>
            <button
              type="button"
              onClick={() => onConfirmDelete(tech._id)}
              disabled={isDeleting}
              className="inline-flex items-center gap-1 rounded-lg bg-red-600 px-2 py-1 text-[11px] font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
            >
              {isDeleting && <Loader2 className="h-3 w-3 animate-spin" />}
              Yes
            </button>
            <button
              type="button"
              onClick={onCancelDelete}
              className="rounded-lg border border-red-200 px-2 py-1 text-[11px] font-semibold text-red-700 transition hover:bg-red-50"
            >
              No
            </button>
          </div>
        ) : (
          <div className="inline-flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onOpenEdit(tech)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
              title="Edit"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
            {tech.isActive && (
              <button
                type="button"
                onClick={() => onRequestDelete(tech._id)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                title="Deactivate"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        )}
      </td>
    </tr>
  );
}
