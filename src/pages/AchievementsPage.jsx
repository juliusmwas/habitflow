// src/pages/AchievementsPage.jsx
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { auth, db } from "../firebase";
import "./AchievementsPage.css";

export default function AchievementsPage() {
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

  // ✅ Calculate achievements
  const totalHabits = habits.length;
  const bestStreak =
    habits.length > 0 ? Math.max(...habits.map((h) => h.streak || 0)) : 0;
  const completedCount = habits.filter((h) => h.status === "complete").length;

  const achievements = [
    {
      id: 1,
      title: "First Habit Added",
      description: "You created your first habit!",
      unlocked: totalHabits >= 1,
      icon: "🎉",
    },
    {
      id: 2,
      title: "7-Day Streak",
      description: "Maintain a streak for 7 days.",
      unlocked: bestStreak >= 7,
      icon: "🔥",
    },
    {
      id: 3,
      title: "Habit Builder",
      description: "Create 10 habits.",
      unlocked: totalHabits >= 10,
      icon: "⚡",
    },
    {
      id: 4,
      title: "Consistency Master",
      description: "Complete 30 habits in total.",
      unlocked: completedCount >= 30,
      icon: "🌟",
    },
  ];

  return (
    <div className="achievements-page">
      <header className="achievements-header">
        <h1>🏆 Achievements</h1>
        <p>Celebrate your milestones and keep going strong!</p>
      </header>

      <section className="achievements-grid">
        {achievements.map((ach) => (
          <div
            key={ach.id}
            className={`achievement-card ${
              ach.unlocked ? "unlocked" : "locked"
            }`}
          >
            <div className="icon">{ach.icon}</div>
            <h3>{ach.title}</h3>
            <p>{ach.description}</p>
            <span className="status">
              {ach.unlocked ? "Unlocked ✅" : "Locked 🔒"}
            </span>
          </div>
        ))}
      </section>
    </div>
  );
}
