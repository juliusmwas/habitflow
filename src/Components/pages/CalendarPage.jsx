import { useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

// Helper: format date as YYYY-MM-DD
function formatDate(date) {
  return date.toISOString().split("T")[0];
}

function CalendarPage() {
  const today = new Date();

  // Track selected date
  const [selectedDate, setSelectedDate] = useState(formatDate(today));

  // Track current displayed month
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0 = Jan
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // Example habit data
  const [habitData, setHabitData] = useState({
    "2025-09-22": [
      { name: "Drink Water", done: true },
      { name: "Read 20 min", done: false },
    ],
    "2025-09-23": [
      { name: "Meditate", done: false },
      { name: "Run", done: true },
    ],
  });

  // Days of week
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Build grid
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Handle toggle habit
  const toggleHabit = (date, index) => {
    setHabitData((prev) => {
      const habits = [...(prev[date] || [])];
      habits[index].done = !habits[index].done;
      return { ...prev, [date]: habits };
    });
  };

  // Month navigation
  const goToPrevMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  // Month names
  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  // Get habits for selected date
  const habits = habitData[selectedDate] || [];

  return (
    <div className="max-w-[1000px] mx-auto p-6 space-y-6">
      {/* Month Header with navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={goToPrevMonth}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <IoChevronBack size={20} />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">
          {monthNames[currentMonth]} {currentYear}
        </h2>
        <button
          onClick={goToNextMonth}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <IoChevronForward size={20} />
        </button>
      </div>

      {/* Calendar Card */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        {/* Weekday Header */}
        <div className="grid grid-cols-7 text-center font-medium text-gray-500 mb-2">
          {days.map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Empty cells */}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}

          {/* Days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateKey = formatDate(new Date(currentYear, currentMonth, day));
            const isSelected = selectedDate === dateKey;
            const hasHabits = habitData[dateKey];
            const progress =
              hasHabits && hasHabits.length > 0
                ? hasHabits.filter((h) => h.done).length / hasHabits.length
                : 0;

            return (
              <button
                key={day}
                onClick={() => setSelectedDate(dateKey)}
                className={`p-3 rounded-xl border transition text-sm font-medium 
                  ${isSelected ? "bg-blue-500 text-white shadow-md" : ""}
                  ${!isSelected && progress === 1 ? "bg-green-100 text-green-700" : ""}
                  ${!isSelected && progress > 0 && progress < 1 ? "bg-yellow-100 text-yellow-700" : ""}
                  ${!isSelected && progress === 0 ? "bg-gray-50 text-gray-700 hover:bg-gray-100" : ""}
                `}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Habit Checklist Card */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="font-semibold text-lg mb-4 text-gray-800">
          Habits for {selectedDate}
        </h3>
        {habits.length === 0 ? (
          <p className="text-gray-500 text-sm">No habits recorded for this day.</p>
        ) : (
          <ul className="space-y-3">
            {habits.map((habit, i) => (
              <li
                key={i}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={habit.done}
                    onChange={() => toggleHabit(selectedDate, i)}
                    className="w-5 h-5 accent-blue-500"
                  />
                  <span
                    className={`text-gray-700 ${habit.done ? "line-through text-gray-400" : ""}`}
                  >
                    {habit.name}
                  </span>
                </div>
                {habit.done && (
                  <span className="text-green-600 text-sm font-medium">✔ Done</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CalendarPage;
