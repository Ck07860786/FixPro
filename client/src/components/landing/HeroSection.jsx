import { Button } from '../ui/button'

export function HeroSection() {
  return (
    <section className="relative z-10 pt-16 pb-8">
      <div className="mx-auto max-w-[760px] text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-[0.7rem] font-medium text-slate-700 shadow-sm backdrop-blur-sm">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
          FixPro v1.0 is now live
        </div>

        <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-slate-900 sm:text-5xl md:text-[4.2rem]">
          Powerful Service
          <br />
          Management for{' '}
          <span className=" mr-2 bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text italic text-transparent p-8">
             Growing 
           Businesses
          </span>
          
        </h1>

        <p className="mx-auto mt-7 max-w-[640px] text-base leading-7 text-slate-500 sm:text-lg sm:leading-8">
          Manage customers, technicians, service requests, scheduling, invoices and
          payments from one powerful, unified platform engineered for the modern
          field service team.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Button className="rounded-xl border-0 bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-6 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:shadow-xl hover:shadow-blue-500/40">
            Start Free →
          </Button>
          <Button
            variant="outline"
            className="rounded-xl border border-slate-200 bg-white/80 px-6 py-6 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur-sm transition hover:bg-white"
          >
            Book a Service
          </Button>
        </div>
      </div>
    </section>
  )
}
