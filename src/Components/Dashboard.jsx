import { useState } from "react";
import { IoIosClose, IoIosLogOut } from "react-icons/io";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoBarChartOutline, IoSettingsOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { BsJournalBookmark } from "react-icons/bs";
import { LiaAwardSolid } from "react-icons/lia";
import { FaRegUser } from "react-icons/fa6";

// Import pages
import DashboardPage from "./pages/DashboardPage";
import StatisticsPage from "./pages/StatisticsPage";
import CalendarPage from "./pages/CalendarPage";
import JournalPage from "./pages/JournalPage";
import AchievementsPage from "./pages/AchievementsPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import LogoutPage from "./pages/LogoutPage";

function Dashboard() {
  const [active, setActive] = useState("Dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false); // toggle collapse
  const [isMobileOpen, setIsMobileOpen] = useState(false); // toggle mobile sidebar

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

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-xl transition-all duration-300 
        ${isCollapsed ? "w-20" : "w-64"} 
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}
      >
        <nav className="p-4 font-roboto h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between pb-6">
            {!isCollapsed && <h1 className="text-2xl font-bold">HabitFlow</h1>}
            <button
              className="text-2xl md:hidden"
              onClick={() => setIsMobileOpen(false)}
            >
              <IoIosClose />
            </button>
            <button
              className="hidden md:block text-xl p-1"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? "➡️" : "⬅️"}
            </button>
          </div>

          {/* Menu Items */}
          <div className="space-y-2 flex-1">
            {menuItems.map((item) => (
              <div
                key={item.label}
                onClick={() => {
                  setActive(item.label);
                  setIsMobileOpen(false); // auto close on mobile
                }}
                className={`flex items-center gap-3 p-2 cursor-pointer rounded relative group
                  ${
                    active === item.label
                      ? "bg-blue-950 text-white"
                      : "hover:bg-blue-100"
                  }`}
              >
                <div className="text-xl">{item.icon}</div>
                {!isCollapsed && <span>{item.label}</span>}

                {/* Tooltip when collapsed */}
                {isCollapsed && (
                  <span className="absolute left-full ml-2 px-2 py-1 text-sm bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition">
                    {item.label}
                  </span>
                )}
              </div>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        {/* Mobile menu toggle button */}
        <button
          className="md:hidden m-4 p-2 bg-blue-950 text-white rounded"
          onClick={() => setIsMobileOpen(true)}
        >
          ☰
        </button>

        <div className="p-4">{renderPage()}</div>
      </div>
    </div>
  );
}

export default Dashboard;
