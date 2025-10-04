// src/pages/StatisticsPage.jsx
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { auth, db } from "../firebase";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "./StatisticsPage.css";

export default function StatisticsPage() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const habitsRef = ref(db, `habits/${user.uid}`);
        onValue(habitsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const parsed = Object.entries(data).map(([id, value]) => ({
              id,
              ...value,
            }));
            setHabits(parsed);
          } else {
            setHabits([]);
          }
        });
      } else {
        setHabits([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅ Stats
  const totalHabits = habits.length;
  const bestStreak =
    habits.length > 0 ? Math.max(...habits.map((h) => h.streak || 0)) : 0;

  const completedCount = habits.filter((h) => h.status === "complete").length;
  const avgCompletion =
    totalHabits > 0 ? Math.round((completedCount / totalHabits) * 100) : 0;

  // ✅ Weekly Data based on completions timestamps
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday start
  startOfWeek.setHours(0, 0, 0, 0);

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weeklyCounts = Array(7).fill(0);

  habits.forEach((h) => {
    if (h.completions) {
      Object.values(h.completions).forEach((c) => {
        const date = new Date(c.completedAt);
        if (date >= startOfWeek) {
          const day = date.getDay(); // 0 = Sun ... 6 = Sat
          weeklyCounts[day]++;
        }
      });
    }
  });

  const weeklyData = weekDays.map((day, i) => ({
    day,
    completed: weeklyCounts[i],
  }));

  // ✅ Pie chart (Completion overview)
  const pieData = [
    { name: "Completed", value: completedCount },
    { name: "In Progress", value: totalHabits - completedCount },
  ];

  const COLORS = ["#4CAF50", "#FF9800"];

  return (
    <div className="statistics-page">
      <header className="stats-header">
        <h1>Statistics 📊</h1>
        <p>Track your habit performance and progress over time.</p>
      </header>

      {/* Overview cards */}
      <section className="stats-overview">
        <div className="overview-card">
          <h2>{avgCompletion}%</h2>
          <p>Average Completion</p>
        </div>
        <div className="overview-card">
          <h2>{totalHabits}</h2>
          <p>Total Habits Created</p>
        </div>
        <div className="overview-card">
          <h2>{bestStreak} Days</h2>
          <p>Best Streak</p>
        </div>
      </section>

      {/* Charts */}
        <section className="stats-charts">
          <div className="chart-card">
            <h2>Weekly Progress</h2>
            <ResponsiveContainer width="100%" height={window.innerWidth < 480 ? 180 : 250}>
              <BarChart data={weeklyData}>
                <XAxis dataKey="day" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="completed" fill="#4CAF50" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h2>Monthly Overview</h2>
            <ResponsiveContainer width="100%" height={window.innerWidth < 480 ? 200 : 250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={window.innerWidth < 480 ? 60 : 80}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>


      {/* Insights */}
      <section className="stats-insights">
        <h2>Insights</h2>
        {habits.length === 0 ? (
          <p>No habits yet. Start tracking to see insights!</p>
        ) : (
          <ul>
            <li>🔥 Your best streak is <strong>{bestStreak} days</strong>.</li>
            <li>⚡ You completed <strong>{completedCount}</strong> habits.</li>
            <li>📅 This week, you completed <strong>{weeklyCounts.reduce((a, b) => a + b, 0)}</strong> tasks.</li>
          </ul>
        )}
      </section>
    </div>
  );
}
