export function Footer() {
  return (
    <footer className="mx-auto mt-12 max-w-7xl border-t border-slate-200 px-6 pb-12 pt-10 lg:px-10">
      <div className="grid gap-10 md:grid-cols-[1.6fr_1fr]">
        <div>
          <div className="flex items-center gap-2 text-slate-900">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-slate-900 to-blue-600 text-[10px] font-bold text-white">
              ✦
            </span>
            <span className="text-[1.7rem] font-bold tracking-[-0.06em]">FixPro</span>
          </div>

          <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
            Engineered for field service excellence. Streamline operations and scale your service
            business with absolute control.
          </p>
        </div>

        <div className="flex flex-col gap-8 sm:flex-row sm:justify-end sm:gap-14">
          <div>
            <h4 className="mb-3 text-sm font-bold text-slate-900">Legal</h4>
            <div className="space-y-2 text-sm text-slate-600">
              <a href="#" className="block">Privacy Policy</a>
              <a href="#" className="block">Terms of Service</a>
              <a href="#" className="block">Cookie Settings</a>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold text-slate-900">Company</h4>
            <div className="space-y-2 text-sm text-slate-600">
              <a href="#" className="block">Global Support</a>
              <a href="#" className="block">About Us</a>
              <a href="#" className="block">Contact Sales</a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-slate-200 pt-5 text-sm text-slate-500">
        © 2024 FixPro Field Service Management. All rights reserved.
      </div>
    </footer>
  )
}
