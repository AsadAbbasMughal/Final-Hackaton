// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";

// export default function Header() {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) setUser(JSON.parse(storedUser));
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     navigate("/login");
//   };

//   return (
//     <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//         {/* ✅ Logo */}
//         <Link to="/" className="text-2xl font-bold text-blue-600">
//           MyApp
//         </Link>

//         {/* ✅ Nav Links */}
//         <nav className="flex items-center space-x-6">
//           <Link
//             to="/"
//             className="text-gray-700 hover:text-blue-600 font-medium transition"
//           >
//             Home
//           </Link>

//           <Link
//             to="/about"
//             className="text-gray-700 hover:text-blue-600 font-medium transition"
//           >
//             About
//           </Link>

//           <Link
//             to="/services"
//             className="text-gray-700 hover:text-blue-600 font-medium transition"
//           >
//             Services
//           </Link>

//           <Link
//             to="/posts"
//             className="text-gray-700 hover:text-blue-600 font-medium transition"
//           >
//             Posts
//           </Link>

//           {/* ✅ If user logged in */}
//           {user ? (
//             <>
//               {user.role === "admin" && (
//                 <Link
//                   to="/admin/dashboard"
//                   className="text-gray-700 hover:text-blue-600 font-medium transition"
//                 >
//                   Admin
//                 </Link>
//               )}

//               {/* ✅ Create Post link (only for logged in users) */}
//               <Link
//                 to="/create-post"
//                 className="text-gray-700 hover:text-blue-600 font-medium transition"
//               >
//                 Create Post
//               </Link>

//               <Link
//                 to="/profile"
//                 className="text-gray-700 hover:text-blue-600 font-medium transition"
//               >
//                 {user.name || "Profile"}
//               </Link>

//               {/* ✅ Logout button separately */}
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link
//                 to="/login"
//                 className="text-gray-700 hover:text-blue-600 font-medium transition"
//               >
//                 Login
//               </Link>

//               <Link
//                 to="/signup"
//                 className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
//               >
//                 Signup
//               </Link>
//             </>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// }


import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";


export default function Header() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          MyApp
        </Link>

        <nav className="flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition">
            Home
          </Link>
          <Link to="/posts" className="text-gray-700 hover:text-blue-600 font-medium transition">
            Posts
          </Link>
          <Link
  to="/health-report"
  className="text-gray-700 hover:text-blue-600 font-medium transition"
>
  AI Health Report
</Link>

<Link to="/patients" className="bg-blue-500 text-white px-4 py-2 rounded-md">
  Manage Patients
</Link>



          {user ? (
            <>
              {user.role === "admin" && (
                <Link to="/admin/dashboard" className="text-gray-700 hover:text-blue-600 font-medium transition">
                  Admin
                </Link>
              )}
              <Link to="/create-post" className="text-gray-700 hover:text-blue-600 font-medium transition">
                Create Post
              </Link>
              <Link to="/profile" className="text-gray-700 hover:text-blue-600 font-medium transition">
                {user.name || "Profile"}
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium transition">
                Login
              </Link>
              <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                Signup
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
