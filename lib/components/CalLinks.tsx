import { getUser } from "@/lib/server/fetch"
import { LinkButton } from "./ui/LinkButton"

export default async function CalLinks() {
    const baseURL = process.env.AUTH0_BASE_URL+'/calendar/'
    const userId = await getUser()
    const webcalURL = baseURL + userId + '/calendar.ics'
    return (
        <div className="flex flex-col justify-between w-full space-y-2 md:w-72 mt-6">
            <LinkButton href={"webcal://"+webcalURL}>Subscribe to Calendar</LinkButton>
            <LinkButton href={'/calendar/'+ userId + '/calendar.ics'}>Download as .ical</LinkButton>
        </div>
    )
}