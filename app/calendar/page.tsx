import CalLink from "@/lib/components/cal_link"
import Calendars from "@/lib/components/calendars"
import Logout from "@/lib/components/logout_button"
import { getGroups } from "@/lib/server/fetch"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Calendar'
}

export default async function Page() {
    const groups = await getGroups()
    return (
        <div className='m-4'>
            <div className='text-6xl text-center'>Calendar</div>
            <Calendars cals={groups}>
                <CalLink/>
            </Calendars>
            <Logout />
        </div>
    )
}