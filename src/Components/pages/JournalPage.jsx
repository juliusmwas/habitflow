import { useState } from "react";
import { FaSmile, FaMeh, FaFrown, FaRegSave } from "react-icons/fa";

function JournalPage() {
  const [entries, setEntries] = useState([]);
  const [mood, setMood] = useState(null);
  const [text, setText] = useState("");

  const today = new Date().toLocaleDateString();

  const addEntry = () => {
    if (!text.trim()) return;
    const newEntry = {
      id: Date.now(),
      date: today,
      mood,
      text,
    };
    setEntries([newEntry, ...entries]); // add on top
    setText("");
    setMood(null);
  };

  return (
    <div className="max-w-[900px] mx-auto p-6">
      {/* ===== Today’s Journal ===== */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Today’s Journal — {today}
        </h2>

        {/* Mood selector */}
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setMood("happy")}
            className={`p-3 rounded-full ${
              mood === "happy" ? "bg-green-200" : "bg-gray-100"
            }`}
          >
            <FaSmile className="text-2xl text-green-500" />
          </button>
          <button
            onClick={() => setMood("neutral")}
            className={`p-3 rounded-full ${
              mood === "neutral" ? "bg-yellow-200" : "bg-gray-100"
            }`}
          >
            <FaMeh className="text-2xl text-yellow-500" />
          </button>
          <button
            onClick={() => setMood("sad")}
            className={`p-3 rounded-full ${
              mood === "sad" ? "bg-red-200" : "bg-gray-100"
            }`}
          >
            <FaFrown className="text-2xl text-red-500" />
          </button>
        </div>

        {/* Textarea */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your thoughts..."
          className="w-full h-32 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Save button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={addEntry}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
          >
            <FaRegSave /> Save Entry
          </button>
        </div>
      </div>

      {/* ===== Past Entries ===== */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-2">Past Entries</h3>
        {entries.length === 0 ? (
          <p className="text-gray-500">No journal entries yet.</p>
        ) : (
          entries.map((entry) => (
            <div
              key={entry.id}
              className="bg-gray-50 border rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{entry.date}</span>
                <span>
                  {entry.mood === "happy" && (
                    <FaSmile className="text-green-500 text-lg" />
                  )}
                  {entry.mood === "neutral" && (
                    <FaMeh className="text-yellow-500 text-lg" />
                  )}
                  {entry.mood === "sad" && (
                    <FaFrown className="text-red-500 text-lg" />
                  )}
                </span>
              </div>
              <p className="text-gray-700">{entry.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default JournalPage;
