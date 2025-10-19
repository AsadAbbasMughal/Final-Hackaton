// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function Profile() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       axios
//         .get("http://localhost:8000/api/auth/me", {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         .then((res) => setUser(res.data))
//         .catch(() => setUser(null));
//     }
//   }, []);

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-blue-50">
//       {user ? (
//         <div className="bg-white p-8 rounded-lg shadow-md">
//           <h2 className="text-3xl font-bold text-blue-600 mb-4">
//             Welcome, {user.name} 👋
//           </h2>
//           <p>Email: {user.email}</p>
//         </div>
//       ) : (
//         <p className="text-gray-700 text-lg">Please login to view your profile.</p>
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user info from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-300">
      <div className="bg-white/70 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-md text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-6">
          👋 Welcome{user ? `, ${user.name}` : ""}
        </h1>

        {user ? (
          <div className="space-y-4">
            <p className="text-gray-700 text-lg">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">User ID:</span> {user.id}
            </p>
             <p className="text-gray-600">
              <span className="font-semibold">Role:</span> {user.role}
            </p>
          </div>
        ) : (
          <p className="text-gray-500">No user data found. Please log in.</p>
        )}

        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
          }}
          className="mt-8 bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
