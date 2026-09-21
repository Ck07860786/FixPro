import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
    submitServiceRequest,
    clearRequestError,
    clearSuccessMessage,
} from "@/features/serviceRequests/serviceRequestSlice";
import { getPublicServices } from "@/features/services/serviceApi";
import {
    CalendarDays,
    Clock,
    MapPin,
    FileText,
    IndianRupee,
    Send,
    ArrowLeft,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";

export default function BookService() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const { submitting, error, successMessage } = useSelector(
        (state) => state.serviceRequests
    );

    const preServiceId = searchParams.get("serviceId") || "";
    const preBusinessId = searchParams.get("businessId") || "";

    const [services, setServices] = useState([]);
    const [selectedServiceId, setSelectedServiceId] = useState(preServiceId);
    const [businessId, setBusinessId] = useState(preBusinessId);
    const [scheduledDate, setScheduledDate] = useState("");
    const [scheduledTimeSlot, setScheduledTimeSlot] = useState("");
    const [address, setAddress] = useState({
        street: "",
        city: "",
        state: "",
        pincode: "",
    });
    const [customerNotes, setCustomerNotes] = useState("");

    useEffect(() => {
        getPublicServices()
            .then((data) => setServices(data.services || []))
            .catch(() => setServices([]));
    }, []);

    useEffect(() => {
        return () => {
            dispatch(clearRequestError());
            dispatch(clearSuccessMessage());
        };
    }, [dispatch]);

    const selectedService = services.find((s) => s._id === selectedServiceId);

    const handleServiceChange = (serviceId) => {
        setSelectedServiceId(serviceId);
        const svc = services.find((s) => s._id === serviceId);
        if (svc?.businessId?._id) {
            setBusinessId(svc.businessId._id);
        } else if (svc?.businessId) {
            setBusinessId(svc.businessId);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedServiceId || !businessId) return;

        dispatch(
            submitServiceRequest({
                serviceId: selectedServiceId,
                businessId,
                scheduledDate,
                scheduledTimeSlot,
                customerAddress: address,
                customerNotes,
                totalAmount: selectedService?.price || 0,
            })
        );
    };

    if (successMessage) {
        return (
            <div className="p-6 lg:p-8">
                <div className="mx-auto max-w-lg text-center py-16">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                        <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">
                        Request Submitted!
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                        Your service request has been sent. You'll be notified once it's confirmed.
                    </p>
                    <div className="mt-6 flex justify-center gap-3">
                        <button
                            onClick={() => navigate("/customer/requests")}
                            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition"
                        >
                            View My Requests
                        </button>
                        <button
                            onClick={() => {
                                dispatch(clearSuccessMessage());
                                setSelectedServiceId("");
                                setScheduledDate("");
                                setScheduledTimeSlot("");
                                setAddress({ street: "", city: "", state: "", pincode: "" });
                                setCustomerNotes("");
                            }}
                            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                        >
                            Book Another
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const today = new Date().toISOString().split("T")[0];

    return (
        <div className="p-6 lg:p-8">
            <button
                onClick={() => navigate(-1)}
                className="mb-4 flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 transition"
            >
                <ArrowLeft className="h-4 w-4" />
                Back
            </button>

            <div className="mb-6">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                    Book a Service
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                    Fill in the details below to schedule your service.
                </p>
            </div>

            {error && (
                <div className="mb-5 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-5">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-800">
                            <FileText className="h-4 w-4 text-blue-600" />
                            Service Details
                        </h3>
                        <div>
                            <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                                Select Service
                            </label>
                            <select
                                value={selectedServiceId}
                                onChange={(e) => handleServiceChange(e.target.value)}
                                required
                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            >
                                <option value="">Choose a service...</option>
                                {services.map((s) => (
                                    <option key={s._id} value={s._id}>
                                        {s.name} — ₹{s.price}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mt-4">
                            <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                                Notes (optional)
                            </label>
                            <textarea
                                value={customerNotes}
                                onChange={(e) => setCustomerNotes(e.target.value)}
                                rows={3}
                                maxLength={500}
                                placeholder="Any special instructions..."
                                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
                            />
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-800">
                            <CalendarDays className="h-4 w-4 text-blue-600" />
                            Schedule
                        </h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                                    Preferred Date
                                </label>
                                <input
                                    type="date"
                                    value={scheduledDate}
                                    min={today}
                                    onChange={(e) => setScheduledDate(e.target.value)}
                                    required
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                                    Time Slot
                                </label>
                                <select
                                    value={scheduledTimeSlot}
                                    onChange={(e) => setScheduledTimeSlot(e.target.value)}
                                    required
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                >
                                    <option value="">Select time slot...</option>
                                    <option value="MORNING">Morning (8 AM - 12 PM)</option>
                                    <option value="AFTERNOON">Afternoon (12 PM - 5 PM)</option>
                                    <option value="EVENING">Evening (5 PM - 9 PM)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-800">
                            <MapPin className="h-4 w-4 text-blue-600" />
                            Service Address
                        </h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                                    Street Address
                                </label>
                                <input
                                    type="text"
                                    value={address.street}
                                    onChange={(e) =>
                                        setAddress({ ...address, street: e.target.value })
                                    }
                                    required
                                    placeholder="House/Flat no., Street name"
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                                    City
                                </label>
                                <input
                                    type="text"
                                    value={address.city}
                                    onChange={(e) =>
                                        setAddress({ ...address, city: e.target.value })
                                    }
                                    required
                                    placeholder="City"
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                                    State
                                </label>
                                <input
                                    type="text"
                                    value={address.state}
                                    onChange={(e) =>
                                        setAddress({ ...address, state: e.target.value })
                                    }
                                    required
                                    placeholder="State"
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                />
                            </div>
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                                    Pincode
                                </label>
                                <input
                                    type="text"
                                    value={address.pincode}
                                    onChange={(e) =>
                                        setAddress({ ...address, pincode: e.target.value })
                                    }
                                    required
                                    placeholder="110001"
                                    maxLength={6}
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h3 className="mb-4 text-sm font-bold text-slate-800">
                            Order Summary
                        </h3>

                        {selectedService ? (
                            <div className="space-y-3">
                                <div className="rounded-xl bg-slate-50 p-3">
                                    <p className="text-sm font-semibold text-slate-800">
                                        {selectedService.name}
                                    </p>
                                    <p className="mt-0.5 text-xs text-slate-500">
                                        {selectedService.category}
                                    </p>
                                </div>

                                {scheduledDate && (
                                    <div className="flex items-center gap-2 text-xs text-slate-600">
                                        <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
                                        {new Date(scheduledDate).toLocaleDateString("en-IN", {
                                            weekday: "short",
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </div>
                                )}

                                {scheduledTimeSlot && (
                                    <div className="flex items-center gap-2 text-xs text-slate-600">
                                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                                        {scheduledTimeSlot === "MORNING"
                                            ? "Morning (8 AM - 12 PM)"
                                            : scheduledTimeSlot === "AFTERNOON"
                                            ? "Afternoon (12 PM - 5 PM)"
                                            : "Evening (5 PM - 9 PM)"}
                                    </div>
                                )}

                                <div className="border-t border-slate-100 pt-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-medium text-slate-500">
                                            Total
                                        </span>
                                        <span className="flex items-center text-xl font-black text-slate-900">
                                            <IndianRupee className="h-4 w-4" />
                                            {selectedService.price}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-xs text-slate-400">
                                Select a service to see pricing.
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={submitting || !selectedServiceId}
                            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submitting ? (
                                "Submitting..."
                            ) : (
                                <>
                                    <Send className="h-4 w-4" />
                                    Submit Request
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
