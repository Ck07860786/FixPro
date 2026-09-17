import { PackageOpen, RotateCcw } from "lucide-react";

export default function ServicesEmptyState({ onReset }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white py-20 px-6 text-center shadow-xs">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-50 text-blue-600 shadow-xs">
        <PackageOpen className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-900">No matching services found</h3>
      <p className="mt-1.5 max-w-sm text-sm text-slate-500">
        We couldn't find any services matching your criteria. Try adjusting your search query or selecting another trade category.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-600 transition"
      >
        <RotateCcw className="h-4 w-4" />
        <span>Reset Filters</span>
      </button>
    </div>
  );
}
