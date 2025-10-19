import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Profile from "./pages/Profile.jsx";

import AdminLayout from "./admin/AdminLayout.jsx";
import Dashboard from "./admin/Dashboard.jsx";
import Users from "./admin/Users.jsx";
import Settings from "./admin/Settings.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute.jsx";

// ✅ Posts
import PostsList from "./pages/Posts/PostsList.jsx";
import CreatePost from "./pages/Posts/CreatePost.jsx";

// ✅ Patients
import PatientsList from "./pages/Patients/PatientsList.jsx";
import AddPatient from "./pages/Patients/AddPatient.jsx";
import EditPatient from "./pages/Patients/EditPatient.jsx";
import PatientReports from "./pages/Patients/PatientReports.jsx"; // ✅ NEW

// ✅ React Context
import { UserProvider } from "./components/context/UserContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<App />}>
            {/* Public Routes */}
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />

            {/* Posts */}
            <Route path="posts" element={<PostsList />} />
            <Route
              path="create-post"
              element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              }
            />

            {/* Profile */}
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Patients CRUD */}
            <Route
              path="patients"
              element={
                <ProtectedRoute>
                  <PatientsList />
                </ProtectedRoute>
              }
            />
            <Route
              path="patients/new"
              element={
                <ProtectedRoute>
                  <AddPatient />
                </ProtectedRoute>
              }
            />
            <Route
              path="patients/:id/edit"
              element={
                <ProtectedRoute>
                  <EditPatient />
                </ProtectedRoute>
              }
            />
            
            {/* ✅ Patient Reports */}
            <Route
              path="patients/:id/reports"
              element={
                <ProtectedRoute>
                  <PatientReports />
                </ProtectedRoute>
              }
            />

            {/* Admin */}
            <Route
              path="admin"
              element={
                <ProtectedAdminRoute>
                  <AdminLayout />
                </ProtectedAdminRoute>
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
