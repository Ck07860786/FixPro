export default function ServicesLoadingSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((idx) => (
        <div
          key={idx}
          className="animate-pulse overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs"
        >
          <div className="aspect-16/10 w-full rounded-xl bg-slate-200" />
          <div className="mt-4 h-4 w-1/3 rounded-sm bg-slate-200" />
          <div className="mt-2 h-5 w-3/4 rounded-sm bg-slate-200" />
          <div className="mt-2 h-3 w-full rounded-sm bg-slate-100" />
          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
            <div className="h-5 w-16 rounded-sm bg-slate-200" />
            <div className="h-8 w-24 rounded-lg bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
