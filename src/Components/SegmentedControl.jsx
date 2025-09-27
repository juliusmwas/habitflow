// SegmentedControl.jsx (you can keep this in the same file above Dashboard or extract it)
import React from "react";

function SegmentedControl({ options = ["Daily", "Weekly", "Monthly"], value, onChange }) {
  // keyboard navigation: arrow left/right
  const handleKeyDown = (e, idx) => {
    if (e.key === "ArrowRight") {
      const next = (idx + 1) % options.length;
      onChange(options[next]);
      e.preventDefault();
    } else if (e.key === "ArrowLeft") {
      const prev = (idx - 1 + options.length) % options.length;
      onChange(options[prev]);
      e.preventDefault();
    }
  };

  return (
    <div
      role="tablist"
      aria-label="Time range"
      className="inline-flex bg-gray-200/60 p-1 rounded-xl shadow"
    >
      {options.map((opt, idx) => {
        const selected = value === opt;
        return (
          <button
            key={opt}
            role="tab"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            onClick={() => onChange(opt)}
            className={
              "px-4 py-1 rounded-lg text-sm font-medium focus:outline-none transition " +
              (selected
                ? "bg-white shadow ring-2 ring-offset-1 ring-blue-500 text-black"
                : "text-gray-600 hover:text-black")
            }
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

export default SegmentedControl;
