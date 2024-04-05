import { createClient } from "@/utils/supabase/server";
import type { CalEvent } from "./cal/generator";

export const getCalendar = async (user_id: string) : Promise<CalEvent[]> => {
    const supabase = createClient()
    const {data, error} = await supabase.rpc('assemble_calendar', {user_id});
    if (error) {
        console.log(error)
        throw Error('h')
    }
    return data as CalEvent[]
}