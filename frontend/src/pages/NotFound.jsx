import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-center items-center px-6">

      <h1 className="text-8xl font-bold text-red-500">
        404
      </h1>

      <h2 className="text-3xl font-semibold mt-4">
        Page Not Found
      </h2>

      <p className="text-gray-400 mt-4 text-center max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>

      <Link
        to="/dashboard"
        className="mt-8 bg-red-600 hover:bg-red-700 px-8 py-3 rounded-lg font-semibold"
      >
        Go to Dashboard
      </Link>

    </div>
  );
}

export default NotFound;