import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white flex flex-col p-5 space-y-4">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <Link to="/admin/dashboard" className="hover:bg-blue-700 p-2 rounded">
          Dashboard
        </Link>
        <Link to="/admin/users" className="hover:bg-blue-700 p-2 rounded">
          Users
        </Link>
        <Link to="/admin/settings" className="hover:bg-blue-700 p-2 rounded">
          Settings
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Outlet /> {/* Render nested routes here */}
      </div>
    </div>
  );
}
