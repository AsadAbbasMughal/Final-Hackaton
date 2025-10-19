import { Outlet } from "react-router-dom";
import Header from "./components/common/Header.jsx";
import Footer from "./components/common/Footer.jsx";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header - fixed on top */}
      <Header />

      {/* Main content (padded down to avoid hiding under header) */}
      <main className="flex-1 ">
        {/* pt-24 = padding-top: 6rem, ensures content starts below header */}
        <Outlet />
      </main>

      {/* Footer - stays at bottom */}
      <Footer />
    </div>
  );
}
