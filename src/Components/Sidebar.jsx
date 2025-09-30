// src/components/Sidebar.jsx
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoBarChartOutline, IoSettingsOutline } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { BsJournalBookmark } from "react-icons/bs";
import { LiaAwardSolid } from "react-icons/lia";
import { FaRegUser } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import "./Sidebar.css";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("sidebar-collapsed")) || false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    document.body.setAttribute(
      "data-sidebar",
      collapsed ? "collapsed" : "expanded"
    );
    localStorage.setItem("sidebar-collapsed", JSON.stringify(collapsed));
  }, [collapsed]);

  const menu = [
    { to: "/dashboard", label: "Dashboard", icon: <LuLayoutDashboard /> },
    { to: "/dashboard/statistics", label: "Statistics", icon: <IoBarChartOutline /> },
    { to: "/dashboard/calendar", label: "Calendar", icon: <SlCalender /> },
    { to: "/dashboard/journal", label: "Journal", icon: <BsJournalBookmark /> },
    { to: "/dashboard/achievements", label: "Achievements", icon: <LiaAwardSolid /> },
    { to: "/dashboard/settings", label: "Settings", icon: <IoSettingsOutline /> },
    { to: "/dashboard/profile", label: "Profile", icon: <FaRegUser /> },
    { to: "/dashboard/logout", label: "Logout", icon: <IoIosLogOut /> },
  ];

  return (
    <aside
      className={`sidebar ${collapsed ? "collapsed" : "expanded"}`}
      aria-label="Main navigation"
    >
      <div className="sidebar-top">
        {!collapsed && <h1 className="brand-title">HabitFlow</h1>}

        <button
          className="collapse-btn"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={() => setCollapsed((c) => !c)}
        >
          {collapsed ? "➜" : "⬅"}
        </button>
      </div>

      <nav className="sidebar-nav">
        {menu.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/dashboard"}
            className={({ isActive }) =>
              "nav-item" + (isActive ? " active" : "")
            }
            title={collapsed ? item.label : undefined}
          >
            <span className="nav-icon">{item.icon}</span>
            {!collapsed && <span className="nav-label">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
