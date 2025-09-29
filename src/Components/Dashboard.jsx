// Dashboard.jsx
import React, { useState, useEffect } from "react";
import { IoIosClose, IoIosLogOut } from "react-icons/io";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoBarChartOutline, IoSettingsOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { BsJournalBookmark } from "react-icons/bs";
import { LiaAwardSolid } from "react-icons/lia";
import { FaRegUser } from "react-icons/fa6";

// pages
import DashboardPage from "./pages/DashboardPage";
import StatisticsPage from "./pages/StatisticsPage";
import CalendarPage from "./pages/CalendarPage";
import JournalPage from "./pages/JournalPage";
import AchievementsPage from "./pages/AchievementsPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import LogoutPage from "./pages/LogoutPage";

export default function Dashboard() {
  const [active, setActive] = useState("Dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false); // collapsed = icons only
  const [isMobileOpen, setIsMobileOpen] = useState(false); // mobile drawer open
  const [isDesktop, setIsDesktop] = useState(true);

  // widths in px (keeps inline style exact)
  const EXPANDED_W = 256; // 16rem
  const COLLAPSED_W = 80; // 5rem

  // keep track of desktop / mobile
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
      if (window.innerWidth >= 768) setIsMobileOpen(false); // ensure drawer closed on desktop
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // compute sidebar width and main left margin
  const sidebarWidth = isCollapsed ? COLLAPSED_W : EXPANDED_W;
  const mainMarginLeft = isDesktop ? sidebarWidth : 0;
  const drawerVisible = isDesktop || isMobileOpen; // show sidebar when desktop or mobile opened

  const menuItems = [
    { label: "Dashboard", icon: <LuLayoutDashboard /> },
    { label: "Statistics", icon: <IoBarChartOutline /> },
    { label: "Calendar", icon: <SlCalender /> },
    { label: "Journal", icon: <BsJournalBookmark /> },
    { label: "Achievements", icon: <LiaAwardSolid /> },
    { label: "Settings", icon: <IoSettingsOutline /> },
    { label: "Profile", icon: <FaRegUser /> },
    { label: "Logout", icon: <IoIosLogOut /> },
  ];

  const renderPage = () => {
    switch (active) {
      case "Dashboard":
        return <DashboardPage />;
      case "Statistics":
        return <StatisticsPage />;
      case "Calendar":
        return <CalendarPage />;
      case "Journal":
        return <JournalPage />;
      case "Achievements":
        return <AchievementsPage />;
      case "Settings":
        return <SettingsPage />;
      case "Profile":
        return <ProfilePage />;
      case "Logout":
        return <LogoutPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div >
      {/* Sidebar (fixed) */}
      <aside
        aria-label="Sidebar"
        style={{
          width: sidebarWidth,
          transform: drawerVisible ? "translateX(0)" : "translateX(-100%)",
        }}
        className="fixed top-0 left-0  h-screen bg-white shadow-xl transition-transform duration-200 z-50">
        <nav className="h-full flex flex-col">
          <div className="flex items-center justify-between pb-6 px-6">
            {!isCollapsed && <h1 className="text-2xl font-bold ">HabitFlow</h1>}

            {/* mobile close button */}
            {!isDesktop && (
              <button
                onClick={() => setIsMobileOpen(false)}
                className="text-xl p-1"
                aria-label="Close menu"
              >
                <IoIosClose />
              </button>
            )}

            {/* collapse toggle (desktop only) */}
            {isDesktop && (
              <button
                onClick={() => setIsCollapsed((s) => !s)}
                title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                className="hidden md:inline-block text-lg px-2"
              >
                {isCollapsed ? "➡️" : "⬅️"}
              </button>
            )}
          </div>

          <div className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setActive(item.label);
                  setIsMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3 p-2 rounded text-left transition-colors duration-150
                  ${active === item.label ? "bg-blue-950 text-white" : "hover:bg-blue-100"}
                `}
              >
                <div className="text-xl">{item.icon}</div>
                {!isCollapsed && <span className="truncate">{item.label}</span>}

                {isCollapsed && (
                  <span className="absolute left-full ml-2 px-2 py-1 text-sm bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100">
                    {item.label}
                  </span>
                )}
              </button>
            ))}
          </div>
        </nav>
      </aside>

      {/* Mobile overlay (when drawer open) */}
      {isMobileOpen && !isDesktop && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden
        />
      )}

      {/* Main content area: margin-left is inline to guarantee it ALWAYS sits to the right of the fixed sidebar */}
      <main
        style={{
          marginLeft: mainMarginLeft,
          transition: "margin-left 200ms ease",
        }}
        className="min-h-screen bg-gray-50"
      >
        {/* Mobile hamburger toggle */}
        {!isDesktop && (
          <div className="p-4">
            <button
              className="p-2 bg-blue-950 text-white rounded"
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open menu"
            >
              ☰
            </button>
          </div>
        )

        /* page content */}
        <div className="p-6">{renderPage()}</div>
      </main>
    </div>
  );
}
