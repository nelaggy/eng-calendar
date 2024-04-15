import { getUser } from "@/lib/server/fetch"

export default async function CalLink() {
    const baseURL = 'localhost:3000/calendar/'
    const userId = await getUser()
    const webcalURL = baseURL + userId + '/calendar.ics'
    return (
        <div className="flex flex-row justify-between w-full sm:w-72 mt-6">
            <a href={"webcal://"+webcalURL}>Subscribe</a>
            <a href={"http://"+webcalURL}>Download</a>
        </div>
    )
}