// src/pages/StatisticsPage.jsx
import React from "react";
import "./StatisticsPage.css";
export default function StatisticsPage() {
  return (
    <div className="statistics-page">
      <header className="stats-header">
        <h1>Statistics 📊</h1>
        <p>Track your habit performance and progress over time.</p>
      </header>

      {/* Overview cards */}
      <section className="stats-overview">
        <div className="overview-card">
          <h2>82%</h2>
          <p>Average Completion</p>
        </div>
        <div className="overview-card">
          <h2>12</h2>
          <p>Total Habits Created</p>
        </div>
        <div className="overview-card">
          <h2>7 Days</h2>
          <p>Best Streak</p>
        </div>
      </section>

      {/* Placeholder charts */}
      <section className="stats-charts">
        <div className="chart-card">
          <h2>Weekly Progress</h2>
          <div className="chart-placeholder">📈</div>
        </div>

        <div className="chart-card">
          <h2>Monthly Overview</h2>
          <div className="chart-placeholder">📊</div>
        </div>
      </section>

      {/* Insights */}
      <section className="stats-insights">
        <h2>Insights</h2>
        <ul>
          <li>🔥 You are most consistent on <strong>Mondays</strong>.</li>
          <li>⚡ Meditation is your top completed habit.</li>
          <li>🌙 Night habits have lower completion rates than morning ones.</li>
        </ul>
      </section>
    </div>
  );
}
