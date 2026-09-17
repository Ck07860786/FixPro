import { useSelector } from "react-redux";
import TechnicianHeader from "@/components/technician-dashboard/TechnicianHeader";
import TechnicianMetrics from "@/components/technician-dashboard/TechnicianMetrics";
import TechnicianProfileCard from "@/components/technician-dashboard/TechnicianProfileCard";
import TechnicianJobsView from "@/components/technician-dashboard/TechnicianJobsView";

export default function TechnicianDashboard() {
  const { user, technician, business } = useSelector((state) => state.auth);

  return (
    <div className="p-6 lg:p-8">
      <TechnicianHeader
        user={user}
        business={business}
        technician={technician}
      />
      <TechnicianMetrics technician={technician} />
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <TechnicianProfileCard user={user} technician={technician} />
        </div>
        <div className="lg:col-span-7">
          <TechnicianJobsView technician={technician} />
        </div>
      </div>
    </div>
  );
}
