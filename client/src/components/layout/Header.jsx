import { LogOut } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { logout } from '@/features/auth/authSlice'

const navItems = ['Services', 'How It Works', 'About', 'Contact']

export function Header() {
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const dashboardPath = {
    ADMIN: '/business/dashboard',
    CUSTOMER: '/customer/dashboard',
    TECHNICIAN: '/technician/dashboard',
    SUPER_ADMIN: '/admin/dashboard',
  }[user?.role] || '/'

  return (
    <header className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5 lg:px-10">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-slate-900 to-blue-600 text-[10px] font-bold text-white shadow-md shadow-blue-500/20">
          ✦
        </span>
        <span className="text-xl font-bold tracking-[-0.04em] text-slate-900">
          FixPro
        </span>
      </div>

      <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
        {navItems.map((item) => (
          <a
            key={item}
            href="#"
            className="transition hover:text-slate-900"
          >
            {item}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <>
          <Link
            to={dashboardPath}
            className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:brightness-110"
          >
            {user?.name}
          </Link>
          <Button
            onClick={() => dispatch(logout())}
            variant="outline"
            className="h-10 gap-2 border-red-200 bg-white px-4 text-sm font-semibold text-red-600 shadow-sm hover:border-red-300 hover:bg-red-50 hover:text-red-700"
            title="Log out"
          >
            <LogOut aria-hidden="true" />
            Logout
          </Button>
          </>
        ) : (
          <>
            <Link to="/login" className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
              Login
            </Link>
            <Link to="/signup" className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:brightness-110">
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  )
}
