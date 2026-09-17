import { Search, SlidersHorizontal, RotateCcw } from "lucide-react";

export default function ServicesFilterBar({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange,
  totalCount,
  onResetFilters,
}) {
  const isFiltered = selectedCategory !== "All" || searchQuery.trim() !== "" || sortOption !== "default";

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs mb-8">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="relative flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by service name, trade or keyword..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 transition focus:bg-white focus:border-blue-500 focus:outline-hidden focus:ring-3 focus:ring-blue-500/10"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-slate-400" />
            <select
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3.5 text-xs font-semibold text-slate-700 transition focus:bg-white focus:border-blue-500 focus:outline-hidden"
            >
              <option value="default">Sort: Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="duration_asc">Duration: Quickest First</option>
            </select>
          </div>

          {isFiltered && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition"
              title="Reset all filters"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => onSelectCategory("All")}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
            selectedCategory === "All"
              ? "bg-blue-600 text-white shadow-xs shadow-blue-500/30"
              : "border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }`}
        >
          All Categories
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => onSelectCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
              selectedCategory === cat
                ? "bg-blue-600 text-white shadow-xs shadow-blue-500/30"
                : "border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            {cat}
          </button>
        ))}

        <div className="ml-auto text-xs font-medium text-slate-400">
          Showing <span className="font-bold text-slate-700">{totalCount}</span> service{totalCount !== 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
}
