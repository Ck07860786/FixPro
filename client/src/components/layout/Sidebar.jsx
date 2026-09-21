import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  LayoutDashboard,
  ClipboardList,
  Wrench,
  Users,
  BarChart3,
  Settings,
  PlusCircle,
  FileText,
  User,
  HelpCircle,
  LogOut,
  Plus,
  ShieldCheck,
  Toolbox,
  CalendarDays,
  KeyIcon,
} from "lucide-react";

import { logout } from "@/features/auth/authSlice";

const adminNav = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/business/dashboard" },
  { label: "Service Requests", icon: ClipboardList, to: "/business/service-requests" },
  { label: "Technicians", icon: Wrench, to: "/business/technicians" },
  { label: "Customers", icon: Users, to: "/business/customers" },
  { label: "Services", icon: Toolbox, to: "/business/services" },
  { label: "Settings", icon: Settings, to: "/business/settings" },
];

const customerNav = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/customer/dashboard" },
  { label: "Book Service", icon: PlusCircle, to: "/customer/book-service" },
  { label: "My Requests", icon: ClipboardList, to: "/customer/requests" },
  { label: "Invoices", icon: FileText, to: "/customer/invoices" },
  { label: "Profile", icon: User, to: "/customer/profile" },
];

const technicianNav = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/technician/dashboard" },
  { label: "My Jobs", icon: ClipboardList, to: "/technician/jobs" },
  { label: "Schedule", icon: CalendarDays, to: "/technician/schedule" },
  { label: "Profile", icon: User, to: "/technician/profile" },
  { label: "Setting", icon: Settings, to: "/technician/setting" },

];

export default function Sidebar({ role }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAdmin = role === "ADMIN" || role === "SUPER_ADMIN";
  const isTechnician = role === "TECHNICIAN";

  const navItems = isAdmin
    ? adminNav
    : isTechnician
      ? technicianNav
      : customerNav;

  const subtitle = isAdmin
    ? "Admin Console"
    : isTechnician
      ? "Technician Portal"
      : "Customer Portal";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <aside className="flex h-screen w-[200px] shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="flex items-center gap-2.5 px-5 pt-6 pb-5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white">
          F
        </span>
        <div>
          <div className="text-sm font-bold text-slate-900">FixPro</div>
          <div className="text-[10px] text-slate-400">{subtitle}</div>
        </div>
      </div>
      {isAdmin && (
        <div className="px-4 pb-4">
          <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700">
            <Plus className="h-3.5 w-3.5" />
            New Request
          </button>
        </div>
      )}
      <nav className="flex-1 space-y-0.5 px-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition ${isActive
                ? "bg-blue-50 text-blue-600"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="space-y-0.5 border-t border-slate-100 px-3 py-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">
          <HelpCircle className="h-4 w-4" />
          Support
        </button>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium text-slate-600 transition hover:bg-slate-50 hover:text-red-600"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
