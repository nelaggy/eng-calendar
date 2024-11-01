import { getUser } from "@/lib/server/fetch"
import { LinkButton } from "./ui/LinkButton"
import { CopyButton } from "./ui/CopyButton"

export default async function CalLinks() {
    const baseURL = process.env.AUTH0_BASE_URL+'/calendar/'
    const userId = await getUser()
    const webcalURL = baseURL + userId + '/calendar.ics'

    const copyLink = () => {
        navigator.clipboard.writeText(webcalURL)
    }
    return (
        <div className="flex flex-col justify-between w-full space-y-2 md:w-72 mt-6">
            <LinkButton href={"webcal://"+webcalURL}>Subscribe to Calendar</LinkButton>
            <LinkButton href={'/calendar/'+ userId + '/calendar.ics'}>Download as .ical</LinkButton>
            <p className="flex flex-row w-full justify-between">Or copy calendar link: <CopyButton content={webcalURL}/></p>
        </div>
    )
}