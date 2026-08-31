const jobs = [
  ['#F-230', 'Air-Conditioning Repair', 'Austin, TX', 'Sam', 'Pending'],
  ['#F-220', 'Microwave Repair', 'San Jose, CA', 'John', 'In Progress'],
  ['#F-210', 'Washer Repair', 'Dallas, TX', 'Milo', 'Scheduled'],
  ['#F-200', 'Water Heater Fix', 'Chicago, IL', 'Suzie', 'Pending'],
  ['#F-190', 'Plumbing Repair', 'NY, NY', 'Sara', 'In Progress'],
  ['#F-180', 'Plumbing Repair', 'All Citi St', 'Bob', 'Scheduled'],
]

const priorities = ['Med', 'Hi', 'Med', 'Med', 'Hi', 'Med']

export function DashboardPreview() {
  return (
    <section className="relative z-20 mx-auto mt-10 max-w-[1050px] overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white/90 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-sm">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 bg-slate-50/80 px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br from-slate-800 to-blue-600 text-[8px] font-bold text-white">
            ✦
          </span>
          <span className="text-[12px]">FixPro</span>
          <span className="text-[10px] font-normal text-slate-400">Management</span>
        </div>

        <div className="hidden items-center gap-5 text-[11px] text-slate-500 md:flex">
          <span className="font-semibold text-slate-800">Home</span>
          <span>Jobs</span>
          <span>Schedule</span>
          <span>Technicians</span>
          <span>Reports</span>
          <span>Settings</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden text-[10px] text-slate-400 md:block">
            Technicians:{' '}
            <span className="font-semibold text-slate-700">8</span>
          </span>
          <span className="hidden text-[10px] text-slate-400 md:block">
            Efficiency:{' '}
            <span className="font-semibold text-slate-700">89%</span>
          </span>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-sky-200 text-xs font-bold text-slate-700">
            B
          </div>
        </div>
      </div>

      {/* Sub nav */}
      <div className="border-b border-slate-100 bg-white px-4 py-2">
        <div className="flex items-center gap-1 text-[10px] text-slate-400">
          <span className="font-semibold text-blue-600">Home</span>
          <span>/</span>
          <span>Overview</span>
        </div>
      </div>

      <div className="grid gap-4 p-4 lg:grid-cols-[2.2fr_1fr]">
        {/* Left: Jobs table */}
        <div className="rounded-2xl bg-white p-3 shadow-sm ring-1 ring-slate-200/80">
          <div className="mb-3 flex items-center justify-between px-2 pt-1">
            <h3 className="text-sm font-bold text-slate-800">Active Jobs</h3>
            <a href="#" className="text-xs font-semibold text-blue-600">
              View All
            </a>
          </div>

          <div className="space-y-1.5">
            <div className="grid grid-cols-[0.7fr_1.3fr_0.9fr_0.7fr_0.5fr_0.8fr] gap-2 px-2 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              <span>Job ID</span>
              <span>Issue</span>
              <span>Location</span>
              <span>Technician</span>
              <span>Priority</span>
              <span>Status</span>
            </div>

            {jobs.map(([id, issue, location, tech, status], index) => (
              <div
                key={index}
                className="grid grid-cols-[0.7fr_1.3fr_0.9fr_0.7fr_0.5fr_0.8fr] items-center gap-2 rounded-xl bg-slate-50/80 px-2 py-2 text-[10px] text-slate-600"
              >
                <span className="font-medium text-slate-700">{id}</span>
                <span>{issue}</span>
                <span>{location}</span>
                <span>{tech}</span>
                <span
                  className={`text-[9px] ${
                    priorities[index] === 'Hi'
                      ? 'font-semibold text-rose-500'
                      : 'text-slate-400'
                  }`}
                >
                  {priorities[index]}
                </span>
                <span
                  className={`inline-flex w-fit items-center justify-center rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                    status === 'Pending'
                      ? 'bg-amber-100 text-amber-700'
                      : status === 'In Progress'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-3 rounded-2xl bg-slate-50 p-3 shadow-inner ring-1 ring-slate-200/80">
          {/* Schedule card */}
          <div className="rounded-xl bg-white p-3">
            <div className="mb-3 flex items-center justify-between text-[11px] font-semibold text-slate-700">
              <span>Schedule</span>
              <span className="cursor-pointer text-slate-400">‹</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-[9px] text-slate-500">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <span
                  key={day}
                  className="rounded-md bg-slate-50 px-1 py-2 text-center font-medium"
                >
                  {day}
                </span>
              ))}
            </div>
          </div>

          {/* Technician Status card */}
          <div className="rounded-xl bg-white p-3">
            <div className="mb-3 text-[11px] font-semibold text-slate-700">
              Technician Status
            </div>
            <div className="space-y-2.5 text-[10px] text-slate-600">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-200 to-blue-300" />
                  <span className="font-medium text-slate-700">John D.</span>
                </div>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-600">
                  Available
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-200 to-purple-300" />
                  <span className="font-medium text-slate-700">David L.</span>
                </div>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-semibold text-slate-500">
                  On site
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-amber-200 to-amber-300" />
                  <span className="font-medium text-slate-700">Sarah C.</span>
                </div>
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-600">
                  Available
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom stats bar */}
      <div className="flex items-center justify-between border-t border-slate-200 bg-white px-5 py-3">
        <div className="flex items-center gap-8">
          <div className="text-left">
            <div className="text-[9px] font-medium uppercase tracking-wider text-slate-400">
              Active Jobs
            </div>
            <div className="text-lg font-bold text-slate-800">14</div>
          </div>
          <div className="text-left">
            <div className="text-[9px] font-medium uppercase tracking-wider text-slate-400">
              Pending
            </div>
            <div className="text-lg font-bold text-slate-800">5</div>
          </div>
          <div className="text-left">
            <div className="text-[9px] font-medium uppercase tracking-wider text-slate-400">
              Revenue
            </div>
            <div className="text-lg font-bold text-slate-800">$14,900</div>
          </div>
          <div className="text-left">
            <div className="text-[9px] font-medium uppercase tracking-wider text-slate-400">
              Efficiency
            </div>
            <div className="flex items-center gap-2">
              <div className="text-lg font-bold text-slate-800">92%</div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-lg bg-blue-600 px-3 py-1.5 text-[10px] font-semibold text-white shadow-sm transition hover:bg-blue-700">
            New Ticket ▸
          </button>
          <button className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-[10px] font-semibold text-slate-500 shadow-sm">
            ▸
          </button>
        </div>
      </div>
    </section>
  )
}
