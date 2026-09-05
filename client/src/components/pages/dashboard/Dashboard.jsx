import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../../features/auth/authSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, business } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4 flex justify-between">
        <div>
          <h1 className="font-bold text-xl">FixPro</h1>

          <p className="text-sm text-gray-500">Business Dashboard</p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </header>

      <main className="p-8">
        <h2 className="text-2xl font-bold">Welcome, {user?.name}</h2>

        <p className="mt-2 text-gray-600">Role: {user?.role}</p>

        {business && (
          <div className="mt-6 bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg">{business.name}</h3>

            <p className="text-gray-500 mt-2">Status: {business.status}</p>
          </div>
        )}
      </main>
    </div>
  );
}
