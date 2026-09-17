import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar role={user?.role} />

      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
