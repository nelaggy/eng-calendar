import { CalEvent } from "@/lib/cal/generator";
import { useState, useEffect } from "react";

export const DayCell = ({
  month,
  day,
  events,
}: {
  month: number;
  day: number;
  events: CalEvent[];
}) => {
  const sortedEvents = events.sort(
    (a, b) =>
      new Date(a.start_time!).getTime() - new Date(b.start_time!).getTime()
  );
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      console.log(window.innerWidth);
      setIsDesktop(window.innerWidth > 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <div
        className="p-3.5 xl:aspect-auto lg:h-28 border-b border-r border-gray-200 flex justify-between flex-col max-lg:items-center min-h-[70px] transition-all duration-300 hover:bg-gray-100 hover:cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        {day !== 0 && (
          <div className="flex flex-col space-y-0">
            <span className="text-xs font-semibold text-gray-500 flex items-center justify-center w-7 h-7 rounded-full ">
              {day}
            </span>
            {isDesktop &&
              sortedEvents.slice(0, 2).map((e) => (
                <span key={e.id} className="text-xs text-gray-50">
                  {e.start_time &&
                    new Date(e.start_time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                  {e.title && e.title.length > 9
                    ? e.title?.substring(0, 6)
                    : e.title}
                  {e.title && e.title.length > 9 && "..."}
                </span>
              ))}
          </div>
        )}
      </div>
      {showModal && (
        <DayModal
          events={events}
          month={month}
          day={day}
          onDismiss={() => setShowModal(false)}
        />
      )}
    </>
  );
};

const DayModal = ({
  events,
  month,
  day,
  onDismiss,
}: {
  events: CalEvent[];
  month: number;
  day: number;
  onDismiss?: () => void;
}) => {
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
  return (
    <div
      className="absolute inset-0 w-full h-full flex justify-center items-center z-10 bg-black/50"
      onClick={onDismiss}
    >
      <div
        className="w-96 flex items-center z-10 flex-col space-y-4 bg-neutral-900 min-h-100 p-6 rounded-lg"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <h3 className="text-xl font-semibold w-full text-center">
          {months[month]} {day}
        </h3>
        <div className="flex flex-grow justify-center flex-col space-y-2">
          {events.map((e) => (
            <div key={e.id} className="text-sm text-gray-50">
              {e.start_time &&
                e.end_time &&
                new Date(e.start_time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }) +
                  " - " +
                  new Date(e.end_time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{": "}
              {e.title}
            </div>
          ))}
          {events.length === 0 && "No events"}
        </div>
      </div>
    </div>
  );
};
