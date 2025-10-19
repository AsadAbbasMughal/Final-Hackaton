import { Navigate } from "react-router-dom";

export default function ProtectedAdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔒 Not logged in → go to login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // 🚫 Not admin → go to profile
  if (user.role !== "admin") {
    return <Navigate to="/profile" replace />;
  }

  // ✅ Admin → allowed
  return children;
}
