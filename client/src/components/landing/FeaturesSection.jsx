const features = [
  {
    icon: '◌',
    color: 'bg-blue-50 text-blue-600',
    title: 'Faster Service Management',
    text: 'Streamline your entire workflow from intake to dispatch with automated routing and report distribution.',
  },
  {
    icon: '◎',
    color: 'bg-emerald-50 text-emerald-600',
    title: 'Real-Time Job Tracking',
    text: 'Monitor field operations live. See technician locations, job statuses, and schedule completion times on a geolocal map.',
  },
  {
    icon: '✦',
    color: 'bg-blue-50 text-blue-600',
    title: 'Smart Technician Assignment',
    text: 'Intelligently match the right technician to the right job based on skill, proximity, and current workload.',
  },
  {
    icon: '▣',
    color: 'bg-indigo-50 text-indigo-600',
    title: 'Professional Invoicing',
    text: 'Generate beautiful, accurate invoices in seconds. Accept payments directly in the field to improve cash flow.',
  },
]

export function FeaturesSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <div className="text-center">
        <h2 className="text-[2.3rem] tracking-[-0.06em] text-slate-900">
          Everything you need to scale
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600">
          A comprehensive suite designed for operational excellence.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {features.map(({ icon, color, title, text }) => (
          <article
            key={title}
            className="rounded-[1.4rem] border border-slate-200 bg-white/70 p-6 shadow-sm"
          >
            <div
              className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-xl shadow-inner ${color}`}
            >
              {icon}
            </div>
            <h3 className="mb-3 text-lg font-bold tracking-[-0.04em] text-slate-900">
              {title}
            </h3>
            <p className="text-sm leading-7 text-slate-600">{text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
