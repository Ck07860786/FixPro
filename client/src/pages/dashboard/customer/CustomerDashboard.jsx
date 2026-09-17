import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "@/features/services/serviceSlice";
import CustomerHeader from "@/components/customer-dashboard/CustomerHeader";
import CustomerStats from "@/components/customer-dashboard/CustomerStats";
import CustomerActivityFeed from "@/components/customer-dashboard/CustomerActivityFeed";
import CustomerServicesCatalog from "@/components/customer-dashboard/CustomerServicesCatalog";

export default function CustomerDashboard() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { services } = useSelector((state) => state.services);
  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);
  const { totalServices, activeServices, categoriesCount } = useMemo(() => {
    const total = services.length;
    const active = services.filter((s) => s.isActive).length;
    const uniqueCategories = new Set(services.map((s) => s.category).filter(Boolean));
    return {
      totalServices: total,
      activeServices: active,
      categoriesCount: uniqueCategories.size,
    };
  }, [services]);

  return (
    <div className="p-6 lg:p-8">
      <CustomerHeader user={user} />
      <CustomerStats
        totalServices={totalServices}
        activeServices={activeServices}
        categoriesCount={categoriesCount}
      />
      <div className="mb-8">
        <CustomerActivityFeed user={user} />
      </div>
      <CustomerServicesCatalog services={services} />
    </div>
  );
}
