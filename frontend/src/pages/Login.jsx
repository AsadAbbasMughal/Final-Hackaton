// import { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// export default function Login() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const API = import.meta.env.VITE_API_URL; // ✅ Env se API URL

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(`${API}/api/auth/login`, formData); // ✅ Env use

//       // Save login info
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));

//       const user = res.data.user;
//       setMessage("✅ Login successful!");

//       // ⏩ Navigate based on role
//       setTimeout(() => {
//         if (user.role === "admin") {
//           navigate("/admin/dashboard");
//         } else {
//           navigate("/profile");
//         }
//       }, 1000);
//     } catch (error) {
//       console.error("Login error:", error.response?.data || error.message);
//       setMessage("❌ Invalid credentials. Please try again.");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
//       >
//         <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
//           Login
//         </h2>

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           className="w-full border border-gray-300 p-3 rounded-md mb-4 focus:ring-2 focus:ring-blue-400"
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//           className="w-full border border-gray-300 p-3 rounded-md mb-6 focus:ring-2 focus:ring-blue-400"
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
//         >
//           Login
//         </button>

//         {message && <p className="text-center mt-4 text-gray-700">{message}</p>}

//         <p className="text-center mt-4 text-sm text-gray-600">
//           Don’t have an account?{" "}
//           <Link to="/signup" className="text-blue-600 hover:underline">
//             Signup
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../components/context/UserContext";

export default function Login() {
  const { login } = useContext(UserContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        formData
      );

      // context update
      login(res.data.user, res.data.token);
      setMessage("✅ Login successful!");

      setTimeout(() => {
        if (res.data.user.role === "admin") navigate("/admin/dashboard");
        else navigate("/profile");
      }, 500);
    } catch (err) {
      setMessage("❌ Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-3 rounded-md mb-4 focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 p-3 rounded-md mb-6 focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Login
        </button>

        {message && <p className="text-center mt-4 text-gray-700">{message}</p>}

        <p className="text-center mt-4 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}

