// src/pages/DashboardPage.jsx
import React, { useEffect, useState } from "react";
import "./DashboardPage.css";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { Habits } from "./Habit.js";

export default function DashboardPage() {
  // progress state
  const [progress, setProgress] = useState(0);

  // segmented control state
  const [activeTab, setActiveTab] = useState("daily");

  useEffect(() => {
    let startValue = 0;
    const endValue = 75;
    const speed = 20;

    const interval = setInterval(() => {
      startValue++;
      setProgress(startValue);
      if (startValue >= endValue) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="parent">
      {/* Hero Section */}
      <div className="div1">
        <div className="hero-text">
          <h1 className="hero-h1">
            How to Build <br /> a New Habit
          </h1>
          <p className="hero-p">
            This is essential for making progress <br /> in your health,
            happiness and your life.
          </p>
          <button className="d-btn">+ Add New Habit</button>
        </div>
        <div className="hero-image">
          <img src="./Colony.png" alt="" />
        </div>
      </div>

      {/* Stats Section */}
      <div className="div2">
        <div className="stats">
          <h1 className="stats-h1">Statistics</h1>
          <RiDashboardHorizontalLine className="dash-icon" />
        </div>

        {/* Circular Progress */}
        <div
          className="circular-progress"
          style={{
            background: `conic-gradient(
              #2563eb ${progress * 3.6}deg,
              #e5e7eb ${progress * 3.6}deg
            )`,
          }}
        >
          <div className="progress-content">
            <span className="progress-value">{progress}%</span>
            <p className="progress-text">Average Progress</p>
          </div>
        </div>

        {/* Small stats */}
        <div className="stats-content">
          <div className="stats-box">
            <h2 className="stats-h2">7 Days</h2>
            <p className="stats-p">Best Streaks</p>
          </div>
          <div className="stats-box">
            <h2 className="stats-h2">8</h2>
            <p className="stats-p">Perfect Days</p>
          </div>
          <div className="stats-box">
            <h2 className="stats-h2">24</h2>
            <p className="stats-p">Total Habits </p>
          </div>
        </div>
      </div>

      {/* Segmented Control */}
      <div className="div3">
        <div className="segmented-control">
          <button
            className={`segment ${activeTab === "daily" ? "active" : ""}`}
            onClick={() => setActiveTab("daily")}
          >
            Daily
          </button>
          <button
            className={`segment ${activeTab === "weekly" ? "active" : ""}`}
            onClick={() => setActiveTab("weekly")}
          >
            Weekly
          </button>
          <button
            className={`segment ${activeTab === "monthly" ? "active" : ""}`}
            onClick={() => setActiveTab("monthly")}
          >
            Monthly
          </button>
        </div>

        <div className="segment-content">
          {/* Daily */}
          {activeTab === "daily" && (
            <div className="content active">
              <table>
                <thead>
                  <tr>
                    <th>Habit</th>
                    <th>Streak</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Habits.map((h, index) => (
                    <tr key={index}>
                      <td>{h.habit}</td>
                      <td>{h.streak} 🔥</td>
                      <td>{h.status}</td>
                      <td className="btn-habit">
                        <button className="btn-complete">Complete</button>
                        <button className="btn-delete">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Weekly */}
          {activeTab === "weekly" && (
            <div className="content active">
              <table>
                <thead>
                  <tr>
                    <th>Habit</th>
                    <th>Streak</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Habits.map((h, index) => (
                    <tr key={index}>
                      <td>{h.habit}</td>
                      <td>{h.streak} 🔥</td>
                      <td>{h.status}</td>
                      <td className="btn-habit">
                        <button className="btn-complete">Complete</button>
                        <button className="btn-delete">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            
            </div>
          )}

          {/* Monthly */}
          {activeTab === "monthly" && (
            <div className="content active">
              <table>
                <thead>
                  <tr>
                    <th>Habit</th>
                    <th>Streak</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Habits.map((h, index) => (
                    <tr key={index}>
                      <td>{h.habit}</td>
                      <td>{h.streak} 🔥</td>
                      <td>{h.status}</td>
                      <td className="btn-habit">
                        <button className="btn-complete">Complete</button>
                        <button className="btn-delete">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
