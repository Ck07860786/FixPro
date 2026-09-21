import React from "react";
import { useSelector } from "react-redux";
import TechnicianJobsView from "@/components/technician-dashboard/TechnicianJobsView";
import { ClipboardList, Sparkles } from "lucide-react";

export default function MyJobs() {
    const { user, technician } = useSelector((state) => state.auth);

    return (
        <div className="p-6 lg:p-8 space-y-6">
            <div>
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                        My Field Assignments
                    </h1>
                    <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700">
                        {technician?.specialization || "Technician"}
                    </span>
                </div>
                <p className="mt-1 text-sm text-slate-500">
                    Track your active service calls, update work progress, and report job issues in real-time.
                </p>
            </div>

            <TechnicianJobsView isFullPage={true} />
        </div>
    );
}