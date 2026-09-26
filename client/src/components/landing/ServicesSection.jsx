import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Wrench,
  Clock,
  IndianRupee,
  Search,
  ArrowRight,
  Sparkles,
  Building2,
  PackageOpen,
} from "lucide-react";
import { getPublicServices } from "@/features/services/serviceApi";
import { API_BASE } from "@/components/services-management/serviceConstants";

const fallbackServices = [
  {
    _id: "fb-1",
    name: "Split AC Deep Cleaning & Servicing",
    category: "HVAC",
    description: "Complete jet wash servicing, gas pressure check, and antibacterial coil cleaning.",
    price: 699,
    estimatedDuration: 45,
    images: [
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    _id: "fb-2",
    name: "Refrigerator Compressor & Cooling Repair",
    category: "Appliance",
    description: "Gas charging, thermostat replacement, compressor diagnostics, and leak sealing.",
    price: 849,
    estimatedDuration: 60,
    images: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    _id: "fb-3",
    name: "Bathroom Plumbing & Leakage Fixes",
    category: "Plumbing",
    description: "Tap replacement, concealed pipe leakage detection, and high-pressure drainage clearing.",
    price: 499,
    estimatedDuration: 30,
    images: [
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    _id: "fb-4",
    name: "Complete Home Electrical Inspection",
    category: "Electrical",
    description: "MCB switchboard troubleshooting, earthing checks, and wiring short circuit repair.",
    price: 599,
    estimatedDuration: 50,
    images: [
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    _id: "fb-5",
    name: "Automatic Washing Machine Diagnostics",
    category: "Appliance",
    description: "Drum vibration alignment, motor repair, inlet valve replacement, and PCB diagnosis.",
    price: 799,
    estimatedDuration: 60,
    images: [
      "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=600&q=80",
    ],
  },
  {
    _id: "fb-6",
    name: "Deep Kitchen & Exhaust Cleaning",
    category: "Cleaning",
    description: "Degreasing exhaust chimney, tile stain removal, and sanitization of prep surfaces.",
    price: 999,
    estimatedDuration: 90,
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
    ],
  },
];

export function ServicesSection() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const params = {};
    if (selectedCategory !== "All") {
      params.category = selectedCategory;
    }
    if (searchQuery.trim()) {
      params.search = searchQuery.trim();
    }

    getPublicServices(params)
      .then((data) => {
        if (!isMounted) return;
        if (data.services && data.services.length > 0) {
          setServices(data.services);
        } else if (selectedCategory === "All" && !searchQuery.trim()) {
          setServices(fallbackServices);
        } else {
          setServices([]);
        }

        if (data.categories && data.categories.length > 0) {
          setCategories(data.categories);
        } else {
          const fallbackCats = Array.from(
            new Set(fallbackServices.map((s) => s.category))
          );
          setCategories(fallbackCats);
        }
      })
      .catch(() => {
        if (!isMounted) return;
        if (selectedCategory === "All" && !searchQuery.trim()) {
          setServices(fallbackServices);
          setCategories(["HVAC", "Appliance", "Plumbing", "Electrical", "Cleaning"]);
        } else {
          const filtered = fallbackServices.filter((s) => {
            const matchesCat =
              selectedCategory === "All" || s.category === selectedCategory;
            const matchesSearch =
              !searchQuery.trim() ||
              s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              s.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCat && matchesSearch;
          });
          setServices(filtered);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedCategory, searchQuery]);

  const bookingTarget = !isAuthenticated
    ? "/login"
    : user?.role === "ADMIN"
      ? "/business/services"
      : user?.role === "TECHNICIAN"
        ? "/technician/dashboard"
        : "/customer/dashboard";

  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold text-blue-700">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            Instant Transparent Pricing
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Explore Professional Services
          </h2>
          <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-slate-500 sm:text-base">
            Verified technicians, upfront pricing, and guaranteed satisfaction. Browse by
            category or search for your required repair.
          </p>
        </div>

        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search services..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 shadow-xs transition focus:border-blue-500 focus:outline-hidden focus:ring-3 focus:ring-blue-500/10"
          />
        </div>
      </div>

      <div className="mb-8 flex flex-wrap items-center gap-2 overflow-x-auto pb-2">
        <button
          type="button"
          onClick={() => setSelectedCategory("All")}
          className={`rounded-full px-4 py-2 text-xs font-semibold transition ${selectedCategory === "All"
              ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
              : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
            }`}
        >
          All Categories
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition ${selectedCategory === cat
                ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div
              key={idx}
              className="animate-pulse overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs"
            >
              <div className="aspect-16/10 w-full rounded-xl bg-slate-200" />
              <div className="mt-4 h-4 w-1/3 rounded-sm bg-slate-200" />
              <div className="mt-2 h-5 w-3/4 rounded-sm bg-slate-200" />
              <div className="mt-2 h-3 w-full rounded-sm bg-slate-100" />
              <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                <div className="h-5 w-16 rounded-sm bg-slate-200" />
                <div className="h-8 w-24 rounded-lg bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      ) : services.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center shadow-xs">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <PackageOpen className="h-7 w-7" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No matching services found</h3>
          <p className="mt-1 max-w-sm text-xs text-slate-500">
            Try adjusting your search query or selecting a different category from above.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="mt-4 text-xs font-semibold text-blue-600 hover:underline"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const thumb = service.images?.[0];
            const thumbSrc = thumb
              ? thumb.startsWith("http")
                ? thumb
                : `${API_BASE}${thumb}`
              : null;

            return (
              <article
                key={service._id}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs transition duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
              >
                <div>
                  <div className="relative aspect-16/10 overflow-hidden rounded-xl bg-slate-100">
                    {thumbSrc ? (
                      <img
                        src={thumbSrc}
                        alt={service.name}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          e.currentTarget.nextElementSibling?.classList.remove("hidden");
                        }}
                      />
                    ) : null}
                    <div
                      className={`${thumbSrc ? "hidden" : "flex"
                        } h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-blue-50/50 text-slate-400`}
                    >
                      <Wrench className="h-8 w-8 text-slate-300" />
                    </div>

                    <span className="absolute left-3 top-3 rounded-full bg-slate-900/70 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-md">
                      {service.category}
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      <span>{service.estimatedDuration} mins duration</span>
                    </div>

                    <h3 className="mt-1.5 text-base font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {service.name}
                    </h3>

                    <p className="mt-1.5 text-xs leading-relaxed text-slate-500 line-clamp-2">
                      {service.description || "Professional on-demand service backed by verified experts."}
                    </p>

                    {service.businessId?.name && (
                      <div className="mt-2.5 flex items-center gap-1 text-[11px] font-medium text-slate-400">
                        <Building2 className="h-3 w-3" />
                        <span>By {service.businessId.name}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3.5">
                  <div>
                    <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                      Starts from
                    </span>
                    <p className="flex items-center text-lg font-extrabold text-slate-900">
                      <IndianRupee className="h-4 w-4 text-slate-700" />
                      {service.price}
                    </p>
                  </div>

                  <Link
                    to={bookingTarget}
                    className="inline-flex items-center gap-1 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-blue-600"
                  >
                    <span>Book Service</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
