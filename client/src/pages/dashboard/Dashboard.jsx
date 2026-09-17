import { useSelector } from "react-redux";
import AdminDashboard from "./admin/AdminDashboard";
import CustomerDashboard from "./customer/CustomerDashboard";

export default function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  if (user?.role === "CUSTOMER") {
    return <CustomerDashboard />;
  }

  return <AdminDashboard />;
}
