import { Tag, ChevronDown } from "lucide-react";
import { FORM_CATEGORIES } from "./serviceConstants";
export default function CategorySelect({ value, onChange }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-slate-700">
        <span className="flex items-center gap-1.5">
          <Tag className="h-3.5 w-3.5 text-slate-400" />
          Category *
        </span>
      </label>
      <div className="relative">
        <select
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 pr-9 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        >
          <option value="" disabled>
            Select a category
          </option>
          {FORM_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>
    </div>
  );
}
