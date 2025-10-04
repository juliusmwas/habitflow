// src/DashboardLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Components/Sidebar.jsx";
import Navbar from "./Components/Navbar.jsx"; // assume you have a navbar
import "./DashboardLayout.css";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard-container">
      {/* Navbar with menu icon */}
      <Navbar onMenuClick={() => setSidebarOpen(true)} />

      <div className="dashboard-body">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="dashboard-main">
          <Outlet />
        </main>
      </div>

      {/* Overlay when sidebar is open on mobile */}
      {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
}
