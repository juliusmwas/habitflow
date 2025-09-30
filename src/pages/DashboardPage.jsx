// src/pages/DashboardPage.jsx
import React from "react";
import "./DashboardPage.css";

export default function DashboardPage() {
  return (
    <div className="dashboard-page">
      {/* Welcome Section */}
      <header className="welcome">
        <h1>Hello Julius 👋</h1>
        <p>Keep building strong habits today!</p>
      </header>

      {/* Quick Stats */}
      <section className="quick-stats">
        <div className="stat-card">
          <h2>5</h2>
          <p>Active Habits</p>
        </div>
        <div className="stat-card">
          <h2>7 Days</h2>
          <p>Longest Streak</p>
        </div>
        <div className="stat-card">
          <h2>82%</h2>
          <p>Completion Rate</p>
        </div>
      </section>

      {/* Today's Habits */}
      <section className="todays-habits">
        <h2>Today's Habits</h2>
        <ul>
          <li><input type="checkbox" /> Drink 8 glasses of water</li>
          <li><input type="checkbox" /> Meditate for 10 minutes</li>
          <li><input type="checkbox" /> Read 20 pages</li>
          <li><input type="checkbox" /> Workout (30 mins)</li>
        </ul>
      </section>

      {/* Recent Activity */}
      <section className="recent-activity">
        <h2>Recent Activity</h2>
        <ul>
          <li>✅ Completed “Morning Run” yesterday</li>
          <li>✅ Logged “Gratitude Journal” 2 days ago</li>
          <li>🏆 Earned “Consistency” badge last week</li>
        </ul>
      </section>

      {/* Achievements Preview */}
      <section className="achievements-preview">
        <h2>Next Achievement</h2>
        <p>You’re 2 days away from unlocking the <strong>7-Day Streak</strong> badge! 🏅</p>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <button className="primary-btn">+ Add New Habit</button>
        <button className="secondary-btn">View Full Statistics</button>
      </section>
    </div>
  );
}
