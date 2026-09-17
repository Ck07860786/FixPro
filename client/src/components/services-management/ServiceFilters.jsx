import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { FILTER_CATEGORIES } from "./serviceConstants";
export default function ServiceFilters({
  search,
  onSearchChange,
  categoryFilter,
  onCategoryFilterChange,
}) {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <div className="flex min-w-[280px] flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm">
        <Search className="h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search by name, category, or description…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-transparent outline-none placeholder:text-slate-400"
        />
      </div>
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowCategoryDropdown((v) => !v)}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
        >
          Category: {categoryFilter}
          <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
        </button>

        {showCategoryDropdown && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowCategoryDropdown(false)}
            />
            <div className="absolute right-0 z-20 mt-1.5 w-44 rounded-xl border border-slate-200 bg-white py-1.5 shadow-lg">
              {FILTER_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    onCategoryFilterChange(cat);
                    setShowCategoryDropdown(false);
                  }}
                  className={`block w-full px-4 py-2 text-left text-xs font-medium transition hover:bg-slate-50 ${
                    categoryFilter === cat
                      ? "text-blue-600"
                      : "text-slate-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
