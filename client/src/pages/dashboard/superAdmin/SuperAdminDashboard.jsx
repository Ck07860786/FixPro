import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardStats } from "@/features/superAdmin/superAdminSlice";
import DashboardHeader from "@/components/superadmin-dashboard/DashboardHeader";
import DashboardStats from "@/components/superadmin-dashboard/DashboardStats";
import BusinessStatusChart from "@/components/superadmin-dashboard/BusinessStatusChart";
import UserRoleChart from "@/components/superadmin-dashboard/UserRoleChart";
import RecentBusinesses from "@/components/superadmin-dashboard/RecentBusinesses";
import RecentUsers from "@/components/superadmin-dashboard/RecentUsers";
import ServiceRequestOverview from "@/components/superadmin-dashboard/ServiceRequestOverview";
import { Loader2 } from "lucide-react";

function SuperAdminDashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { stats, recentBusinesses, recentUsers, recentServiceRequests, loading, error } =
    useSelector((state) => state.superAdmin);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  if (loading && !stats) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-violet-600" />
          <p className="text-sm text-slate-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="rounded-2xl border border-red-200 bg-red-50 px-8 py-6 text-center">
          <p className="text-sm font-medium text-red-700">{error}</p>
          <button
            onClick={() => dispatch(fetchDashboardStats())}
            className="mt-3 rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">
      <DashboardHeader user={user} stats={stats} />
      <DashboardStats stats={stats} />

      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <BusinessStatusChart stats={stats} />
        <UserRoleChart stats={stats} />
      </div>

      <ServiceRequestOverview stats={stats} recentServiceRequests={recentServiceRequests} />

      <div className="grid gap-6 lg:grid-cols-2">
        <RecentBusinesses businesses={recentBusinesses} />
        <RecentUsers users={recentUsers} />
      </div>
    </div>
  );
}

export default SuperAdminDashboard;