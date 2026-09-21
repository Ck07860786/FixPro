import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    fetchMyRequests,
    cancelRequest,
} from "@/features/serviceRequests/serviceRequestSlice";
import {
    ClipboardList,
    Calendar,
    Clock,
    MapPin,
    User,
    XCircle,
    CheckCircle2,
    Loader2,
    AlertCircle,
    ArrowRight,
} from "lucide-react";

const STATUS_STYLES = {
    PENDING: "bg-amber-50 text-amber-700",
    CONFIRMED: "bg-blue-50 text-blue-700",
    IN_PROGRESS: "bg-indigo-50 text-indigo-700",
    COMPLETED: "bg-emerald-50 text-emerald-700",
    ON_HOLD: "bg-rose-50 text-rose-700",
    CANCELLED: "bg-slate-100 text-slate-500",
};

const STATUS_DOT = {
    PENDING: "bg-amber-500",
    CONFIRMED: "bg-blue-500",
    IN_PROGRESS: "bg-indigo-500",
    COMPLETED: "bg-emerald-500",
    ON_HOLD: "bg-rose-500",
    CANCELLED: "bg-slate-400",
};

const TIME_SLOT_LABELS = {
    MORNING: "Morning (8 AM - 12 PM)",
    AFTERNOON: "Afternoon (12 PM - 5 PM)",
    EVENING: "Evening (5 PM - 9 PM)",
};

export default function MyRequests() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { requests, loading, error } = useSelector(
        (state) => state.serviceRequests
    );

    const [cancellingId, setCancellingId] = useState(null);
    const [filter, setFilter] = useState("ALL");

    useEffect(() => {
        dispatch(fetchMyRequests());
    }, [dispatch]);

    const handleCancel = async (id) => {
        if (!window.confirm("Are you sure you want to cancel this request?")) return;
        setCancellingId(id);
        await dispatch(cancelRequest({ id, reason: "Cancelled by customer" }));
        setCancellingId(null);
    };

    const filtered =
        filter === "ALL"
            ? requests
            : requests.filter((r) => r.status === filter);

    if (loading) {
        return (
            <div className="flex items-center justify-center p-16">
                <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-8">
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                        My Requests
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Track all your service bookings.
                    </p>
                </div>
                <button
                    onClick={() => navigate("/customer/book-service")}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition"
                >
                    Book New Service
                    <ArrowRight className="h-4 w-4" />
                </button>
            </div>

            <div className="mb-5 flex flex-wrap gap-2">
                {["ALL", "PENDING", "CONFIRMED", "IN_PROGRESS", "COMPLETED", "CANCELLED"].map(
                    (status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                                filter === status
                                    ? "bg-blue-600 text-white"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            }`}
                        >
                            {status === "ALL" ? "All" : status.replace("_", " ")}
                        </button>
                    )
                )}
            </div>

            {error && (
                <div className="mb-5 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    {error}
                </div>
            )}

            {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <ClipboardList className="h-12 w-12 text-slate-300 mb-3" />
                    <p className="text-sm font-medium text-slate-500">
                        No requests found.
                    </p>
                    <button
                        onClick={() => navigate("/customer/book-service")}
                        className="mt-3 text-sm font-semibold text-blue-600 hover:underline"
                    >
                        Book your first service →
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {filtered.map((req) => (
                        <div
                            key={req._id}
                            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-slate-300 transition"
                        >
                            <div className="flex flex-wrap items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span
                                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                                STATUS_STYLES[req.status]
                                            }`}
                                        >
                                            <span
                                                className={`h-1.5 w-1.5 rounded-full ${
                                                    STATUS_DOT[req.status]
                                                }`}
                                            />
                                            {req.status.replace("_", " ")}
                                        </span>
                                    </div>
                                    <h3 className="text-base font-bold text-slate-900 truncate">
                                        {req.serviceId?.name || "Service"}
                                    </h3>
                                    <p className="mt-0.5 text-xs text-slate-500">
                                        {req.serviceId?.category}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <span className="text-lg font-extrabold text-slate-900">
                                        ₹{req.totalAmount}
                                    </span>
                                    <p className="text-[10px] text-slate-400 uppercase font-semibold">
                                        {req.paymentStatus}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                                    {req.scheduledDate
                                        ? new Date(req.scheduledDate).toLocaleDateString(
                                              "en-IN",
                                              {
                                                  day: "numeric",
                                                  month: "short",
                                                  year: "numeric",
                                              }
                                          )
                                        : "—"}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                                    {TIME_SLOT_LABELS[req.scheduledTimeSlot] || req.scheduledTimeSlot}
                                </span>
                                {req.customerAddress?.city && (
                                    <span className="flex items-center gap-1.5">
                                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                                        {req.customerAddress.city}, {req.customerAddress.state}
                                    </span>
                                )}
                                {req.assignedTechnicianId?.userId && (
                                    <span className="flex items-center gap-1.5">
                                        <User className="h-3.5 w-3.5 text-slate-400" />
                                        Technician assigned
                                    </span>
                                )}
                            </div>

                            {req.cancellationReason && (
                                <p className="mt-3 text-xs text-slate-400 italic">
                                    Cancelled: {req.cancellationReason}
                                </p>
                            )}

                            {(req.status === "PENDING" || req.status === "CONFIRMED") && (
                                <div className="mt-4 border-t border-slate-100 pt-3">
                                    <button
                                        onClick={() => handleCancel(req._id)}
                                        disabled={cancellingId === req._id}
                                        className="flex items-center gap-1.5 rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition disabled:opacity-50"
                                    >
                                        {cancellingId === req._id ? (
                                            <Loader2 className="h-3 w-3 animate-spin" />
                                        ) : (
                                            <XCircle className="h-3 w-3" />
                                        )}
                                        Cancel Request
                                    </button>
                                </div>
                            )}

                            {req.status === "COMPLETED" && (
                                <div className="mt-4 border-t border-slate-100 pt-3 flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                    Completed on{" "}
                                    {req.completedAt
                                        ? new Date(req.completedAt).toLocaleDateString("en-IN")
                                        : "—"}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
