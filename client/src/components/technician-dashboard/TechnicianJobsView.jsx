import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchTechnicianRequests,
    changeRequestStatus,
} from "@/features/serviceRequests/serviceRequestSlice";
import { updateTechnicianAvailability } from "@/features/auth/authSlice";
import {
    ClipboardList,
    CheckCircle2,
    Play,
    AlertTriangle,
    Clock,
    MapPin,
    Phone,
    User,
    Check,
    Loader2,
    Search,
    X,
    FileText,
    MessageSquare,
    AlertCircle,
    ChevronDown,
    Calendar,
    RefreshCw,
} from "lucide-react";

const STATUS_BADGES = {
    PENDING: {
        bg: "bg-amber-50 text-amber-700 border-amber-200",
        dot: "bg-amber-500",
        label: "Assigned / Pending",
    },
    CONFIRMED: {
        bg: "bg-blue-50 text-blue-700 border-blue-200",
        dot: "bg-blue-500",
        label: "Confirmed",
    },
    IN_PROGRESS: {
        bg: "bg-indigo-50 text-indigo-700 border-indigo-200",
        dot: "bg-indigo-500",
        label: "Work in Progress",
    },
    COMPLETED: {
        bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
        dot: "bg-emerald-500",
        label: "Completed",
    },
    ON_HOLD: {
        bg: "bg-rose-50 text-rose-700 border-rose-200",
        dot: "bg-rose-500",
        label: "On Hold / Issue",
    },
    CANCELLED: {
        bg: "bg-slate-100 text-slate-500 border-slate-200",
        dot: "bg-slate-400",
        label: "Cancelled",
    },
};

export default function TechnicianJobsView({ isFullPage = false }) {
    const dispatch = useDispatch();
    const { requests, loading, error } = useSelector((state) => state.serviceRequests);

    const [filterTab, setFilterTab] = useState("ALL");
    const [searchQuery, setSearchQuery] = useState("");
    const [statusModalReq, setStatusModalReq] = useState(null);
    const [newStatus, setNewStatus] = useState("");
    const [technicianNotes, setTechnicianNotes] = useState("");
    const [issueReported, setIssueReported] = useState(false);
    const [issueDescription, setIssueDescription] = useState("");
    const [actionLoadingId, setActionLoadingId] = useState(null);
    const [modalSubmitting, setModalSubmitting] = useState(false);

    useEffect(() => {
        dispatch(fetchTechnicianRequests());
    }, [dispatch]);

    const handleRefresh = () => {
        dispatch(fetchTechnicianRequests());
    };

    const filteredJobs = useMemo(() => {
        let list = requests || [];

        if (filterTab === "ACTIVE") {
            list = list.filter((r) => r.status === "CONFIRMED" || r.status === "PENDING");
        } else if (filterTab === "IN_PROGRESS") {
            list = list.filter((r) => r.status === "IN_PROGRESS");
        } else if (filterTab === "COMPLETED") {
            list = list.filter((r) => r.status === "COMPLETED");
        } else if (filterTab === "ISSUES") {
            list = list.filter((r) => r.status === "ON_HOLD" || r.issueReported);
        }

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase().trim();
            list = list.filter((r) => {
                const sName = (r.serviceId?.name || "").toLowerCase();
                const cName = (r.customerId?.name || "").toLowerCase();
                const city = (r.customerAddress?.city || "").toLowerCase();
                const phone = (r.customerId?.phone || "").toLowerCase();
                return sName.includes(q) || cName.includes(q) || city.includes(q) || phone.includes(q);
            });
        }

        return list;
    }, [requests, filterTab, searchQuery]);

    const handleStartWork = async (job) => {
        setActionLoadingId(job._id);
        try {
            await dispatch(
                changeRequestStatus({
                    id: job._id,
                    data: { status: "IN_PROGRESS" },
                })
            ).unwrap();
            dispatch(updateTechnicianAvailability("ON_SITE"));
        } catch (err) {
            console.error("Failed to start work:", err);
        } finally {
            setActionLoadingId(null);
        }
    };

    const handleQuickComplete = async (job) => {
        setActionLoadingId(job._id);
        try {
            await dispatch(
                changeRequestStatus({
                    id: job._id,
                    data: { status: "COMPLETED" },
                })
            ).unwrap();
            dispatch(updateTechnicianAvailability("AVAILABLE"));
        } catch (err) {
            console.error("Failed to complete work:", err);
        } finally {
            setActionLoadingId(null);
        }
    };

    const openStatusModal = (job) => {
        setStatusModalReq(job);
        setNewStatus(job.status || "IN_PROGRESS");
        setTechnicianNotes(job.technicianNotes || "");
        setIssueReported(job.issueReported || job.status === "ON_HOLD");
        setIssueDescription(job.issueDescription || "");
    };

    const handleSubmitStatusModal = async (e) => {
        e.preventDefault();
        if (!statusModalReq || !newStatus) return;

        setModalSubmitting(true);
        try {
            await dispatch(
                changeRequestStatus({
                    id: statusModalReq._id,
                    data: {
                        status: newStatus,
                        technicianNotes: technicianNotes.trim(),
                        issueReported: issueReported || newStatus === "ON_HOLD",
                        issueDescription: issueReported || newStatus === "ON_HOLD" ? issueDescription.trim() : "",
                    },
                })
            ).unwrap();

            if (newStatus === "IN_PROGRESS") {
                dispatch(updateTechnicianAvailability("ON_SITE"));
            } else if (newStatus === "COMPLETED") {
                dispatch(updateTechnicianAvailability("AVAILABLE"));
            }

            setStatusModalReq(null);
        } catch (err) {
            console.error("Failed to update status:", err);
        } finally {
            setModalSubmitting(false);
        }
    };

    const counts = useMemo(() => {
        const total = requests.length;
        const active = requests.filter((r) => r.status === "CONFIRMED" || r.status === "PENDING").length;
        const inProgress = requests.filter((r) => r.status === "IN_PROGRESS").length;
        const completed = requests.filter((r) => r.status === "COMPLETED").length;
        const issues = requests.filter((r) => r.status === "ON_HOLD" || r.issueReported).length;
        return { total, active, inProgress, completed, issues };
    }, [requests]);

    return (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-base font-bold text-slate-900 md:text-lg">
                            Assigned Service Jobs
                        </h2>
                        <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-700">
                            {counts.total} Total
                        </span>
                    </div>
                    <p className="mt-0.5 text-xs text-slate-500">
                        Jobs assigned to you by your dispatch coordinator. Update statuses and notes as you work.
                    </p>
                </div>

                <button
                    onClick={handleRefresh}
                    disabled={loading}
                    className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 transition"
                    title="Refresh tickets"
                >
                    <RefreshCw className={`h-3.5 w-3.5 text-slate-500 ${loading ? "animate-spin" : ""}`} />
                    Refresh
                </button>
            </div>

            {error && (
                <div className="mb-4 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-xs text-rose-700">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-wrap gap-1.5 text-xs">
                    {[
                        { key: "ALL", label: "All Jobs", count: counts.total },
                        { key: "ACTIVE", label: "Ready to Start", count: counts.active },
                        { key: "IN_PROGRESS", label: "In Progress", count: counts.inProgress },
                        { key: "COMPLETED", label: "Completed", count: counts.completed },
                        { key: "ISSUES", label: "Issues / Hold", count: counts.issues },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setFilterTab(tab.key)}
                            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-semibold transition ${filterTab === tab.key
                                ? "bg-slate-900 text-white shadow-xs"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                }`}
                        >
                            <span>{tab.label}</span>
                            <span
                                className={`rounded-full px-1.5 py-0.2 text-[10px] ${filterTab === tab.key
                                    ? "bg-white/20 text-white"
                                    : "bg-slate-200 text-slate-700"
                                    }`}
                            >
                                {tab.count}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="relative min-w-[240px]">
                    <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search service, customer, city..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-8 pr-7 py-1.5 text-xs outline-none focus:border-blue-500 focus:bg-white"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    )}
                </div>
            </div>

            {loading && requests.length === 0 ? (
                <div className="flex items-center justify-center py-16">
                    <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                </div>
            ) : filteredJobs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                        <ClipboardList className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-semibold text-slate-800">
                        {searchQuery
                            ? "No jobs match your search"
                            : filterTab !== "ALL"
                                ? `No ${filterTab.toLowerCase().replace("_", " ")} jobs found`
                                : "No tickets assigned yet"}
                    </p>
                    <p className="mt-1 max-w-sm text-xs text-slate-400">
                        {searchQuery
                            ? "Try searching with a different customer name or keyword."
                            : "New field tickets assigned to you by your dispatch team will appear here in real time."}
                    </p>
                </div>
            ) : (
                <div className="space-y-3.5">
                    {filteredJobs.map((job) => {
                        const badge = STATUS_BADGES[job.status] || STATUS_BADGES.PENDING;
                        const isActionLoading = actionLoadingId === job._id;
                        const addr = job.customerAddress;
                        const addressStr = [addr?.street, addr?.city, addr?.state, addr?.pincode]
                            .filter(Boolean)
                            .join(", ");

                        return (
                            <div
                                key={job._id}
                                className={`rounded-2xl border p-4 transition-all hover:shadow-sm ${job.status === "IN_PROGRESS"
                                    ? "border-indigo-200 bg-indigo-50/20"
                                    : job.status === "ON_HOLD"
                                        ? "border-rose-200 bg-rose-50/20"
                                        : "border-slate-200 bg-white"
                                    }`}
                            >
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                    <div className="space-y-1.5 flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h3 className="text-sm font-bold text-slate-900">
                                                {job.serviceId?.name || "Service Request"}
                                            </h3>
                                            {job.serviceId?.category && (
                                                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
                                                    {job.serviceId.category}
                                                </span>
                                            )}
                                            <span
                                                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${badge.bg}`}
                                            >
                                                <span className={`h-1.5 w-1.5 rounded-full ${badge.dot}`} />
                                                {badge.label}
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                                            <span className="flex items-center gap-1 font-medium text-slate-700">
                                                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                                                {job.scheduledDate
                                                    ? new Date(job.scheduledDate).toLocaleDateString("en-IN", {
                                                        weekday: "short",
                                                        day: "numeric",
                                                        month: "short",
                                                        year: "numeric",
                                                    })
                                                    : "Date not set"}
                                            </span>

                                            {job.scheduledTimeSlot && (
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                                                    {job.scheduledTimeSlot}
                                                </span>
                                            )}

                                            {job.totalAmount > 0 && (
                                                <span className="font-semibold text-emerald-600">
                                                    ₹{job.totalAmount}
                                                </span>
                                            )}
                                        </div>

                                        <div className="mt-2 rounded-xl bg-slate-50/80 p-2.5 text-xs space-y-1">
                                            <div className="flex flex-wrap items-center justify-between gap-2">
                                                <div className="flex items-center gap-1.5 font-medium text-slate-800">
                                                    <User className="h-3.5 w-3.5 text-slate-400" />
                                                    <span>{job.customerId?.name || "Customer"}</span>
                                                </div>
                                                {job.customerId?.phone && (
                                                    <a
                                                        href={`tel:${job.customerId.phone}`}
                                                        className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:underline"
                                                    >
                                                        <Phone className="h-3 w-3" />
                                                        {job.customerId.phone}
                                                    </a>
                                                )}
                                            </div>

                                            {addressStr && (
                                                <div className="flex items-start gap-1.5 text-slate-600 text-[11px]">
                                                    <MapPin className="h-3.5 w-3.5 text-slate-400 mt-0.5 shrink-0" />
                                                    <span>{addressStr}</span>
                                                </div>
                                            )}

                                            {job.customerNotes && (
                                                <div className="pt-1 text-[11px] text-slate-500 italic">
                                                    Note: "{job.customerNotes}"
                                                </div>
                                            )}
                                        </div>

                                        {(job.issueReported || job.status === "ON_HOLD") && (
                                            <div className="mt-2 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-2 text-xs text-rose-800">
                                                <AlertTriangle className="h-4 w-4 text-rose-600 mt-0.5 shrink-0" />
                                                <div>
                                                    <p className="font-bold">Issue Reported</p>
                                                    <p className="text-[11px] text-rose-700">
                                                        {job.issueDescription || job.cancellationReason || "Field issue reported on this job."}
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {job.technicianNotes && (
                                            <div className="mt-1 flex items-start gap-1.5 text-[11px] text-slate-600">
                                                <MessageSquare className="h-3.5 w-3.5 text-slate-400 mt-0.5 shrink-0" />
                                                <span>
                                                    <strong className="font-semibold text-slate-700">Your notes:</strong>{" "}
                                                    {job.technicianNotes}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 shrink-0 pt-2 sm:pt-0">
                                        {job.status === "CONFIRMED" || job.status === "PENDING" ? (
                                            <button
                                                type="button"
                                                onClick={() => handleStartWork(job)}
                                                disabled={isActionLoading}
                                                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-50 transition"
                                            >
                                                {isActionLoading ? (
                                                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                                ) : (
                                                    <Play className="h-3.5 w-3.5 fill-current" />
                                                )}
                                                Start Work
                                            </button>
                                        ) : job.status === "IN_PROGRESS" ? (
                                            <button
                                                type="button"
                                                onClick={() => handleQuickComplete(job)}
                                                disabled={isActionLoading}
                                                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 disabled:opacity-50 transition"
                                            >
                                                {isActionLoading ? (
                                                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                                ) : (
                                                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                                                )}
                                                Complete Job
                                            </button>
                                        ) : null}

                                        {job.status !== "CANCELLED" && (
                                            <button
                                                type="button"
                                                onClick={() => openStatusModal(job)}
                                                className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                                            >
                                                <FileText className="h-3.5 w-3.5 text-slate-500" />
                                                Update / Issue
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {statusModalReq && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
                    <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
                        <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                            <div>
                                <h3 className="text-base font-bold text-slate-900">
                                    Update Job Status & Notes
                                </h3>
                                <p className="text-xs text-slate-500">
                                    {statusModalReq.serviceId?.name || "Service Job"} • {statusModalReq.customerId?.name}
                                </p>
                            </div>
                            <button
                                onClick={() => setStatusModalReq(null)}
                                className="rounded-lg p-1 text-slate-400 hover:text-slate-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmitStatusModal} className="mt-4 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">
                                    Status
                                </label>
                                <select
                                    value={newStatus}
                                    onChange={(e) => {
                                        setNewStatus(e.target.value);
                                        if (e.target.value === "ON_HOLD") {
                                            setIssueReported(true);
                                        }
                                    }}
                                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs outline-none focus:border-blue-500"
                                >
                                    <option value="CONFIRMED">Confirmed / Scheduled</option>
                                    <option value="IN_PROGRESS">Work in Progress (On Site)</option>
                                    <option value="COMPLETED">Completed Successfully</option>
                                    <option value="ON_HOLD">On Hold / Issue Reported</option>
                                    <option value="CANCELLED">Cancelled / Could Not Perform</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">
                                    Work Notes & Remarks
                                </label>
                                <textarea
                                    rows={3}
                                    placeholder="Enter work details, parts repaired/replaced, or progress notes..."
                                    value={technicianNotes}
                                    onChange={(e) => setTechnicianNotes(e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 p-3 text-xs outline-none focus:border-blue-500"
                                />
                            </div>

                            <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-3">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={issueReported || newStatus === "ON_HOLD"}
                                        onChange={(e) => setIssueReported(e.target.checked)}
                                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                                        <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                                        Report an issue or blocker
                                    </span>
                                </label>

                                {(issueReported || newStatus === "ON_HOLD") && (
                                    <div className="mt-2.5">
                                        <label className="block text-[11px] font-semibold text-rose-700 mb-1">
                                            Issue Details (e.g. customer unavailable, spare parts required, safety hazard)
                                        </label>
                                        <textarea
                                            rows={2}
                                            required={newStatus === "ON_HOLD"}
                                            placeholder="Explain what happened or what is needed to proceed..."
                                            value={issueDescription}
                                            onChange={(e) => setIssueDescription(e.target.value)}
                                            className="w-full rounded-lg border border-rose-200 bg-white p-2.5 text-xs outline-none focus:border-rose-500 text-slate-800 placeholder:text-slate-400"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
                                <button
                                    type="button"
                                    onClick={() => setStatusModalReq(null)}
                                    className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={modalSubmitting}
                                    className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {modalSubmitting ? (
                                        <>
                                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        "Save Changes"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
