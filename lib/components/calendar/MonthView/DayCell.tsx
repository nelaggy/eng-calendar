import { CalEvent } from "@/lib/cal/generator";
import { useState, useEffect } from "react";

export const DayCell = ({ day, events }: { day: number; events: CalEvent[] }) => {
    const sortedEvents = events.sort((a,b) => new Date(a.start_time!).getTime() - new Date(b.start_time!).getTime())
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1000);
    useEffect(() => {
      const handleResize = () => {
        setIsDesktop(window.innerWidth > 1000);
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
      <>
        <div className="p-3.5 xl:aspect-auto lg:h-28 border-b border-r border-gray-200 flex justify-between flex-col max-lg:items-center min-h-[70px] transition-all duration-300 hover:bg-gray-100 hover:cursor-pointer">
          {day !== 0 && (
            <div className="flex flex-col space-y-0">
              <span className="text-xs font-semibold text-gray-500 flex items-center justify-center w-7 h-7 rounded-full ">
                {day}
              </span>
              {sortedEvents.slice(0, 2).map((e) => (
                <span key={e.id} className="text-xs text-gray-50">
                  {e.start_time && isDesktop &&
                    new Date(e.start_time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    {e.title && e.title.length > 9 ? e.title?.substring(0, 6) : e.title}
                    {e.title && e.title.length > 9 && "..."}
                </span>
              ))}
            </div>
          )}
        </div>
      </>
    );
  };
  