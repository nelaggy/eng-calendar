import { generate_cal } from "@/lib/cal/generator";
import { getCalendar } from "@/lib/server/fetch";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
    const events = await getCalendar(params.id)
    return new Response(generate_cal(events).toString(), {status: 200, headers: {'Content-Type': 'text/calendar; charset=utf-8',
    'Content-Disposition': 'attachment; filename="calendar.ics"'}})
}