import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="text-center">

        <h1 className="text-4xl font-bold">
          403
        </h1>

        <p className="text-gray-500 mt-2">
          You are not authorized to access this page.
        </p>

        <Link
          to="/"
          className="inline-block mt-5 bg-black text-white px-5 py-3 rounded-lg"
        >
          Go Home
        </Link>

      </div>

    </div>
  );
}