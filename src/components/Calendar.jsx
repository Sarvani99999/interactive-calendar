import React, { useMemo, useState, useRef } from "react";
import dayjs from "dayjs";
import eventsData from "../data/events.json";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getFixedMonthMatrix(year, month) {
  // Always return 6 weeks (6 rows)
  const first = dayjs(new Date(year, month, 1));
  const start = first.startOf("week");
  const matrix = [];
  let cursor = start;

  for (let r = 0; r < 6; r++) {
    const week = [];
    for (let c = 0; c < 7; c++) {
      week.push(cursor);
      cursor = cursor.add(1, "day");
    }
    matrix.push(week);
  }

  return matrix;
}

export default function Calendar() {
  const today = dayjs();
  const [visible, setVisible] = useState({
    year: today.year(),
    month: today.month(),
  });
  const [tooltip, setTooltip] = useState(null);
  const tipRef = useRef(null);

  // Convert events to dayjs once
  const events = useMemo(
    () => eventsData.map((e) => ({ ...e, dateObj: dayjs(e.date) })),
    []
  );

  // Always use fixed 6x7 grid
  const matrix = useMemo(
    () => getFixedMonthMatrix(visible.year, visible.month),
    [visible]
  );

  // Navigation
  const prevMonth = () => {
    const cur = dayjs(new Date(visible.year, visible.month, 1)).subtract(1, "month");
    setVisible({ year: cur.year(), month: cur.month() });
  };

  const nextMonth = () => {
    const cur = dayjs(new Date(visible.year, visible.month, 1)).add(1, "month");
    setVisible({ year: cur.year(), month: cur.month() });
  };

  // Colors for events
  const colorMap = [
    "bg-indigo-100 text-indigo-800",
    "bg-rose-100 text-rose-800",
    "bg-emerald-100 text-emerald-800",
    "bg-yellow-50 text-yellow-900",
    "bg-sky-100 text-sky-800",
  ];

  function dayEvents(d) {
    return events.filter((ev) => ev.dateObj.isSame(d, "day"));
  }

  function showTip(ev, e) {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      x: rect.right + 8,
      y: rect.top,
      content: `${ev.title}\n${ev.time || ""}`,
    });
  }

  const HIDE_TIMES_IN_UI = false;

  return (
  <div
  className="calendar-container flex flex-col"
  style={{
    width: "950px",
    minHeight: "83vh", // ✅ slightly taller so the grid fits inside
    padding: "20px 28px",
    backgroundColor: "white", // ✅ ensures white covers full box
    border: "2px solid black",
    borderRadius: "14px",
    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.15)",
    boxSizing: "border-box",
  }}
>


  

      {/* ===== Header Section ===== */}
      <div className="flex items-center justify-between mb-5 header-grid">
        <div className="text-left">
          <div className="text-xl font-semibold text-gray-800">
            {dayjs(new Date(visible.year, visible.month, 1)).format("MMMM YYYY")}
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Today: {today.format("DD MMM YYYY")}
          </div>
        </div>

        {/* ===== Prev / Next buttons ===== */}
        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={prevMonth}
            className="px-4 py-1.5 border rounded-md text-sm hover:bg-gray-100"
          >
            Prev
          </button>
          <button
            onClick={nextMonth}
            className="px-4 py-1.5 border rounded-md text-sm hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      </div>

      {/* ===== Weekday Labels ===== */}
      <div className="grid grid-cols-7 gap-2 text-sm font-medium text-gray-600 mb-2">
        {WEEKDAYS.map((d) => (
          <div key={d} className="text-center">
            {d}
          </div>
        ))}
      </div>

      {/* ===== Fixed Calendar Grid (Always 6 equal rows) ===== */}
      <div className="grid grid-cols-7 gap-3 flex-grow" style={{ height: "480px" }}>
        {matrix.map((week, wi) => (
          <React.Fragment key={wi}>
            {week.map((d, di) => {
              const isCurrent = d.month() === visible.month;
              const evs = dayEvents(d);
              const isTodayHighlight =
                visible.month === today.month() &&
                visible.year === today.year() &&
                d.isSame(today, "day");

              return (
                <div
                  key={di}
                  className={`flex flex-col justify-start rounded-lg border relative transition-all duration-150
                    ${
                      isCurrent ? "bg-white" : "bg-gray-50 text-gray-400"
                    }
                    ${
                      isTodayHighlight
                        ? "bg-indigo-100 border-2 border-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.3)]"
                        : "border-gray-200"
                    }`}
                  style={{
                    padding: "8px",
                    minHeight: "78px", // evenly fits 6 rows in 480px grid
                  }}
                >
                  {/* Date Number */}
                  <div className="flex items-start justify-between">
                    <div
                      className={`text-sm font-semibold ${
                        isTodayHighlight ? "text-indigo-800" : "text-gray-700"
                      }`}
                    >
                      {d.date()}
                    </div>
                  </div>

                  {/* Events */}
                  <div className="mt-1 flex flex-col gap-1">
                    {evs.slice(0, 3).map((ev, idx) => (
                      <button
                        key={ev.id}
                        onClick={(e) => showTip(ev, e)}
                        className={`event-chip ${colorMap[idx % colorMap.length]} text-left`}
                        title={`${ev.title}${ev.time ? " • " + ev.time : ""}`}
                      >
                        <span
                          className="event-dot"
                          style={{
                            background: [
                              "#6366f1",
                              "#fda4af",
                              "#34d399",
                              "#fef08a",
                              "#7dd3fc",
                            ][idx % 5],
                          }}
                        />
                        <span className="truncate block">
                          {HIDE_TIMES_IN_UI
                            ? ev.title
                            : `${ev.time || ""} • ${ev.title}`}
                        </span>
                      </button>
                    ))}

                    {evs.length > 3 && (
                      <div className="text-xs text-gray-400">
                        +{evs.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {/* ===== Tooltip ===== */}
      {tooltip && (
        <div
          ref={tipRef}
          className="tooltip absolute"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            whiteSpace: "pre-line",
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
}
