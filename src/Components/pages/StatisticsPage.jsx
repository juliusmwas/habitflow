import { IoBarChart } from "react-icons/io5";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { IoIosFlame } from "react-icons/io";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from "recharts";

function StatisticsPage() {
  // ---- Sample data (replace with real API data later) ----
  // Line data: completion % over last 14 days (date labels + completion %)
  const lineData = [
    { date: "Sep 10", completion: 55 },
    { date: "Sep 11", completion: 62 },
    { date: "Sep 12", completion: 58 },
    { date: "Sep 13", completion: 64 },
    { date: "Sep 14", completion: 70 },
    { date: "Sep 15", completion: 66 },
    { date: "Sep 16", completion: 72 },
    { date: "Sep 17", completion: 68 },
    { date: "Sep 18", completion: 75 },
    { date: "Sep 19", completion: 78 },
    { date: "Sep 20", completion: 74 },
    { date: "Sep 21", completion: 80 },
    { date: "Sep 22", completion: 76 },
    { date: "Sep 23", completion: 75 },
  ];

  // Bar data: average completion per habit
  const barData = [
    { name: "Morning Run", value: 78 },
    { name: "Read", value: 92 },
    { name: "Meditate", value: 40 },
    { name: "Drink Water", value: 60 },
    { name: "Practice Coding", value: 85 },
  ];

  // ---- Derived summary numbers (you can replace with real ones) ----
  const totalHabits = barData.length;
  const avgCompletion = Math.round(
    barData.reduce((sum, b) => sum + b.value, 0) / Math.max(1, barData.length)
  );
  const longestStreak = 14; // placeholder — compute from your real data
  const streakToday = 4; // placeholder

  // Tooltip formatter for percentages
  const pctFormatter = (value) => `${value}%`;

  return (
    <div className="max-w-[1000px] mx-auto p-6">
      {/* ===== Top Overview Cards ===== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-100 rounded-xl p-4 text-center">
          <h2 className="text-xl font-bold">{totalHabits}</h2>
          <p className="text-sm text-gray-600">Total Habits</p>
        </div>
        <div className="bg-green-100 rounded-xl p-4 text-center">
          <h2 className="text-xl font-bold">{avgCompletion}%</h2>
          <p className="text-sm text-gray-600">Avg Completion</p>
        </div>
        <div className="bg-purple-100 rounded-xl p-4 text-center">
          <h2 className="text-xl font-bold">{longestStreak}</h2>
          <p className="text-sm text-gray-600">Longest Streak (days)</p>
        </div>
        <div className="bg-yellow-100 rounded-xl p-4 text-center">
          <h2 className="text-xl font-bold">{streakToday}</h2>
          <p className="text-sm text-gray-600">Streak Today</p>
        </div>
      </div>

      {/* ===== Middle Charts Section ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Line chart: Progress over time */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="font-semibold flex items-center gap-2 mb-2">
            <FaRegCalendarCheck />
            Progress Over Time
          </h3>

          {/* ResponsiveContainer makes the chart responsive to its parent */}
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 8, right: 20, left: -10, bottom: 6 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                <Tooltip formatter={pctFormatter} />
                <Line
                  type="monotone"
                  dataKey="completion"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar chart: Habit comparison */}
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="font-semibold flex items-center gap-2 mb-2">
            <IoBarChart />
            Habit Comparison
          </h3>

          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 8, right: 20, left: 0, bottom: 6 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={pctFormatter} />
                <Legend />
                <Bar dataKey="value" fill="#60A5FA" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ===== Bottom Insights ===== */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h3 className="font-semibold flex items-center gap-2 mb-4">
          <IoIosFlame /> Insights & Highlights
        </h3>
        <ul className="space-y-2 text-gray-700">
          <li>✅ Best Habit: Reading (92% consistency)</li>
          <li>⚠️ Weakest Habit: Meditation (40% consistency)</li>
          <li>🏆 Milestone: 100 habits completed</li>
          <li>🔥 Current streak: 4 days</li>
        </ul>
      </div>
    </div>
  );
}

export default StatisticsPage;
