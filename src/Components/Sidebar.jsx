
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {/* Top Logo / App Name */}
      <div className="sidebar__logo">
        <span role="img" aria-label="logo">🔥</span>
        {!isCollapsed && <h2>Habit Flow</h2>}
      </div>

      {/* Navigation Links */}
      <nav className="sidebar__nav">
        <NavLink to="/dashboard/home" className="sidebar__link">
          <span role="img" aria-label="home">🏠</span>
          {!isCollapsed && <span>Dashboard</span>}
        </NavLink>
        <NavLink to="/dashboard/habits" className="sidebar__link">
          <span role="img" aria-label="habits">📋</span>
          {!isCollapsed && <span>Habits</span>}
        </NavLink>
        <NavLink to="/dashboard/analytics" className="sidebar__link">
          <span role="img" aria-label="analytics">📊</span>
          {!isCollapsed && <span>Analytics</span>}
        </NavLink>
        <NavLink to="/dashboard/calendar" className="sidebar__link">
          <span role="img" aria-label="calendar">📅</span>
          {!isCollapsed && <span>Calendar</span>}
        </NavLink>
        <NavLink to="/dashboard/journal" className="sidebar__link">
          <span role="img" aria-label="journal">📝</span>
          {!isCollapsed && <span>Journal</span>}
        </NavLink>
        <NavLink to="/dashboard/achievements" className="sidebar__link">
          <span role="img" aria-label="achievements">🏆</span>
          {!isCollapsed && <span>Achievements</span>}
        </NavLink>
        <NavLink to="/dashboard/settings" className="sidebar__link">
          <span role="img" aria-label="settings">⚙️</span>
          {!isCollapsed && <span>Settings</span>}
        </NavLink>
      </nav>

      {/* Collapse Button */}
      <button 
        className="sidebar__toggle" 
        onClick={toggleSidebar} 
        aria-expanded={!isCollapsed}
      >
        {isCollapsed ? "➡️" : "⬅️"}
      </button>
    </aside>
  );
}
