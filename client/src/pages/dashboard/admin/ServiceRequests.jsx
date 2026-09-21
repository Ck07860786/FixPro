import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    fetchBusinessRequests,
    changeRequestStatus,
} from "@/features/serviceRequests/serviceRequestSlice";
import { fetchTechnicians } from "@/features/technicians/technicianSlice";
import {
    Search,
    ChevronDown,
    UserPlus,
    Loader2,
    AlertCircle,
    ClipboardList,
    X,
    MapPin,
    Briefcase,
    CheckCircle2,
    Phone,
    Mail,
    Star,
    ExternalLink,
    Sparkles,
    Check,
    Eye,
} from "lucide-react";
import {
    AVAILABILITY_COLORS,
    AVAILABILITY_DOT,
} from "@/components/technicians-management/technicianConstants";

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

const ALL_STATUSES = ["PENDING", "CONFIRMED", "IN_PROGRESS", "COMPLETED", "ON_HOLD", "CANCELLED"];

function checkCategoryMatch(tech, category = "", serviceName = "") {
    if (!category && !serviceName) return true;
    const cat = (category || "").toLowerCase().trim();
    const srv = (serviceName || "").toLowerCase().trim();
    const spec = (tech.specialization || "").toLowerCase().trim();
    const skills = Array.isArray(tech.skills) ? tech.skills : [];

    if (spec && (cat.includes(spec) || spec.includes(cat) || srv.includes(spec) || spec.includes(srv))) {
        return true;
    }

    const tradeGroups = [
        ["elect", "wire", "switch", "light", "power", "appliance", "circuit", "fuse", "voltage"],
        ["plumb", "pipe", "drain", "leak", "faucet", "tap", "sink", "toilet", "water", "sewer", "shower"],
        ["carpent", "wood", "furniture", "door", "window", "cabinet", "lock", "table"],
        ["clean", "maid", "deep clean", "sanitiz", "wash", "housekeep", "carpet"],
        ["paint", "wall", "color", "coat", "primer", "whitewash"],
        ["ac", "air condition", "hvac", "cooling", "cool", "heater", "refrigerat"],
        ["pest", "termite", "bed bug", "insect", "rodent", "control"],
        ["mechanic", "auto", "car", "engine", "brake"],
    ];

    for (const group of tradeGroups) {
        const serviceHasKeyword = group.some((w) => cat.includes(w) || srv.includes(w));
        const techHasKeyword = group.some((w) => spec.includes(w) || skills.some((s) => s.toLowerCase().includes(w)));
        if (serviceHasKeyword && techHasKeyword) return true;
    }

    return skills.some((skill) => {
        const s = (skill || "").toLowerCase().trim();
        return s && (cat.includes(s) || s.includes(cat) || srv.includes(s) || s.includes(srv));
    });
}

function getTechName(tech) {
    if (!tech) return "Technician";
    return tech.name || tech.userId?.name || tech.user?.name || "Technician";
}

function getTechEmail(tech) {
    if (!tech) return "";
    return tech.email || tech.userId?.email || tech.user?.email || "";
}

function getTechPhone(tech) {
    if (!tech) return "";
    return tech.phone || tech.userId?.phone || tech.user?.phone || "";
}

export default function ServiceRequests() {
    const dispatch = useDispatch();
    const { business } = useSelector((state) => state.auth);
    const { requests, loading, error } = useSelector(
        (state) => state.serviceRequests
    );
    const { technicians } = useSelector((state) => state.technicians);

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [assignModalId, setAssignModalId] = useState(null);
    const [statusModalId, setStatusModalId] = useState(null);
    const [selectedTechId, setSelectedTechId] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [updating, setUpdating] = useState(false);

    const [techSearch, setTechSearch] = useState("");
    const [filterCategoryOnly, setFilterCategoryOnly] = useState(true);
    const [filterAvailableOnly, setFilterAvailableOnly] = useState(true);

    const [viewTechnicianModal, setViewTechnicianModal] = useState(null);

    useEffect(() => {
        if (business?.id) {
            dispatch(fetchBusinessRequests(business.id));
            dispatch(fetchTechnicians());
        }
    }, [dispatch, business]);

    const filteredRequests = useMemo(() => {
        return requests.filter((req) => {
            const matchesStatus =
                statusFilter === "ALL" || req.status === statusFilter;
            const q = search.toLowerCase();
            const matchesSearch =
                !q ||
                req.customerId?.name?.toLowerCase().includes(q) ||
                req.customerId?.email?.toLowerCase().includes(q) ||
                req.serviceId?.name?.toLowerCase().includes(q);
            return matchesStatus && matchesSearch;
        });
    }, [requests, statusFilter, search]);

    const activeAssignReq = useMemo(() => {
        if (!assignModalId) return null;
        return requests.find((r) => r._id === assignModalId) || null;
    }, [requests, assignModalId]);

    const targetCategory = activeAssignReq?.serviceId?.category || "";
    const targetServiceName = activeAssignReq?.serviceId?.name || "";

    const modalTechnicians = useMemo(() => {
        let list = technicians || [];

        if (filterAvailableOnly) {
            list = list.filter((t) => {
                const s = t.availabilityStatus || "AVAILABLE";
                return t.isActive !== false && (s === "AVAILABLE" || s === "ONLINE");
            });
        }

        if (filterCategoryOnly && (targetCategory || targetServiceName)) {
            list = list.filter((t) =>
                checkCategoryMatch(t, targetCategory, targetServiceName)
            );
        }

        if (techSearch.trim()) {
            const q = techSearch.toLowerCase().trim();
            list = list.filter((t) => {
                const name = getTechName(t).toLowerCase();
                const spec = (t.specialization || "").toLowerCase();
                const phone = getTechPhone(t).toLowerCase();
                const city = (t.address?.city || "").toLowerCase();
                const skills = (t.skills || []).map((s) => s.toLowerCase()).join(" ");
                return (
                    name.includes(q) ||
                    spec.includes(q) ||
                    phone.includes(q) ||
                    city.includes(q) ||
                    skills.includes(q)
                );
            });
        }

        return list;
    }, [technicians, filterAvailableOnly, filterCategoryOnly, targetCategory, targetServiceName, techSearch]);

    const totalMatchingCategoryCount = useMemo(() => {
        if (!targetCategory && !targetServiceName) return technicians.length;
        return (technicians || []).filter((t) =>
            checkCategoryMatch(t, targetCategory, targetServiceName)
        ).length;
    }, [technicians, targetCategory, targetServiceName]);

    const availableMatchingCount = useMemo(() => {
        return (technicians || []).filter((t) => {
            const s = t.availabilityStatus || "AVAILABLE";
            const isAvail = t.isActive !== false && (s === "AVAILABLE" || s === "ONLINE");
            const isMatch = checkCategoryMatch(t, targetCategory, targetServiceName);
            return isAvail && isMatch;
        }).length;
    }, [technicians, targetCategory, targetServiceName]);

    const handleAssignTechnician = async () => {
        if (!assignModalId || !selectedTechId) return;
        setUpdating(true);
        await dispatch(
            changeRequestStatus({
                id: assignModalId,
                data: {
                    status: "CONFIRMED",
                    assignedTechnicianId: selectedTechId,
                },
            })
        );
        setUpdating(false);
        setAssignModalId(null);
        setSelectedTechId("");
        setTechSearch("");
    };

    const handleStatusUpdate = async () => {
        if (!statusModalId || !selectedStatus) return;
        setUpdating(true);
        await dispatch(
            changeRequestStatus({
                id: statusModalId,
                data: { status: selectedStatus },
            })
        );
        setUpdating(false);
        setStatusModalId(null);
        setSelectedStatus("");
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-16">
                <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-8">
            <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                    Service Requests
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                    Manage, review, and assign technicians to all customer service tickets.
                </p>
            </div>

            {error && (
                <div className="mb-5 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    {error}
                </div>
            )}

            <div className="mb-6 flex flex-wrap items-center gap-3">
                <div className="flex min-w-[280px] flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm">
                    <Search className="h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by customer or service..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-transparent outline-none placeholder:text-slate-400"
                    />
                </div>

                <div className="flex flex-wrap gap-2">
                    {["ALL", ...ALL_STATUSES].map((s) => (
                        <button
                            key={s}
                            onClick={() => setStatusFilter(s)}
                            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                                statusFilter === s
                                    ? "bg-blue-600 text-white"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            }`}
                        >
                            {s === "ALL" ? "All" : s.replace("_", " ")}
                        </button>
                    ))}
                </div>
            </div>

            {filteredRequests.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <ClipboardList className="h-12 w-12 text-slate-300 mb-3" />
                    <p className="text-sm font-medium text-slate-500">
                        No service requests found.
                    </p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                                    <th className="px-6 py-4">Customer</th>
                                    <th className="px-6 py-4">Service</th>
                                    <th className="px-6 py-4">Date & Time</th>
                                    <th className="px-6 py-4">Technician</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredRequests.map((req) => {
                                    const tech = req.assignedTechnicianId;
                                    const techName = getTechName(tech);
                                    const techInitial = techName.charAt(0).toUpperCase();

                                    return (
                                        <tr key={req._id} className="hover:bg-slate-50/60">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                                                        {req.customerId?.name?.charAt(0)?.toUpperCase() || "?"}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-slate-800">
                                                            {req.customerId?.name || "Unknown"}
                                                        </p>
                                                        <p className="text-[11px] text-slate-400">
                                                            {req.customerId?.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-medium text-slate-800">
                                                        {req.serviceId?.name || "—"}
                                                    </p>
                                                    {req.serviceId?.category && (
                                                        <span className="inline-block rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600">
                                                            {req.serviceId.category}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-500 text-xs">
                                                {req.scheduledDate ? (
                                                    <div>
                                                        <p className="font-medium text-slate-700">
                                                            {new Date(req.scheduledDate).toLocaleDateString("en-IN", {
                                                                day: "numeric",
                                                                month: "short",
                                                                year: "numeric",
                                                            })}
                                                        </p>
                                                        <p className="text-[11px] text-slate-400">
                                                            {req.scheduledTimeSlot || "Any time"}
                                                        </p>
                                                    </div>
                                                ) : (
                                                    "—"
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {tech ? (
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700 flex-shrink-0">
                                                            {techInitial}
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-1.5">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setViewTechnicianModal(tech)}
                                                                    className="text-left font-semibold text-slate-800 hover:text-blue-600 hover:underline transition"
                                                                    title="Click to view technician profile"
                                                                >
                                                                    {techName}
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setViewTechnicianModal(tech)}
                                                                    className="text-slate-400 hover:text-blue-600"
                                                                    title="View Details"
                                                                >
                                                                    <Eye className="h-3 w-3" />
                                                                </button>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-[10px] text-slate-400">
                                                                <span>{tech.specialization || "General"}</span>
                                                                <span>•</span>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setAssignModalId(req._id);
                                                                        setSelectedTechId(tech._id || "");
                                                                    }}
                                                                    className="text-blue-600 hover:underline font-semibold"
                                                                >
                                                                    Change
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => {
                                                            setAssignModalId(req._id);
                                                            setSelectedTechId("");
                                                            setTechSearch("");
                                                            setFilterCategoryOnly(true);
                                                            setFilterAvailableOnly(true);
                                                        }}
                                                        className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-blue-400 bg-blue-50/50 px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-100/60 transition"
                                                    >
                                                        <UserPlus className="h-3.5 w-3.5" />
                                                        Assign Technician
                                                    </button>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                                        STATUS_STYLES[req.status] || "bg-slate-100 text-slate-600"
                                                    }`}
                                                >
                                                    <span
                                                        className={`h-1.5 w-1.5 rounded-full ${
                                                            STATUS_DOT[req.status] || "bg-slate-400"
                                                        }`}
                                                    />
                                                    {req.status.replace("_", " ")}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {req.status !== "COMPLETED" && req.status !== "CANCELLED" && (
                                                    <button
                                                        onClick={() => {
                                                            setStatusModalId(req._id);
                                                            setSelectedStatus("");
                                                        }}
                                                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
                                                    >
                                                        Update
                                                        <ChevronDown className="h-3 w-3" />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="border-t border-slate-100 px-6 py-4 text-xs text-slate-500">
                        Showing {filteredRequests.length} of {requests.length} requests
                    </div>
                </div>
            )}

            {assignModalId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
                    <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl flex flex-col max-h-[90vh]">
                        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="text-lg font-bold text-slate-900">
                                        Assign Technician
                                    </h3>
                                    {targetCategory && (
                                        <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                                            {targetCategory}
                                        </span>
                                    )}
                                </div>
                                <p className="mt-1 text-xs text-slate-500">
                                    Request: <strong className="text-slate-700">{targetServiceName || "Service"}</strong>
                                    {" "}• Customer: <strong className="text-slate-700">{activeAssignReq?.customerId?.name || "Customer"}</strong>
                                </p>
                            </div>
                            <button
                                onClick={() => setAssignModalId(null)}
                                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="py-3 space-y-2.5 border-b border-slate-100">
                            <div className="flex items-center gap-2">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search technician by name, phone, or skill..."
                                        value={techSearch}
                                        onChange={(e) => setTechSearch(e.target.value)}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-8 py-2 text-xs outline-none focus:border-blue-500 focus:bg-white"
                                    />
                                    {techSearch && (
                                        <button
                                            onClick={() => setTechSearch("")}
                                            className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                                        >
                                            <X className="h-3.5 w-3.5" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                                <div className="flex flex-wrap items-center gap-2">
                                    {targetCategory && (
                                        <button
                                            type="button"
                                            onClick={() => setFilterCategoryOnly(!filterCategoryOnly)}
                                            className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-medium transition ${
                                                filterCategoryOnly
                                                    ? "bg-blue-600 text-white shadow-xs"
                                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                            }`}
                                        >
                                            <Sparkles className="h-3 w-3" />
                                            {filterCategoryOnly ? `Related to ${targetCategory}` : "Show All Trades"}
                                        </button>
                                    )}

                                    <button
                                        type="button"
                                        onClick={() => setFilterAvailableOnly(!filterAvailableOnly)}
                                        className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-medium transition ${
                                            filterAvailableOnly
                                                ? "bg-emerald-600 text-white shadow-xs"
                                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                        }`}
                                    >
                                        <span className={`h-1.5 w-1.5 rounded-full ${filterAvailableOnly ? "bg-white" : "bg-emerald-500"}`} />
                                        {filterAvailableOnly ? `Available Only (${availableMatchingCount})` : "All Statuses"}
                                    </button>
                                </div>

                                <span className="text-[11px] text-slate-400 font-medium">
                                    Showing {modalTechnicians.length} technician{modalTechnicians.length !== 1 ? "s" : ""}
                                </span>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto py-3 space-y-2.5 pr-1">
                            {modalTechnicians.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-10 text-center">
                                    <Briefcase className="h-10 w-10 text-slate-300 mb-2" />
                                    <p className="text-sm font-semibold text-slate-700">
                                        No matching technicians found
                                    </p>
                                    <p className="mt-1 text-xs text-slate-400 max-w-sm">
                                        {filterAvailableOnly
                                            ? "Try turning off 'Available Only' to see busy or offline technicians, or turn off the trade filter."
                                            : "No technicians match your search or filter criteria."}
                                    </p>
                                    <div className="mt-3 flex gap-2">
                                        {filterAvailableOnly && (
                                            <button
                                                type="button"
                                                onClick={() => setFilterAvailableOnly(false)}
                                                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                                            >
                                                Show All Statuses
                                            </button>
                                        )}
                                        {filterCategoryOnly && targetCategory && (
                                            <button
                                                type="button"
                                                onClick={() => setFilterCategoryOnly(false)}
                                                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                                            >
                                                Show All Trades
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                modalTechnicians.map((tech) => {
                                    const techName = getTechName(tech);
                                    const techPhone = getTechPhone(tech);
                                    const techEmail = getTechEmail(tech);
                                    const rawAvail = tech.availabilityStatus || "AVAILABLE";
                                    const avail = rawAvail === "ONLINE" ? "AVAILABLE" : rawAvail;
                                    const isSelected = selectedTechId === tech._id;
                                    const isMatch = checkCategoryMatch(tech, targetCategory, targetServiceName);

                                    return (
                                        <div
                                            key={tech._id}
                                            onClick={() => setSelectedTechId(tech._id)}
                                            className={`cursor-pointer rounded-xl border p-3.5 transition ${
                                                isSelected
                                                    ? "border-blue-500 bg-blue-50/40 ring-2 ring-blue-500/20 shadow-xs"
                                                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                                            }`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700 flex-shrink-0">
                                                    {techName.charAt(0).toUpperCase()}
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex flex-wrap items-center justify-between gap-1.5">
                                                        <div className="flex items-center gap-2">
                                                            <p className="text-sm font-bold text-slate-900">
                                                                {techName}
                                                            </p>
                                                            {isMatch && targetCategory && (
                                                                <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200">
                                                                    Matched Trade
                                                                </span>
                                                            )}
                                                        </div>

                                                        <div className="flex items-center gap-2">
                                                            <span
                                                                className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${
                                                                    AVAILABILITY_COLORS[avail] || AVAILABILITY_COLORS.AVAILABLE
                                                                }`}
                                                            >
                                                                <span
                                                                    className={`h-1.5 w-1.5 rounded-full ${
                                                                        AVAILABILITY_DOT[avail] || AVAILABILITY_DOT.AVAILABLE
                                                                    }`}
                                                                />
                                                                {avail === "AVAILABLE" ? "Online" : avail.replace("_", " ")}
                                                            </span>

                                                            {isSelected && (
                                                                <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0" />
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
                                                        <span className="flex items-center gap-1 font-medium text-slate-700">
                                                            <Briefcase className="h-3 w-3 text-slate-400" />
                                                            {tech.specialization}
                                                        </span>
                                                        {tech.experienceYears > 0 && (
                                                            <span>• {tech.experienceYears} yrs exp</span>
                                                        )}
                                                        {techPhone && (
                                                            <span className="flex items-center gap-1">
                                                                <Phone className="h-3 w-3 text-slate-400" />
                                                                {techPhone}
                                                            </span>
                                                        )}
                                                        {tech.address?.city && (
                                                            <span className="flex items-center gap-1">
                                                                <MapPin className="h-3 w-3 text-slate-400" />
                                                                {tech.address.city}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {tech.skills?.length > 0 && (
                                                        <div className="mt-2 flex flex-wrap items-center gap-1">
                                                            {tech.skills.slice(0, 4).map((skill, i) => (
                                                                <span
                                                                    key={i}
                                                                    className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600"
                                                                >
                                                                    {skill}
                                                                </span>
                                                            ))}
                                                            {tech.skills.length > 4 && (
                                                                <span className="text-[10px] text-slate-400">
                                                                    +{tech.skills.length - 4} more
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setViewTechnicianModal(tech);
                                                    }}
                                                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition"
                                                    title="View Full Profile"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>

                        <div className="mt-3 border-t border-slate-100 pt-3 flex items-center justify-between">
                            <div className="text-xs text-slate-500">
                                {selectedTechId ? (
                                    <span>
                                        Selected: <strong className="text-slate-800">
                                            {getTechName(technicians.find((t) => t._id === selectedTechId))}
                                        </strong>
                                    </span>
                                ) : (
                                    <span>Please select a technician to assign</span>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setAssignModalId(null)}
                                    className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAssignTechnician}
                                    disabled={!selectedTechId || updating}
                                    className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-50 flex items-center gap-1.5"
                                >
                                    {updating ? (
                                        <>
                                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                            Assigning...
                                        </>
                                    ) : (
                                        <>
                                            <Check className="h-3.5 w-3.5" />
                                            Assign & Confirm
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {statusModalId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-slate-900">
                                Update Status
                            </h3>
                            <button
                                onClick={() => setStatusModalId(null)}
                                className="text-slate-400 hover:text-slate-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
                        >
                            <option value="">Select new status...</option>
                            {ALL_STATUSES.map((s) => (
                                <option key={s} value={s}>
                                    {s.replace("_", " ")}
                                </option>
                            ))}
                        </select>
                        <div className="mt-4 flex justify-end gap-2">
                            <button
                                onClick={() => setStatusModalId(null)}
                                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleStatusUpdate}
                                disabled={!selectedStatus || updating}
                                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                            >
                                {updating ? "Updating..." : "Update Status"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {viewTechnicianModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-base font-bold text-blue-700">
                                    {getTechName(viewTechnicianModal).charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-slate-900">
                                        {getTechName(viewTechnicianModal)}
                                    </h3>
                                    <p className="text-xs text-blue-600 font-semibold">
                                        {viewTechnicianModal.specialization || "General Technician"}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setViewTechnicianModal(null)}
                                className="text-slate-400 hover:text-slate-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="py-4 space-y-3.5 text-xs">
                            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                                <span className="font-semibold text-slate-500">Live Status</span>
                                {(() => {
                                    const s = viewTechnicianModal.availabilityStatus || "AVAILABLE";
                                    const statusKey = s === "ONLINE" ? "AVAILABLE" : s;
                                    return (
                                        <span
                                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-bold ${
                                                AVAILABILITY_COLORS[statusKey] || AVAILABILITY_COLORS.AVAILABLE
                                            }`}
                                        >
                                            <span
                                                className={`h-1.5 w-1.5 rounded-full ${
                                                    AVAILABILITY_DOT[statusKey] || AVAILABILITY_DOT.AVAILABLE
                                                }`}
                                            />
                                            {statusKey === "AVAILABLE" ? "Online / Available" : statusKey.replace("_", " ")}
                                        </span>
                                    );
                                })()}
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-slate-700">
                                    <Mail className="h-4 w-4 text-slate-400" />
                                    <span>{getTechEmail(viewTechnicianModal) || "No email provided"}</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-700">
                                    <Phone className="h-4 w-4 text-slate-400" />
                                    <span>{getTechPhone(viewTechnicianModal) || "No phone provided"}</span>
                                </div>
                                {viewTechnicianModal.experienceYears > 0 && (
                                    <div className="flex items-center gap-2 text-slate-700">
                                        <Briefcase className="h-4 w-4 text-slate-400" />
                                        <span>{viewTechnicianModal.experienceYears} years experience</span>
                                    </div>
                                )}
                                {viewTechnicianModal.address && (
                                    <div className="flex items-start gap-2 text-slate-700">
                                        <MapPin className="h-4 w-4 text-slate-400 mt-0.5" />
                                        <span>
                                            {[
                                                viewTechnicianModal.address.street,
                                                viewTechnicianModal.address.city,
                                                viewTechnicianModal.address.state,
                                                viewTechnicianModal.address.pincode,
                                            ]
                                                .filter(Boolean)
                                                .join(", ") || "Location not specified"}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {viewTechnicianModal.skills?.length > 0 && (
                                <div>
                                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                                        Skills & Expertise
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {viewTechnicianModal.skills.map((skill, i) => (
                                            <span
                                                key={i}
                                                className="rounded-lg bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-700"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                            <Link
                                to="/business/technicians"
                                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
                            >
                                Manage in Roster <ExternalLink className="h-3 w-3" />
                            </Link>
                            <button
                                onClick={() => setViewTechnicianModal(null)}
                                className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
