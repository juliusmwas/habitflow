import { FaRegUserCircle } from "react-icons/fa";
import { IoIosFlame } from "react-icons/io";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { GiLaurelsTrophy } from "react-icons/gi";

function ProfilePage() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* ===== User Card ===== */}
      <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center">
        {/* Profile Pic */}
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-5xl text-gray-400">
          <FaRegUserCircle />
        </div>
        <h1 className="text-2xl font-bold mt-3">John Doe</h1>
        <p className="text-gray-600 text-sm">john@example.com</p>
        <p className="text-gray-500 mt-2">“Consistency is my superpower 💪”</p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Edit Profile
        </button>
      </div>

      {/* ===== Stats Section ===== */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-100 rounded-xl p-4 text-center">
          <IoIosFlame className="mx-auto text-2xl text-orange-500" />
          <h2 className="text-xl font-bold">14</h2>
          <p className="text-sm text-gray-600">Day Streak</p>
        </div>
        <div className="bg-green-100 rounded-xl p-4 text-center">
          <IoCheckmarkCircleOutline className="mx-auto text-2xl text-green-600" />
          <h2 className="text-xl font-bold">120</h2>
          <p className="text-sm text-gray-600">Habits Completed</p>
        </div>
        <div className="bg-yellow-100 rounded-xl p-4 text-center">
          <GiLaurelsTrophy className="mx-auto text-2xl text-yellow-600" />
          <h2 className="text-xl font-bold">30</h2>
          <p className="text-sm text-gray-600">Longest Streak</p>
        </div>
      </div>

      {/* ===== Badges Section ===== */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="font-semibold text-lg mb-4">🏅 Achievements</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-100 rounded-lg p-4 text-center">
            🥉 <p className="text-sm mt-1">Bronze</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 text-center">
            🥈 <p className="text-sm mt-1">Silver</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 text-center">
            🥇 <p className="text-sm mt-1">Gold</p>
          </div>
        </div>
      </div>

      {/* ===== Recent Activity ===== */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="font-semibold text-lg mb-4">📌 Recent Activity</h2>
        <ul className="space-y-3 text-gray-700">
          <li>✅ Completed “Morning Jog” today</li>
          <li>🔥 Reached a 10-day streak yesterday</li>
          <li>🏆 Earned Silver Badge last week</li>
        </ul>
      </div>
    </div>
  );
}

export default ProfilePage;
