import { Calendar, Wrench, Sparkles } from "lucide-react";

export default function CustomerHeader({ user }) {
  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Welcome back, {user?.name || "Customer"}! 👋
          </h1>
          <span className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
            <Sparkles className="h-3 w-3 text-blue-600" />
            Verified Customer
          </span>
        </div>
        <p className="mt-1 text-sm text-slate-500">
          Explore on-demand home & commercial services or manage your requests.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-500 shadow-sm sm:flex">
          <Calendar className="h-3.5 w-3.5 text-slate-400" />
          {formattedDate}
        </div>

        <a
          href="#services-catalog"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700"
        >
          <Wrench className="h-3.5 w-3.5" />
          Explore Services
        </a>
      </div>
    </div>
  );
}
