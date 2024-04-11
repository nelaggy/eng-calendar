import ical, { ICalCalendar, ICalCalendarMethod } from "ical-generator"
export type CalEvent = {
    id: string
    title: string | null
    group: string | null
    start_time: Date | null
    end_time: Date | null
    location: string | null
    dtstamp: Date | null
    organiser: string | null
    speaker: string | null
    year: string | null
    term: string | null
}
export const generate_cal = (events : CalEvent[]) : ICalCalendar => {
    let calendar = ical({name: 'Engineering Calendar'})
    calendar.method(ICalCalendarMethod.PUBLISH)
    for (let e of events) {
        calendar.createEvent({
            start: e.start_time!,
            end: e.end_time!,
            summary: e.title ?? " ",
            location: e.location,
            id: e.id,
            stamp: e.dtstamp ?? undefined,
            organizer: e.organiser ?? undefined,
            description: `${e.speaker ?? ''}\n${e.group ?? ''}`
        })
    }
    return calendar
}