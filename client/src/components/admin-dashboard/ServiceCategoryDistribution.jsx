import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Wrench } from "lucide-react";

const CATEGORY_COLORS = [
  "bg-blue-500 text-blue-600",
  "bg-emerald-500 text-emerald-600",
  "bg-indigo-500 text-indigo-600",
  "bg-amber-500 text-amber-600",
  "bg-purple-500 text-purple-600",
  "bg-rose-500 text-rose-600",
  "bg-cyan-500 text-cyan-600",
];

export default function ServiceCategoryDistribution({ services = [] }) {
  const categoryStats = useMemo(() => {
    if (!services.length) return [];

    const map = {};
    services.forEach((s) => {
      const cat = s.category || "Uncategorized";
      map[cat] = (map[cat] || 0) + 1;
    });

    const total = services.length;
    return Object.entries(map)
      .map(([category, count], idx) => ({
        category,
        count,
        percentage: Math.round((count / total) * 100),
        color: CATEGORY_COLORS[idx % CATEGORY_COLORS.length],
      }))
      .sort((a, b) => b.count - a.count);
  }, [services]);

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Services by Category
            </h2>
            <p className="text-xs text-slate-400">
              Distribution across service offerings
            </p>
          </div>
          <Link
            to="/business/services"
            className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            Catalog <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>

        {services.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
              <Wrench className="h-5 w-5" />
            </div>
            <p className="text-xs font-medium text-slate-600">No services listed yet</p>
            <Link
              to="/business/services"
              className="mt-2 text-xs font-semibold text-blue-600 hover:underline"
            >
              List your first service
            </Link>
          </div>
        ) : (
          <div className="space-y-3.5">
            {categoryStats.slice(0, 5).map((item) => (
              <div key={item.category} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">
                    {item.category}
                  </span>
                  <span className="text-slate-500">
                    {item.count} service{item.count !== 1 ? "s" : ""} ({item.percentage}%)
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${item.color.split(" ")[0]}`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-[11px] text-slate-500">
        Active Categories: <span className="font-bold text-slate-800">{categoryStats.length} domains</span>
      </div>
    </div>
  );
}
