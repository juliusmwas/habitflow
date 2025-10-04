// src/components/Navbar.jsx
import React from "react";
import { IoMenu } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";

import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-brand">HabitFlow</h1>
      </div>

      <div className="navbar-right">
        <FaRegBell className="navbar-icon" size={20} />
        <FaRegUserCircle className="navbar-icon" size={22} />
      </div>
    </header>
  );
}
