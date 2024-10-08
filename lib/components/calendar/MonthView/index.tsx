"use client";
import { CalEvent } from "@/lib/cal/generator";
import { Calendar } from "calendar";
import { useEffect, useState } from "react";
import { DayCell } from "./DayCell";

export const MonthView = ({ events }: { events: CalEvent[] }) => {
  const months = [
    "October",
    "November",
    "December",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
  ];
  const cal = new Calendar();
  const [month, setMonth] = useState(0);

  const nextMonth = () => {
    if (month < 8) setMonth(month + 1);
  };

  const prevMonth = () => {
    if (month > 0) setMonth(month - 1);
  };

  const days =
    month < 3 ? cal.monthDays(2024, month + 9) : cal.monthDays(2023, month - 3);
  const filteredEvents = events.filter((e) => {
    if (!e.start_time) return false;
    const eventMonth = new Date(e.start_time).getMonth();
    if (month < 3) return eventMonth == month + 9;
    return eventMonth == month - 3;
  });
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={prevMonth}
          className={`text-sm font-semibold text-gray-500 ${
            month == 0 && "invisible"
          }`}
        >
          Prev
        </button>
        <h2 className="text-lg font-semibold text-gray-500">{months[month]}</h2>
        <button
          onClick={nextMonth}
          className={`text-sm font-semibold text-gray-500 ${
            month == 8 && "invisible"
          }`}
        >
          Next
        </button>
      </div>
      <div className="border border-gray-200">
        <CalendarHeader
          days={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
        />
        {days.map((week) => {
          return (
            <span key={week.toString()}>
              <CalendarRow
                month={month}
                days={week}
                events={filteredEvents.filter((e) => {
                  if (!e.start_time) return false;
                  const eventDate = new Date(e.start_time).getDate();
                  return week.includes(eventDate || -1);
                })}
              />
            </span>
          );
        })}
      </div>
    </>
  );
};

const CalendarHeader = ({ days }: { days: string[] }) => {
  return (
    <div className="grid grid-cols-7 divide-gray-200 border-b border-gray-200">
      {days.map((day) => {
        return (
          <div
            key={day}
            className="p-3.5 flex flex-col sm:flex-row items-center justify-between border-r border-gray-200"
          >
            <span className="text-sm font-medium text-gray-500">{day}</span>
          </div>
        );
      })}
    </div>
  );
};

const CalendarRow = ({
  month,
  days,
  events,
}: {
  month: number;
  days: number[];
  events: CalEvent[];
}) => {
  return (
    <div className="grid grid-cols-7 divide-gray-200">
      {days.map((day) => {
        return (
          <span key={Math.random()}>
            <DayCell
              month={month}
              day={day}
              events={events.filter((e) => {
                if (!e.start_time) return false;
                return new Date(e.start_time).getDate() === day;
              })}
            />
          </span>
        );
      })}
    </div>
  );
};
