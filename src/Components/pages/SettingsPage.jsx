import { useState } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";

function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [defaultView, setDefaultView] = useState("Daily");

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* ===== Header ===== */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">⚙️ Settings</h1>
        <p className="text-gray-600 mt-1">
          Customize your experience
        </p>
      </div>

      {/* ===== Profile Section ===== */}
      <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <h2 className="font-semibold text-lg">Profile</h2>
        <div>
          <label className="block text-sm text-gray-600">Name</label>
          <input
            type="text"
            defaultValue="John Doe"
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Email</label>
          <input
            type="email"
            defaultValue="john@example.com"
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>
      </div>

      {/* ===== Preferences Section ===== */}
      <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <h2 className="font-semibold text-lg">Preferences</h2>

        {/* Theme Toggle */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            {darkMode ? <IoMoon /> : <IoSunny />}
            Theme
          </span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-12 h-6 rounded-full ${
              darkMode ? "bg-blue-600" : "bg-gray-300"
            } relative`}
          >
            <span
              className={`block w-5 h-5 bg-white rounded-full shadow-md transform transition ${
                darkMode ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Notifications Toggle */}
        <div className="flex items-center justify-between">
          <span>Reminders</span>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`w-12 h-6 rounded-full ${
              notifications ? "bg-green-500" : "bg-gray-300"
            } relative`}
          >
            <span
              className={`block w-5 h-5 bg-white rounded-full shadow-md transform transition ${
                notifications ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Default View Select */}
        <div>
          <label className="block text-sm text-gray-600">Default View</label>
          <select
            value={defaultView}
            onChange={(e) => setDefaultView(e.target.value)}
            className="w-full border rounded-lg p-2 mt-1"
          >
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
        </div>
      </div>

      {/* ===== Account Management ===== */}
      <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <h2 className="font-semibold text-lg">Account</h2>
        <button className="w-full py-2 px-4 bg-gray-200 rounded-lg hover:bg-gray-300">
          Change Password
        </button>
        <button className="w-full py-2 px-4 bg-gray-200 rounded-lg hover:bg-gray-300">
          Export Data
        </button>
        <button className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Delete Account
        </button>
      </div>

      {/* ===== Logout ===== */}
      <div className="text-center">
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
          <FiLogOut /> Logout
        </button>
      </div>
    </div>
  );
}

export default SettingsPage;
