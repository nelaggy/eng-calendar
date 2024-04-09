import Calendars from "@/lib/components/calendars"
import Logout from "@/lib/components/logout_button"
import { getGroups } from "@/lib/server/fetch"

export default async function Page() {
    const groups = await getGroups()
    return ( 
        <>
            <div className='text-4xl text-center'>Calendar</div>
            <Calendars cals={groups}/>
            <Logout />
        </>
    )
}