// src/pages/CalendarPage.jsx
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // default styles
import { onAuthStateChanged } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { auth, db } from "../firebase";
import "./CalendarPage.css";

export default function CalendarPage() {
  const [habits, setHabits] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Fetch user habits
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

  // ✅ Extract completed dates
  const completedDates = habits
    .filter((h) => h.status === "complete" && h.lastCompleted)
    .map((h) => new Date(h.lastCompleted));

  // ✅ Highlight completed habit days
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      if (completedDates.some((d) => d.toDateString() === date.toDateString())) {
        return "completed-day";
      }
    }
    return null;
  };

  return (
    <div className="calendar-page">
      <header className="calendar-header">
        <h1>📅 Calendar</h1>
        <p>Track your habit completions over time.</p>
      </header>

      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileClassName={tileClassName}
      />

      <div className="calendar-info">
        <h2>Selected Date: {selectedDate.toDateString()}</h2>
        <ul>
          {habits
            .filter(
              (h) =>
                h.lastCompleted &&
                new Date(h.lastCompleted).toDateString() ===
                  selectedDate.toDateString()
            )
            .map((h) => (
              <li key={h.id}>
                ✅ {h.habit} (streak: {h.streak})
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
