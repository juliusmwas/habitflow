// src/pages/ProfilePage.jsx
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { ref, onValue, update } from "firebase/database";
import { auth, db } from "../firebase";
import "./ProfilePage.css";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ✅ Listen for user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setDisplayName(currentUser.displayName || "");

        // Load profile from Realtime DB
        const profileRef = ref(db, `users/${currentUser.uid}/profile`);
        onValue(profileRef, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            if (data.displayName && !displayName) {
              setDisplayName(data.displayName);
            }
          }
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Save profile changes
  const handleSave = async () => {
    if (!user) return;
    setSaving(true);

    try {
      // Update Firebase Auth profile
      await updateProfile(user, { displayName });

      // Save to Realtime Database
      const profileRef = ref(db, `users/${user.uid}/profile`);
      await update(profileRef, {
        displayName,
        updatedAt: Date.now(),
      });

      alert("Profile updated ✅");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Error updating profile: " + err.message);
    }

    setSaving(false);
  };

  if (loading) return <p>Loading profile...</p>;

  if (!user) {
    return (
      <div className="profile-page">
        <h1>Profile</h1>
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <header className="profile-header">
        <h1>👤 Profile</h1>
        <p>View and edit your personal details.</p>
      </header>

      <div className="profile-card">
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>User ID:</strong> {user.uid}
        </p>

        <div className="profile-edit">
          <label>Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />

          <button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
