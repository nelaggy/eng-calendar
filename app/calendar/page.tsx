import CalLinks from "@/lib/components/CalLinks"
import { Calendar } from "@/lib/components/calendar/Calendar"
import { MonthView } from "@/lib/components/calendar/MonthView"
import Calendars from "@/lib/components/Calendars"
import { Logout } from "@/lib/components/LogoutButton"
import { getGroups } from "@/lib/server/fetch"
import { Metadata } from "next"

export const runtime = 'edge'

export const metadata: Metadata = {
    title: 'Calendar'
}

export default async function Page() {
    const groups = await getGroups()
    return (
        <div className="p-4">
            <div className='invisible text-6xl sm:visible text-center'>
                Calendar
            </div>
            <div className="flex space-y-4 flex-col md:flex-row md:space-x-4 p-4">
                <div>
                    <Calendars cals={groups}>
                        <CalLinks/>
                    </Calendars>
                </div>
                <Calendar />
            </div>
            
            <Logout />
            
        </div>
    )
}