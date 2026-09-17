
export default function TechnicianStats({ totalCount, activeCount, availableCount }) {
  return (
    <div className="mb-6 grid grid-cols-3 gap-4">
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="mb-1 text-[11px] font-medium text-slate-500">
          Total Technicians
        </div>
        <div className="text-2xl font-bold text-slate-900">{totalCount}</div>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="mb-1 text-[11px] font-medium text-slate-500">
          Active
        </div>
        <div className="text-2xl font-bold text-emerald-600">
          {activeCount}
        </div>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="mb-1 text-[11px] font-medium text-slate-500">
          Available Now
        </div>
        <div className="text-2xl font-bold text-blue-600">
          {availableCount}
        </div>
      </div>
    </div>
  );
}
