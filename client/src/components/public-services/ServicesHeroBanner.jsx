import { Sparkles, ShieldCheck, CheckCircle2, Clock } from "lucide-react";

export default function ServicesHeroBanner({ totalServices, categoriesCount }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-800 via-blue-700 to-blue-500 p-8 md:p-12 text-white shadow-xl mb-10">
      <div className="absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute left-1/2 -top-16 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative z-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-300 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-blue-400" />
          <span>On-Demand Repair & Maintenance Catalog</span>
        </div>

        <h1 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight text-white">
          Browse All Verified Services
        </h1>

        <p className="mt-3 text-sm md:text-base leading-relaxed text-slate-300 max-w-2xl">
          Transparent flat-rate pricing, background-verified technicians, and guaranteed on-time
          service delivery across every major residential and commercial trade.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300">
          <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3.5 py-2 backdrop-blur-md">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Background Verified</span>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3.5 py-2 backdrop-blur-md">
            <CheckCircle2 className="h-4 w-4 text-blue-400" />
            <span>Upfront Fixed Pricing</span>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-white/10 px-3.5 py-2 backdrop-blur-md">
            <Clock className="h-4 w-4 text-amber-400" />
            <span>Quick 30-Min Response</span>
          </div>

          <div className="ml-auto hidden lg:flex items-center gap-4 border-l border-white/10 pl-6 text-xs">
            <div>
              <span className="block text-lg font-black text-white">{totalServices}+</span>
              <span className="text-[11px] text-slate-400">Total Services</span>
            </div>
            <div>
              <span className="block text-lg font-black text-white">{categoriesCount}</span>
              <span className="text-[11px] text-slate-400">Categories</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
