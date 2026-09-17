import { Wrench, Star, Mail, Phone, MapPin } from "lucide-react";

export default function TechnicianProfileCard({ user, technician }) {
  const skillsList = Array.isArray(technician?.skills)
    ? technician.skills
    : technician?.skills
      ? technician.skills.split(",").map((s) => s.trim())
      : [];

  const address = technician?.address;
  const addressText = [address?.street, address?.city, address?.state, address?.pincode]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-bold text-slate-900">Professional Profile</h2>
        <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-600">
          {technician?.specialization || "Technician"}
        </span>
      </div>

      <div className="space-y-4 text-xs">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Email Address
            </span>
            <p className="mt-0.5 flex items-center gap-1.5 font-medium text-slate-700">
              <Mail className="h-3.5 w-3.5 text-slate-400" />
              {user?.email || "—"}
            </p>
          </div>

          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Phone Number
            </span>
            <p className="mt-0.5 flex items-center gap-1.5 font-medium text-slate-700">
              <Phone className="h-3.5 w-3.5 text-slate-400" />
              {user?.phone || technician?.phone || "Not provided"}
            </p>
          </div>
        </div>

        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Primary Trade
          </span>
          <p className="mt-0.5 flex items-center gap-1.5 font-semibold text-slate-800">
            <Wrench className="h-3.5 w-3.5 text-blue-600" />
            {technician?.specialization || "General Service"}
          </p>
        </div>

        {skillsList.length > 0 && (
          <div>
            <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Registered Skills
            </span>
            <div className="flex flex-wrap gap-1.5">
              {skillsList.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-700"
                >
                  <Star className="h-3 w-3 text-amber-500" />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {addressText && (
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Operating Base / Address
            </span>
            <p className="mt-0.5 flex items-center gap-1.5 text-slate-600">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" />
              {addressText}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
