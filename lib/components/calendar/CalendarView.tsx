import { CalEvent } from "@/lib/cal/generator"
import { MonthView } from "./MonthView"

export const CalendarView = ({events}: {events: CalEvent[]}) => {
    
    return (
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 xl:px-14 select-none">
            <MonthView events={events} />
        </div>
    )
}