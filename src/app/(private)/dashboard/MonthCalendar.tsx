import React from "react";
import { getDaysInMonth, leaveTypes } from "./utils";
import { LeaveStatus } from "@/Utils/types";

interface MonthCalendarProps {
  year: number;
  month: number;
  leaveData: Record<string, LeaveStatus[]>;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onYearChange: (year: number) => void;
}

type LeaveTypes = keyof typeof leaveTypes;

const MonthCalendar: React.FC<MonthCalendarProps> = ({
  year,
  month,
  leaveData,
  onPrevMonth,
  onNextMonth,
  onYearChange,
}) => {
  const daysInMonth = getDaysInMonth(year, month);
  const monthStart = new Date(Date.UTC(year, month, 1));
  const today = new Date();
  const isCurrentMonth =
    today.getUTCFullYear() === year && today.getUTCMonth() === month;

  const daysArray = Array.from({ length: daysInMonth }, (_, index) => {
    const date = new Date(Date.UTC(year, month, index + 1));
    const dateKey = date.toISOString().split("T")[0];
    return { date, dateKey, leaves: leaveData[dateKey] || [] };
  });

  const renderDayHeaders = () => {
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return dayNames.map((day) => (
      <div key={day} className="day-title">
        {day}
      </div>
    ));
  };

  const renderDays = () => {
    const days = [];
    // Add blank days for the previous month's overflow
    for (let i = 0; i < monthStart.getUTCDay(); i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }
    // Add actual days of the current month
    daysArray.forEach(({ date, dateKey, leaves }) => {
      const isToday =
        isCurrentMonth && date.getUTCDate() === today.getUTCDate();
      days.push(
        <div key={dateKey} className={`day ${isToday ? "today" : ""}`}>
          <div className="date">{date.getUTCDate()}</div>
          <div className="leaves">
            {leaves.map((leave, index) => (
              <div
                key={index}
                className={`leave text-sm ${
                  leaveTypes[leave.status as LeaveTypes]
                }`}
              >
                {leave.leaveType}/{leave?.requestedBy?.name}
              </div>
            ))}
          </div>
        </div>
      );
    });

    // Ensure 6 rows by adding extra days if necessary
    while (days.length < 42) {
      days.push(<div key={`extra-${days.length}`} className="day empty"></div>);
    }

    return days;
  };

  const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    new Date(Date.UTC(year, month, 1))
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-5 text-center text-gray-800">
        Leave Calendar {monthName} {year}
      </h1>
      <div className="flex justify-between items-center space-x-4 p-4 bg-gray-100 rounded-lg">
        <div>
          <button
            className="pagination-button bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            onClick={onPrevMonth}
          >
            Previous
          </button>
          <select
            className="year-selector bg-white border border-gray-300 rounded py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={year}
            onChange={(e) => onYearChange(parseInt(e.target.value, 10))}
          >
            {Array.from({ length: 10 }, (_, index) => {
              const yearOption = 2025 + index;
              return (
                <option key={yearOption} value={yearOption}>
                  {yearOption}
                </option>
              );
            })}
          </select>
          <button
            className="pagination-button bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            onClick={onNextMonth}
          >
            Next
          </button>
        </div>

        <div className="legend">
          <div className="legend-item">
            <div className="legend-color bg-green-500"></div>
            <span>Approved</span>
          </div>
          <div className="legend-item">
            <div className="legend-color bg-yellow-500"></div>
            <span>Pending</span>
          </div>
          <div className="legend-item">
            <div className="legend-color bg-red-500"></div>
            <span>Rejected</span>
          </div>
        </div>
      </div>
      <div className="calendar">
        {renderDayHeaders()}
        {renderDays()}
      </div>
    </div>
  );
};

export default MonthCalendar;
