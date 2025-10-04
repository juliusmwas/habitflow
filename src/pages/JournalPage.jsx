// src/pages/JournalPage.jsx
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { ref, push, set, onValue, remove } from "firebase/database";
import { auth, db } from "../firebase";
import "./JournalPage.css";

export default function JournalPage() {
  const [entries, setEntries] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        const journalRef = ref(db, `journals/${user.uid}`);
        onValue(journalRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const parsed = Object.entries(data)
              .map(([id, value]) => ({
                id,
                ...value,
              }))
              .sort((a, b) => b.createdAt - a.createdAt); // latest first
            setEntries(parsed);
          } else {
            setEntries([]);
          }
        });
      } else {
        setEntries([]);
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅ Add Journal Entry
  const handleAddEntry = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !userId) return;

    const journalRef = ref(db, `journals/${userId}`);
    const newEntryRef = push(journalRef);

    await set(newEntryRef, {
      title,
      content,
      createdAt: Date.now(),
    });

    setTitle("");
    setContent("");
  };

  // ✅ Delete Entry
  const handleDelete = async (id) => {
    if (!userId) return;
    const entryRef = ref(db, `journals/${userId}/${id}`);
    await remove(entryRef);
  };

  return (
    <div className="journal-page">
      <header className="journal-header">
        <h1>📓 Journal</h1>
        <p>Write daily reflections and track your thoughts.</p>
      </header>

      {/* Journal Form */}
      <form className="journal-form" onSubmit={handleAddEntry}>
        <input
          type="text"
          placeholder="Entry title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Write your thoughts..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <button type="submit">Add Entry</button>
      </form>

      {/* Journal Entries */}
      <section className="journal-entries">
        {entries.length === 0 ? (
          <p className="no-entries">No journal entries yet. Start writing ✍️</p>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="journal-card">
              <div className="journal-header-row">
                <h3>{entry.title}</h3>
                <span>
                  {new Date(entry.createdAt).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <p>{entry.content}</p>
              <button
                className="delete-btn"
                onClick={() => handleDelete(entry.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
