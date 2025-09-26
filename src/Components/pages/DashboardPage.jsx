import { useState, useEffect } from "react";
import SegmentedControl from "../SegmentedControl";
import { LuLayoutDashboard } from "react-icons/lu";

function DashboardPage() {
  const [selected, setSelected] = useState("Daily");
  const [progress, setProgress] = useState(0); // animated progress (right card)

  // Table habits state
  const initialHabits = [
    { id: 1, name: "Morning Run", progress: 60, streak: 3, completed: false },
    { id: 2, name: "Read 20 minutes", progress: 80, streak: 5, completed: false },
    { id: 3, name: "Drink water", progress: 40, streak: 2, completed: false },
    { id: 4, name: "Drink water", progress: 40, streak: 2, completed: false },
  ];
  const [habits, setHabits] = useState(initialHabits);

  // Toggle complete
  const toggleComplete = (id) => {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === id
          ? {
              ...h,
              completed: !h.completed,
              progress: !h.completed ? 100 : 0,
            }
          : h
      )
    );
  };


  // Animate daily progress (right card)
  const getTarget = () => {
    if (selected === "Daily") return 75;
    if (selected === "Weekly") return 60;
    if (selected === "Monthly") return 85;
    return 0;
  };

  useEffect(() => {
    let start = 0;
    const target = getTarget();
    const step = () => {
      start += 1;
      if (start <= target) {
        setProgress(start);
        requestAnimationFrame(step);
      }
    };
    step();
  }, [selected]);

  // Circle math
  const size = 140;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  // Animate table bars when switching tabs
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(false);
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, [selected]);

  return (
    <div className="max-w-[1000px]">
      {/* Top cards */}
      <div className="flex gap-4 mb-4 flex-col lg:flex-row">
        {/* Left card */}
        <div className="bg-blue-300 h-80 flex-1 rounded-xl flex items-center justify-between overflow-hidden">
          <div className="flex flex-col items-center text-center px-9">
            <h1 className="text-4xl font-bold text-white py-3">
              How to Build <br /> a New Habit
            </h1>
            <p className="text-white mt-2 py-2">
              This is essential for making progress <br /> in your health,
              happiness and your life
            </p>
            <button className="bg-white text-blue-500 rounded px-4 py-2 mt-4 font-medium hover:bg-blue-500 hover:text-white cursor-pointer">
              + Add New Habit
            </button>
          </div>
          <img
            src="/Colony.png"
            alt="Habit illustration"
            className="h-70  object-contain"
          />
        </div>

        {/* Right card */}
        <div className="bg-gray-800 h-80 w-full lg:w-[300px] rounded-xl items-center justify-center text-white">
          <div className="flex items-center gap-3 justify-between p-5">
            <h1 className="text-xl font-medium">Statistics</h1>
            <LuLayoutDashboard />
          </div>

          {/* Circular progress */}
          <div className="relative flex items-center justify-center mt-5">
            <svg width={size} height={size} className="-rotate-90">
              <circle
                stroke="#374151"
                fill="transparent"
                strokeWidth={strokeWidth}
                r={radius}
                cx={size / 2}
                cy={size / 2}
              />
              <circle
                stroke="#3B82F6"
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                r={radius}
                cx={size / 2}
                cy={size / 2}
                className="transition-all duration-300"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-bold text-white">{progress}%</span>
              <span className="text-xs text-gray-300">Average Progress</span>
            </div>
          </div>

          <div className="flex gap-8 items-center text-center justify-center mt-7 font-medium">
            <div>
              <h1 className="text-sm">7 Days</h1>
              <p className="text-xs">Best Streaks</p>
            </div>
            <div>
              <h1 className="text-sm">8</h1>
              <p className="text-xs">Perfect Days</p>
            </div>
            <div>
              <h1 className="text-sm">24</h1>
              <p className="text-xs">Habits Done</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom box */}
      <div className="bg-white h-80 w-full rounded-xl relative shadow-xl">
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2">
          <SegmentedControl
            options={["Daily", "Weekly", "Monthly"]}
            value={selected}
            onChange={setSelected}
          />
        </div>

        <div className="h-full pt-10  px-4 overflow-y-auto">
          {selected === "Daily" && (
            <div className="w-full max-w-3xl mt-6 mx-auto">
              <h2 className="text-xl font-bold mb-3 text-center">Today's Habits</h2>
              <div className="overflow-x-auto max-h-[220px]">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Habit</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Progress</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Streak</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {habits.map((h) => (
                      <tr key={h.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-700">{h.name}</td>
                        <td className="px-4 py-3 w-56">
                          <div className="bg-gray-200 rounded-full h-3 w-full">
                            <div
                              className="h-3 rounded-full transition-all duration-700"
                              style={{
                                width: mounted ? `${h.progress}%` : "0%",
                                backgroundColor: h.completed ? "#10B981" : "#3B82F6",
                              }}
                            />
                          </div>
                          <div className="text-xs text-gray-500 mt-1">{h.progress}%</div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">{h.streak} days</td>
                        <td className="px-4 py-3 text-sm">
                          {h.completed ? (
                            <span className="text-green-600 font-medium">Completed</span>
                          ) : (
                            <span className="text-yellow-600 font-medium">In progress</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm flex gap-2">
                          <button
                            onClick={() => toggleComplete(h.id)}
                            className="px-2 py-1 rounded bg-blue-500 text-white text-sm hover:opacity-90"
                          >
                            {h.completed ? "Undo" : "Complete"}
                          </button>
                          <button className="px-2 py-1 rounded bg-red-500 text-sm text-white"                          >
                            delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {selected === "Weekly" && (
            <div className="text-center mt-6">
              <h2 className="text-xl font-bold mb-2">Weekly Summary</h2>
              <p className="text-gray-600">This week’s performance and streaks.</p>
              <div className="overflow-x-auto max-h-[220px]">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Habit</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Progress</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Streak</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {habits.map((h) => (
                      <tr key={h.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-700">{h.name}</td>
                        <td className="px-4 py-3 w-56">
                          <div className="bg-gray-200 rounded-full h-3 w-full">
                            <div
                              className="h-3 rounded-full transition-all duration-700"
                              style={{
                                width: mounted ? `${h.progress}%` : "0%",
                                backgroundColor: h.completed ? "#10B981" : "#3B82F6",
                              }}
                            />
                          </div>
                          <div className="text-xs text-gray-500 mt-1">{h.progress}%</div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">{h.streak} days</td>
                        <td className="px-4 py-3 text-sm">
                          {h.completed ? (
                            <span className="text-green-600 font-medium">Completed</span>
                          ) : (
                            <span className="text-yellow-600 font-medium">In progress</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm flex gap-2">
                          <button
                            onClick={() => toggleComplete(h.id)}
                            className="px-2 py-1 rounded bg-blue-500 text-white text-sm hover:opacity-90"
                          >
                            {h.completed ? "Undo" : "Complete"}
                          </button>
                          <button className="px-2 py-1 rounded bg-red-500 text-sm text-white"                          >
                            delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {selected === "Monthly" && (
            <div className="text-center mt-6">
              <h2 className="text-xl font-bold mb-2">Monthly Trends</h2>
              <p className="text-gray-600">Your long-term progress and stats.</p>
              <div className="overflow-x-auto max-h-[220px]">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Habit</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Progress</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Streak</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {habits.map((h) => (
                      <tr key={h.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-700">{h.name}</td>
                        <td className="px-4 py-3 w-56">
                          <div className="bg-gray-200 rounded-full h-3 w-full">
                            <div
                              className="h-3 rounded-full transition-all duration-700"
                              style={{
                                width: mounted ? `${h.progress}%` : "0%",
                                backgroundColor: h.completed ? "#10B981" : "#3B82F6",
                              }}
                            />
                          </div>
                          <div className="text-xs text-gray-500 mt-1">{h.progress}%</div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">{h.streak} days</td>
                        <td className="px-4 py-3 text-sm">
                          {h.completed ? (
                            <span className="text-green-600 font-medium">Completed</span>
                          ) : (
                            <span className="text-yellow-600 font-medium">In progress</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm flex gap-2">
                          <button
                            onClick={() => toggleComplete(h.id)}
                            className="px-2 py-1 rounded bg-blue-500 text-white text-sm hover:opacity-90"
                          >
                            {h.completed ? "Undo" : "Complete"}
                          </button>
                          <button className="px-2 py-1 rounded bg-red-500 text-sm text-white"                          >
                            delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
