import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import ServicesHeroBanner from "@/components/public-services/ServicesHeroBanner";
import ServicesFilterBar from "@/components/public-services/ServicesFilterBar";
import PublicServiceCard from "@/components/public-services/PublicServiceCard";
import ServiceDetailModal from "@/components/public-services/ServiceDetailModal";
import ServicesLoadingSkeleton from "@/components/public-services/ServicesLoadingSkeleton";
import ServicesEmptyState from "@/components/public-services/ServicesEmptyState";
import { getPublicServices } from "@/features/services/serviceApi";

const defaultFallbackServices = [
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

export default function ExploreServices() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const initialCat = searchParams.get("category") || "All";
  const initialSearch = searchParams.get("search") || "";

  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortOption, setSortOption] = useState("default");
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);

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
    if (sortOption !== "default") {
      params.sort = sortOption;
    }

    getPublicServices(params)
      .then((data) => {
        if (!isMounted) return;
        if (data.services && data.services.length > 0) {
          setServices(data.services);
        } else if (selectedCategory === "All" && !searchQuery.trim()) {
          setServices(defaultFallbackServices);
        } else {
          setServices([]);
        }

        if (data.categories && data.categories.length > 0) {
          setCategories(data.categories);
        } else {
          setCategories(["HVAC", "Appliance", "Plumbing", "Electrical", "Cleaning"]);
        }
      })
      .catch(() => {
        if (!isMounted) return;
        let filtered = defaultFallbackServices;
        if (selectedCategory !== "All") {
          filtered = filtered.filter((s) => s.category === selectedCategory);
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          filtered = filtered.filter(
            (s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
          );
        }
        setServices(filtered);
        setCategories(["HVAC", "Appliance", "Plumbing", "Electrical", "Cleaning"]);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedCategory, searchQuery, sortOption]);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    const newParams = new URLSearchParams(searchParams);
    if (cat === "All") {
      newParams.delete("category");
    } else {
      newParams.set("category", cat);
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    const newParams = new URLSearchParams(searchParams);
    if (!query.trim()) {
      newParams.delete("search");
    } else {
      newParams.set("search", query);
    }
    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setSortOption("default");
    setSearchParams({});
  };

  const getBookingTarget = (service) => {
    if (!isAuthenticated) return "/login";
    if (user?.role === "ADMIN") return "/business/services";
    if (user?.role === "TECHNICIAN") return "/technician/dashboard";
    return `/customer/book-service?serviceId=${service._id}&businessId=${service.businessId?._id || service.businessId || ""}`;
  };

  return (
    <>
      <Header />
      <div className="min-h-screen text-slate-900 flex flex-col justify-between">

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10 flex-1 w-full">
          <ServicesHeroBanner
            totalServices={services.length}
            categoriesCount={categories.length}
          />

          <ServicesFilterBar
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            sortOption={sortOption}
            onSortChange={setSortOption}
            totalCount={services.length}
            onResetFilters={handleResetFilters}
          />

          {loading ? (
            <ServicesLoadingSkeleton />
          ) : services.length === 0 ? (
            <ServicesEmptyState onReset={handleResetFilters} />
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <PublicServiceCard
                  key={service._id}
                  service={service}
                  onQuickView={setSelectedService}
                  bookingTarget={getBookingTarget(service)}
                />
              ))}
            </div>
          )}
        </main>

        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      </div>
      <Footer />
    </>
  );
}
