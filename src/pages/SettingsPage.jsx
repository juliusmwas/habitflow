// src/pages/SettingsPage.jsx
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { ref, onValue, update } from "firebase/database";
import { auth, db } from "../firebase";
import "./SettingsPage.css";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [reminders, setReminders] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [userId, setUserId] = useState(null);

  // Load user + settings from Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);

        const settingsRef = ref(db, `users/${user.uid}/settings`);
        onValue(settingsRef, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setDarkMode(data.darkMode ?? false);
            setReminders(data.reminders ?? true);
            setNotifications(data.notifications ?? true);
          }
        });
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Update settings in Firebase
  const handleToggle = (setting, value) => {
    if (!userId) return;

    const settingsRef = ref(db, `users/${userId}/settings`);
    update(settingsRef, { [setting]: value });
  };

  return (
    <div className="settings-page">
      <header className="settings-header">
        <h1>⚙️ Settings</h1>
        <p>Manage your app preferences and notifications.</p>
      </header>

      <section className="settings-section">
        <h2>Preferences</h2>

        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => {
                setDarkMode(!darkMode);
                handleToggle("darkMode", !darkMode);
              }}
            />
            Enable Dark Mode
          </label>
        </div>

        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={reminders}
              onChange={() => {
                setReminders(!reminders);
                handleToggle("reminders", !reminders);
              }}
            />
            Daily Habit Reminders
          </label>
        </div>

        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => {
                setNotifications(!notifications);
                handleToggle("notifications", !notifications);
              }}
            />
            Push Notifications
          </label>
        </div>
      </section>

    </div>
  );
}
