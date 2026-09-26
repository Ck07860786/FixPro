import { Users, Mail, Phone } from "lucide-react";

const roleStyles = {
  CUSTOMER: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  ADMIN: { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200" },
  TECHNICIAN: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  SUPER_ADMIN: { bg: "bg-fuchsia-50", text: "text-fuchsia-700", border: "border-fuchsia-200" },
};

export default function RecentUsers({ users }) {
  if (!users || users.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50">
            <Users className="h-4.5 w-4.5 text-blue-600" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">Recent Users</h3>
        </div>
        <div className="flex h-32 items-center justify-center rounded-xl bg-slate-50">
          <p className="text-sm text-slate-400">No users found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50">
            <Users className="h-4.5 w-4.5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800">Recent Users</h3>
            <p className="text-[11px] text-slate-400">Latest registered users</p>
          </div>
        </div>
      </div>

      <div className="space-y-2.5 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
        {users.map((user) => {
          const style = roleStyles[user.role] || roleStyles.CUSTOMER;
          return (
            <div
              key={user._id}
              className="group flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/50 px-4 py-3 transition-all duration-200 hover:border-slate-200 hover:bg-white hover:shadow-sm"
            >
              {/* Avatar */}
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-200 to-slate-300 text-xs font-bold text-slate-600">
                {user.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-800 truncate">
                    {user.name}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${style.bg} ${style.text} ${style.border}`}
                  >
                    {user.role?.replace("_", " ")}
                  </span>
                  {!user.isActive && (
                    <span className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-600">
                      Inactive
                    </span>
                  )}
                </div>
                <div className="mt-1 flex items-center gap-3">
                  <span className="flex items-center gap-1 text-[11px] text-slate-500 truncate">
                    <Mail className="h-3 w-3 text-slate-400" />
                    {user.email}
                  </span>
                  {user.phone && (
                    <span className="hidden sm:flex items-center gap-1 text-[11px] text-slate-500">
                      <Phone className="h-3 w-3 text-slate-400" />
                      {user.phone}
                    </span>
                  )}
                </div>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-[10px] text-slate-400">
                  {new Date(user.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
