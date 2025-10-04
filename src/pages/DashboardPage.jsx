// src/pages/DashboardPage.jsx
import React, { useEffect, useState } from "react";
import "./DashboardPage.css";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { db, auth } from "../firebase";
import { ref, push, set, onValue, update, remove } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

export default function DashboardPage() {
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("daily");

  // Habits state
  const [habits, setHabits] = useState([]);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newHabit, setNewHabit] = useState("");
  const [habitType, setHabitType] = useState("daily");

 // Fetch habits from Realtime DB (wait for user)
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      const habitsRef = ref(db, `habits/${user.uid}`);
      onValue(habitsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const now = Date.now();

          const parsed = Object.entries(data).map(([id, value]) => {
            // Reset to "in progress" if lastCompleted was 24h+ ago
            if (
              value.status === "complete" &&
              value.lastCompleted &&
              now - value.lastCompleted >= 24 * 60 * 60 * 1000
            ) {
              update(ref(db, `habits/${user.uid}/${id}`), {
                status: "in progress",
              });
              return { id, ...value, status: "in progress" };
            }
            return { id, ...value };
          });

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


  // Update progress dynamically based on completed habits
  useEffect(() => {
    if (habits.length === 0) {
      setProgress(0);
      return;
    }

    const completed = habits.filter((h) => h.status === "complete").length;
    const percentage = Math.round((completed / habits.length) * 100);
    setProgress(percentage);
  }, [habits]);

  // Add new habit
  const handleAddHabit = async (e) => {
    e.preventDefault();
    if (!newHabit.trim()) return;

    const user = auth.currentUser;
    if (!user) {
      console.error("Not logged in");
      return;
    }

    const habitsRef = ref(db, `habits/${user.uid}`);
    const newHabitRef = push(habitsRef);

    await set(newHabitRef, {
      habit: newHabit,
      type: habitType,
      streak: 0,
      status: "in progress",
      createdAt: Date.now(),
    });

    setNewHabit("");
    setHabitType("daily");
    setIsModalOpen(false);
  };
// Complete habit
const completeHabit = async (id) => {
  const user = auth.currentUser;
  if (!user) return;

  const habitRef = ref(db, `habits/${user.uid}/${id}`);

  onValue(
    habitRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const habit = snapshot.val();
        const now = Date.now();

        // Only allow if status is not complete OR 24h passed since last completion
        if (
          habit.status !== "complete" ||
          (habit.lastCompleted && now - habit.lastCompleted >= 24 * 60 * 60 * 1000)
        ) {
          const newStreak =
            habit.status === "complete" &&
            now - habit.lastCompleted < 24 * 60 * 60 * 1000
              ? habit.streak
              : habit.streak + 1;

          // ✅ Update main habit fields
          update(habitRef, {
            status: "complete",
            streak: newStreak,
            lastCompleted: now,
          });

          // ✅ Log this completion into a subpath: habits/{uid}/{habitId}/completions
          const completionsRef = ref(db, `habits/${user.uid}/${id}/completions`);
          const newCompletionRef = push(completionsRef);
          set(newCompletionRef, {
            completedAt: now,
          });
        }
      }
    },
    { onlyOnce: true }
  );
};

  // Delete habit
  const deleteHabit = async (id) => {
    const user = auth.currentUser;
    if (!user) return;

    const habitRef = ref(db, `habits/${user.uid}/${id}`);
    await remove(habitRef);
  };

  // Filter habits by type
  const filteredHabits = habits.filter((h) => h.type === activeTab);

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
          <button className="d-btn" onClick={() => setIsModalOpen(true)}>
            + Add New Habit
          </button>
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
            <h2 className="stats-h2">{habits.length}</h2>
            <p className="stats-p">Total Habits</p>
          </div>
        </div>
      </div>

      {/* Segmented Control */}
      <div className="div3">
        <div className="segmented-control">
          {["daily", "weekly", "monthly"].map((type) => (
            <button
              key={type}
              className={`segment ${activeTab === type ? "active" : ""}`}
              onClick={() => setActiveTab(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <div className="segment-content">
          <div className="content active">
            <div className="table-wrapper">
              {filteredHabits.length === 0 ? (
                <p className="no-habits">No habits added</p>
              ) : (
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
                      {filteredHabits.map((h) => {
                        const now = Date.now();
                        const isLocked =
                          h.status === "complete" &&
                          h.lastCompleted &&
                          now - h.lastCompleted < 24 * 60 * 60 * 1000;

                        return (
                          <tr key={h.id}>
                            <td>{h.habit}</td>
                            <td>{h.streak} 🔥</td>
                            <td
                              style={{
                                color: h.status === "complete" ? "green" : "brown",
                              }}
                            >
                              {h.status}
                            </td>
                            <td className="btn-habit">
                              <button
                                className="btn-complete"
                                disabled={isLocked} // ✅ disable if still within 24h
                                onClick={() => completeHabit(h.id)}
                              >
                                {isLocked ? "Wait 24h" : "Complete"}
                              </button>
                              <button
                                className="btn-delete"
                                onClick={() => deleteHabit(h.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>

                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Habit Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Habit</h2>
            <form onSubmit={handleAddHabit}>
              <input
                type="text"
                placeholder="Habit name"
                value={newHabit}
                onChange={(e) => setNewHabit(e.target.value)}
                required
              />
              <select
                value={habitType}
                onChange={(e) => setHabitType(e.target.value)}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
              <div className="modal-actions">
                <button type="submit">Add Habit</button>
                <button type="button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
