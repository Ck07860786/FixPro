import { useSelector } from "react-redux";
import AdminDashboard from "./admin/AdminDashboard";
import CustomerDashboard from "./customer/CustomerDashboard";
import TechnicianDashboard from "./technician/TechnicianDashboard";

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  if (user?.role === "CUSTOMER") {
    return <CustomerDashboard />;
  }

  if (user?.role === "TECHNICIAN") {
    return <TechnicianDashboard />;
  }

  return <AdminDashboard />;
}
