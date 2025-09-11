// src/Dashboard.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { LuClipboardPenLine } from "react-icons/lu";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { ref, set, get, update, onValue } from "firebase/database"; // ✅ Realtime DB
import { auth, db } from "./firebase.js";

import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const authInstance = getAuth();

  // --- User state ---
  const [userName, setUserName] = useState("");

  // --- Dropdown state ---
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // --- Modal state ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [habitName, setHabitName] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [reminder, setReminder] = useState("");
  const [category, setCategory] = useState("");

  // --- Habits state ---
  const [habits, setHabits] = useState([]);
  const [view, setView] = useState("daily");
  const [congrats, setCongrats] = useState("");
  const [countdown, setCountdown] = useState("");

  // ✅ Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      if (user) {
        setUserName(user.displayName || user.email || "User");
      } else {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [authInstance, navigate]);

  // ✅ Load habits from RTDB and handle daily reset + streak break
  useEffect(() => {
    if (!auth.currentUser) return;

    const habitsRef = ref(db, `habits/${auth.currentUser.uid}`);
    const unsubscribe = onValue(habitsRef, async (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const habitList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        // --- Reset & streak-break logic ---
        const todayStr = new Date().toDateString();
        for (const habit of habitList) {
          if (habit.lastReset !== todayStr) {
            const habitRef = ref(db, `habits/${auth.currentUser.uid}/${habit.id}`);
            let newStreak = habit.streak;

            // If user didn’t complete yesterday → streak breaks
            if (habit.completedToday === false) {
              newStreak = 0;
            }

            await update(habitRef, {
              completedToday: false,
              lastReset: todayStr,
              streak: newStreak,
              totalPossible: habit.totalPossible + 1,
            });
          }
        }

        setHabits(habitList);
      } else {
        setHabits([]);
      }
    });

    return () => unsubscribe();
  }, [auth.currentUser]);

  // ✅ Countdown timer (until midnight)
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);

      const diff = midnight - now;

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown(`Resets in ${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- Modal handlers ---
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // --- Add Habit ---
  const handleAddHabit = async () => {
    if (!habitName) return;

    const userId = auth.currentUser.uid;
    const habitId = Date.now().toString();

    const newHabit = {
      userId,
      name: habitName,
      frequency,
      reminder,
      category,
      createdAt: new Date().toISOString(),
      completedToday: false,
      streak: 0,
      totalCompletions: 0,
      totalPossible: 0,
      lastCompletedAt: null,
      lastReset: new Date().toDateString(),
    };

    try {
      await set(ref(db, `habits/${userId}/${habitId}`), newHabit);
      setHabitName("");
      setFrequency("daily");
      setReminder("");
      setCategory("");
      closeModal();
    } catch (err) {
      console.error("Error adding habit:", err);
    }
  };

  // --- Logout ---
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const handleLogout = async () => {
    try {
      await signOut(authInstance);
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // --- Mark Complete ---
  const markComplete = async (id) => {
    try {
      const userId = auth.currentUser.uid;
      const habitRef = ref(db, `habits/${userId}/${id}`);

      const todayStr = new Date().toDateString();

      const habit = habits.find((h) => h.id === id);
      if (!habit) return;

      const newStreak =
        habit.lastCompletedAt === todayStr ? habit.streak : habit.streak + 1;

      await update(habitRef, {
        completedToday: true,
        streak: newStreak,
        totalCompletions: habit.totalCompletions + 1,
        totalPossible: habit.totalPossible + 1,
        lastCompletedAt: todayStr,
        lastReset: todayStr,
      });

      setCongrats("🎉 Congrats on completing your habit!");
      setTimeout(() => setCongrats(""), 3000);
    } catch (err) {
      console.error("Error marking complete:", err);
    }
  };

  // ✅ Stats
  const filteredHabits = habits.filter((h) => h.frequency === view);
  const totalHabits = filteredHabits.length;
  const completedToday = filteredHabits.filter((h) => h.completedToday).length;
  const longestStreak = filteredHabits.reduce(
    (max, h) => (h.streak > max ? h.streak : max),
    0
  );

  // ✅ Current Date
  const today = new Date().toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="dashboard">
      {/* Navbar */}
      <div className="nav-bar">
        <div className="logo">HabitFlow</div>
        <div className="profile-icon" ref={dropdownRef} onClick={toggleDropdown}>
          <FaRegUserCircle className="user-icon" />
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={handleLogout}>Log Out</button>
            </div>
          )}
        </div>
      </div>

      {/* Hero Section */}
      <div className="hero-dashboard">
        <h2 className="dashboard-h2">Welcome to HabitFlow, {userName}</h2>
        <p className="dashboard-p">{today}</p>
        <p className="countdown">{countdown}</p> {/* ✅ Countdown Timer */}

        {/* Stats Cards */}
        {habits.length > 0 && (
          <div className="stats-cards">
            <div className="stat-card">
              <h3>{totalHabits}</h3>
              <p>Total Habits</p>
            </div>
            <div className="stat-card">
              <h3>
                {completedToday}/{totalHabits}
              </h3>
              <p>Today’s Completion</p>
            </div>
            <div className="stat-card">
              <h3>{longestStreak}</h3>
              <p>Longest Streak</p>
            </div>
          </div>
        )}

        {/* Segmented Control */}
        {habits.length > 0 && (
          <div className="segmented-control">
            <button
              className={view === "daily" ? "active" : ""}
              onClick={() => setView("daily")}
            >
              Daily
            </button>
            <button
              className={view === "weekly" ? "active" : ""}
              onClick={() => setView("weekly")}
            >
              Weekly
            </button>
            <button
              className={view === "monthly" ? "active" : ""}
              onClick={() => setView("monthly")}
            >
              Monthly
            </button>
          </div>
        )}

        {/* Habits List */}
        <div className="habit-list">
          {filteredHabits.length === 0 ? (
            <div className="habit-card empty">
              <LuClipboardPenLine className="habit-icon" />
              <h3>No habits yet</h3>
              <p>Add your first one now!</p>
            </div>
          ) : (
            filteredHabits.map((habit) => {
              const progress =
                habit.totalPossible > 0
                  ? Math.round(
                      (habit.totalCompletions / habit.totalPossible) * 100
                    )
                  : 0;

              return (
                <div key={habit.id} className="habit-card">
                  <h3>{habit.name}</h3>
                  <p>Streak: 🔥 {habit.streak} days</p>

                  {/* Progress Bar */}
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p>{progress}% complete</p>

                  <button
                    onClick={() => markComplete(habit.id)}
                    disabled={habit.completedToday}
                  >
                    {habit.completedToday ? "Completed" : "Mark Complete"}
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Add Habit Button */}
        <button className="AddHabit-btn" onClick={openModal}>
          + Add New Habit
        </button>
      </div>

      {/* Congrats Popup */}
      {congrats && <div className="congrats-popup">{congrats}</div>}

      {/* Add Habit Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-h2">Add a New Habit</h2>

            {/* Habit Name */}
            <input
              type="text"
              placeholder="Habit name"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
            />

            {/* Frequency */}
            <div className="frequency-toggle">
              <button
                className={frequency === "daily" ? "active" : ""}
                onClick={() => setFrequency("daily")}
              >
                Daily
              </button>
              <button
                className={frequency === "weekly" ? "active" : ""}
                onClick={() => setFrequency("weekly")}
              >
                Weekly
              </button>
              <button
                className={frequency === "monthly" ? "active" : ""}
                onClick={() => setFrequency("monthly")}
              >
                Monthly
              </button>
            </div>

            {/* Reminder */}
            <input
              type="time"
              value={reminder}
              onChange={(e) => setReminder(e.target.value)}
            />

            {/* Category */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="health">Health & Fitness 🏃‍♂️</option>
              <option value="productivity">Productivity & Work 💻</option>
              <option value="learning">Learning & Growth 📚</option>
              <option value="wellness">Wellness & Mindfulness 🧘‍♀️</option>
              <option value="lifestyle">Lifestyle & Routine 🏠</option>
              <option value="social">Social & Relationships 🤝</option>
            </select>

            {/* Modal Buttons */}
            <div className="modal-buttons">
              <button className="modal-add-btn" onClick={handleAddHabit}>
                Add Habit
              </button>
              <button className="modal-cancel-btn" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
