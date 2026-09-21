import { useSelector } from "react-redux";
import { Clock, Play, CheckCircle2, AlertTriangle, Briefcase, CircleDot } from "lucide-react";
import {
    AVAILABILITY_COLORS,
    AVAILABILITY_DOT,
} from "@/components/technicians-management/technicianConstants";

export default function TechnicianMetrics({ technician }) {
    const { requests } = useSelector((state) => state.serviceRequests);

    const rawAvailability = technician?.availabilityStatus || "AVAILABLE";
    const currentStatus = rawAvailability === "ONLINE" ? "AVAILABLE" : rawAvailability;

    const activeCount = requests.filter(
        (r) => r.status === "CONFIRMED" || r.status === "PENDING"
    ).length;

    const inProgressCount = requests.filter(
        (r) => r.status === "IN_PROGRESS"
    ).length;

    const completedCount = requests.filter(
        (r) => r.status === "COMPLETED"
    ).length;

    const issuesCount = requests.filter(
        (r) => r.status === "ON_HOLD" || r.issueReported
    ).length;

    const cards = [
        {
            label: "Ready to Start",
            value: activeCount,
            subtitle: "Assigned pending jobs",
            icon: Clock,
            color: "bg-blue-50 text-blue-600",
        },
        {
            label: "In Progress",
            value: inProgressCount,
            subtitle: "Currently on-site jobs",
            icon: Play,
            color: "bg-indigo-50 text-indigo-600",
        },
        {
            label: "Completed",
            value: completedCount,
            subtitle: "Successfully finished",
            icon: CheckCircle2,
            color: "bg-emerald-50 text-emerald-600",
        },
        {
            label: "Issues / Hold",
            value: issuesCount,
            subtitle: issuesCount > 0 ? "Requires coordinator attention" : "No blockers reported",
            icon: AlertTriangle,
            color: issuesCount > 0 ? "bg-rose-50 text-rose-600" : "bg-slate-50 text-slate-400",
        },
    ];

    return (
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((stat) => (
                <div
                    key={stat.label}
                    className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:shadow-md"
                >
                    <div className="mb-3 flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-500">
                            {stat.label}
                        </span>
                        <span
                            className={`flex h-8 w-8 items-center justify-center rounded-xl ${stat.color}`}
                        >
                            <stat.icon className="h-4 w-4" />
                        </span>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                        <p className="mt-1 text-[11px] text-slate-400">{stat.subtitle}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
