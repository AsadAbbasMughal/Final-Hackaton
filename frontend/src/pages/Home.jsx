import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <h1 className="text-5xl font-extrabold text-blue-800 mb-4">Welcome to MERN Auth App</h1>
      <p className="text-gray-700 text-lg mb-8">A simple login, signup, and admin panel system.</p>
      <div className="space-x-4">
        <Link
          to="/signup"
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
        >
          Signup
        </Link>
        <Link
          to="/login"
          className="bg-gray-800 text-white px-5 py-2 rounded-md hover:bg-gray-900"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
