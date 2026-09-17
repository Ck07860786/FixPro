import { Link } from "react-router-dom";
import {
  Edit3,
  KeyRound,
  Briefcase,
  Calendar,
  ChevronRight,
  Zap,
} from "lucide-react";

const actions = [
  {
    to: "/technician/setting",
    icon: Edit3,
    label: "Edit Profile",
    desc: "Update personal info",
    color: "blue",
  },
  {
    to: "/technician/setting",
    icon: KeyRound,
    label: "Change Password",
    desc: "Update security credentials",
    color: "violet",
  },
  {
    to: "/technician/jobs",
    icon: Briefcase,
    label: "My Jobs",
    desc: "View assigned jobs",
    color: "emerald",
  },
  {
    to: "/technician/schedule",
    icon: Calendar,
    label: "My Schedule",
    desc: "View availability",
    color: "amber",
  },
];

const colorMap = {
  blue: { bg: "bg-blue-50", text: "text-blue-600", hover: "hover:border-blue-200 hover:bg-blue-50/50" },
  violet: { bg: "bg-violet-50", text: "text-violet-600", hover: "hover:border-violet-200 hover:bg-violet-50/50" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-600", hover: "hover:border-emerald-200 hover:bg-emerald-50/50" },
  amber: { bg: "bg-amber-50", text: "text-amber-600", hover: "hover:border-amber-200 hover:bg-amber-50/50" },
};

export default function ProfileQuickActions() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
      <div className="mb-5 flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
          <Zap className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900">Quick Actions</h3>
          <p className="text-[11px] text-slate-500">Shortcuts to manage your account</p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {actions.map((action) => {
          const c = colorMap[action.color];
          return (
            <Link
              key={action.label}
              to={action.to}
              className={`group flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 transition hover:shadow-sm ${c.hover}`}
            >
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${c.bg} ${c.text}`}>
                <action.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-800">{action.label}</p>
                <p className="text-[11px] text-slate-500">{action.desc}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-300 transition group-hover:text-slate-500" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
