import { MonthView } from "./MonthView"


export const Calendar = () => {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 xl:px-14 select-none">
            <MonthView events={[]} />
        </div>
    )
}