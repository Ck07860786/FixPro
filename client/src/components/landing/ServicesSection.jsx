const services = [
  {
    title: 'AC Repair',
    desc: 'Diagnostics, maintenance, and emergency repair for commerci...',
    image: 'https://5.imimg.com/data5/SELLER/Default/2022/5/DC/QE/KU/4245602/split-ac-repairing-service.jpeg',
  },
  {
    title: 'Refrigerator Repair',
    desc: 'Compressor fixes, leak sealing, and thermostat replacements.',
    image: 'https://serviceninjas.in/wp-content/uploads/2021/11/33.jpeg',
  },
  {
    title: 'Washing Machine',
    desc: 'Drum alignments, motor replacements, and drainage...',
    image: 'https://mumbaihomeappliancesservicecentre24x7.com/wp-content/uploads/2024/01/Washing-Machine-Repair.webp',
  },
]

export function ServicesSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
      <div className="grid items-start gap-10 lg:grid-cols-[1fr_2.4fr]">
        {/* Left: Header */}
        <div className="pt-2">
          <h2 className="text-[1.9rem]  leading-tight tracking-[-0.04em] text-slate-900">
            Comprehensive Repair Services
          </h2>
          <p className="mt-4 max-w-sm text-[0.92rem] leading-7 text-slate-500">
            Manage a diverse range of service catalogs with custom pricing, estimated
            durations, and specific required skills.
          </p>
          <a
            href="#"
            className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            View all supported services
            <span className="ml-1">→</span>
          </a>
        </div>

        {/* Right: Service cards */}
        <div className="grid gap-5 sm:grid-cols-3">
          {services.map(({ title, desc, image }) => (
            <article
              key={title}
              className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200/60"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="px-4 pb-5 pt-4 ">
                <h3 className="text-[0.95rem] font-bold tracking-[-0.02em] text-slate-900">
                  {title}
                </h3>
                <p className="mt-1.5 text-[0.82rem] leading-relaxed text-slate-500">
                  {desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
