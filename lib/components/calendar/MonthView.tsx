import { CalEvent } from "@/lib/cal/generator"


export const MonthView = ({
    events
}: {
    events: CalEvent[]
}) => {
    const days = [[1, 2, 3, 4, 5, 6, 7], [8, 9, 10, 11, 12, 13, 14], [15, 16, 17, 18, 19, 20, 21], [22, 23, 24, 25, 26, 27, 28], [29, 30, 31, 1, 2, 3, 4]]
    return (
        <div className="border border-gray-200">
            <CalendarHeader days={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']} />
            {days.map((week, i) => {
                return (
                    <CalendarRow key={i} days={week} events={events} />
                )
            })}
        </div>
    )
}

const CalendarHeader = ({
    days
} : {
    days: string[]
}) => {
    return (
        <div className='grid grid-cols-7 divide-gray-200 border-b border-gray-200'>
            {days.map((day) => {
                return (
                    <div key={day} className="p-3.5 flex flex-col sm:flex-row items-center justify-between border-r border-gray-200">
                        <span className="text-sm font-medium text-gray-500">{day}</span>
                    </div>
                )
            })}
        </div>
    )
}

const CalendarRow = ({
    days,
    events
} : {
    days: number[]
    events: CalEvent[]
}) => {
    return (
        <div className='grid grid-cols-7 divide-gray-200'>
            {days.map((day) => {
                return (
                    <DayCell key={day} day={day} events={events} />
                )
            })}
        </div>
    )
}

const DayCell = ({
    day,
    events
} : {
    day: number
    events: CalEvent[]
}) => {
    return (
        <>
            <div className="p-3.5 xl:aspect-auto lg:h-28 border-b border-r border-gray-200 flex justify-between flex-col max-lg:items-center min-h-[70px] transition-all duration-300 hover:bg-gray-100">
              <span className="text-xs font-semibold text-gray-500 flex items-center justify-center w-7 h-7 rounded-full ">{day}</span>
            </div>
        </>
    )
}