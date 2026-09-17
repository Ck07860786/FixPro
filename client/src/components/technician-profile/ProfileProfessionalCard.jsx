import { Wrench, Star, Clock, Sparkles, Briefcase } from "lucide-react";

export default function ProfileProfessionalCard({ technician }) {

  const skillsList = Array.isArray(technician?.skills)
    ? technician.skills
    : technician?.skills
      ? technician.skills.split(",").map((s) => s.trim())
      : [];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">

      <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
            <Wrench className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Professional Details</h3>
            <p className="text-[11px] text-slate-500">Trade & expertise</p>
          </div>
        </div>
        {technician?.specialization && (
          <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-violet-50 px-3 py-1 text-[11px] font-semibold text-violet-700 border border-violet-200/60">
            <Sparkles className="h-3.5 w-3.5" />
            {technician.specialization}
          </span>
        )}
      </div>


      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-slate-50/70 border border-slate-100 p-4">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Specialization
          </span>
          <p className="mt-1.5 flex items-center gap-2 text-sm font-bold text-slate-800">
            <Wrench className="h-4 w-4 text-blue-600" />
            {technician?.specialization || "General Service"}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50/70 border border-slate-100 p-4">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Experience
          </span>
          <p className="mt-1.5 flex items-center gap-2 text-sm font-bold text-slate-800">
            <Clock className="h-4 w-4 text-amber-600" />
            {technician?.experienceYears != null
              ? `${technician.experienceYears} Year${Number(technician.experienceYears) !== 1 ? "s" : ""}`
              : "Not specified"}
          </p>
        </div>
      </div>


      {technician?.employmentType && (
        <div className="mt-4 rounded-xl bg-slate-50/70 border border-slate-100 p-4">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Employment Type
          </span>
          <p className="mt-1.5 flex items-center gap-2 text-sm font-semibold text-slate-800">
            <Briefcase className="h-4 w-4 text-emerald-600" />
            {technician.employmentType.replace("_", " ")}
          </p>
        </div>
      )}


      {skillsList.length > 0 && (
        <div className="mt-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Skills
            </span>
            <span className="text-[11px] font-semibold text-slate-500">
              {skillsList.length} skill{skillsList.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {skillsList.map((skill, i) => (
              <span
                key={`${skill}-${i}`}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-xs transition hover:border-blue-200 hover:bg-blue-50/50"
              >
                <Star className="h-3 w-3 text-amber-500" />
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
