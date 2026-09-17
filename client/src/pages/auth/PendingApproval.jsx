import { Link } from "react-router-dom";

export default function PendingApproval() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">

        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl">⏳</span>
        </div>

        <h1 className="text-2xl font-bold">
          Registration Submitted
        </h1>

        <p className="text-gray-500 mt-4">
          Your business registration is currently under review.
          You will be able to access the dashboard after approval.
        </p>

        <Link
          to="/login"
          className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-lg"
        >
          Go to Login
        </Link>

      </div>
    </div>
  );
}