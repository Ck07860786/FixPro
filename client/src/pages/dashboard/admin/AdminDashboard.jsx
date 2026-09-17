import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTechnicians } from "@/features/technicians/technicianSlice";
import { fetchServices } from "@/features/services/serviceSlice";
import DashboardHeader from "@/components/admin-dashboard/DashboardHeader";
import DashboardStats from "@/components/admin-dashboard/DashboardStats";
import TechnicianAvailabilityBreakdown from "@/components/admin-dashboard/TechnicianAvailabilityBreakdown";
import ServiceCategoryDistribution from "@/components/admin-dashboard/ServiceCategoryDistribution";
import DashboardTechnicianRoster from "@/components/admin-dashboard/DashboardTechnicianRoster";
import DashboardServicesList from "@/components/admin-dashboard/DashboardServicesList";
export default function AdminDashboard() {
  const dispatch = useDispatch();

  const { business } = useSelector((state) => state.auth);
  const { technicians } = useSelector((state) => state.technicians);
  const { services } = useSelector((state) => state.services);
  useEffect(() => {
    dispatch(fetchTechnicians());
    dispatch(fetchServices());
  }, [dispatch]);
  const stats = useMemo(() => {
    const totalTechnicians = technicians.length;
    const activeTechnicians = technicians.filter((t) => t.isActive).length;
    const availableTechnicians = technicians.filter(
      (t) => t.isActive && t.availabilityStatus === "AVAILABLE"
    ).length;

    const totalServices = services.length;
    const activeServices = services.filter((s) => s.isActive).length;
    const avgServicePrice =
      totalServices > 0
        ? services.reduce((acc, s) => acc + (Number(s.price) || 0), 0) /
          totalServices
        : 0;

    return {
      totalTechnicians,
      activeTechnicians,
      availableTechnicians,
      totalServices,
      activeServices,
      avgServicePrice,
    };
  }, [technicians, services]);

  return (
    <div className="p-6 lg:p-8">
      <DashboardHeader business={business} />
      <DashboardStats
        totalTechnicians={stats.totalTechnicians}
        availableTechnicians={stats.availableTechnicians}
        activeTechnicians={stats.activeTechnicians}
        totalServices={stats.totalServices}
        activeServices={stats.activeServices}
        avgServicePrice={stats.avgServicePrice}
      />
      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <TechnicianAvailabilityBreakdown technicians={technicians} />
        <ServiceCategoryDistribution services={services} />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <DashboardTechnicianRoster technicians={technicians} />
        <DashboardServicesList services={services} />
      </div>
    </div>
  );
}
