import { GiLaurelsTrophy } from "react-icons/gi";
import { IoIosFlame } from "react-icons/io";
import { IoCheckmarkCircle } from "react-icons/io5";

function AchievementsPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* ===== Header ===== */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">🏆 Achievements</h1>
        <p className="text-gray-600 mt-2">
          Celebrate your milestones and track your progress!
        </p>
      </div>

      {/* ===== Summary Cards ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 rounded-xl p-4 text-center">
          <GiLaurelsTrophy className="mx-auto text-3xl text-blue-600" />
          <h2 className="text-xl font-bold mt-2">12</h2>
          <p className="text-sm text-gray-600">Badges Earned</p>
        </div>
        <div className="bg-green-100 rounded-xl p-4 text-center">
          <IoIosFlame className="mx-auto text-3xl text-orange-500" />
          <h2 className="text-xl font-bold mt-2">30 Days</h2>
          <p className="text-sm text-gray-600">Longest Streak</p>
        </div>
        <div className="bg-yellow-100 rounded-xl p-4 text-center">
          <IoCheckmarkCircle className="mx-auto text-3xl text-green-600" />
          <h2 className="text-xl font-bold mt-2">250</h2>
          <p className="text-sm text-gray-600">Habits Completed</p>
        </div>
      </div>

      {/* ===== Badges Section ===== */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h2 className="font-semibold text-lg mb-4">🏅 Your Badges</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-6 text-center">
          {/* Bronze Badge */}
          <div className="bg-gray-100 rounded-lg p-4">
            🥉
            <p className="text-sm mt-2">Bronze</p>
          </div>
          {/* Silver Badge */}
          <div className="bg-gray-100 rounded-lg p-4">
            🥈
            <p className="text-sm mt-2">Silver</p>
          </div>
          {/* Gold Badge */}
          <div className="bg-gray-100 rounded-lg p-4">
            🥇
            <p className="text-sm mt-2">Gold</p>
          </div>
          {/* Locked Badge */}
          <div className="bg-gray-200 rounded-lg p-4 text-gray-400">
            🔒
            <p className="text-sm mt-2">Locked</p>
          </div>
        </div>
      </div>

      {/* ===== Milestones Timeline ===== */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h2 className="font-semibold text-lg mb-4">📌 Milestones</h2>
        <ul className="space-y-3 text-gray-700">
          <li>✅ Completed first habit</li>
          <li>🔥 Reached 7-day streak</li>
          <li>🏆 Hit 100 habits completed</li>
          <li>🥇 Earned Gold Badge</li>
        </ul>
      </div>
    </div>
  );
}

export default AchievementsPage;
