import { createClient } from "@/utils/supabase/server";
import type { CalEvent } from "@/lib/cal/generator";

const getUser = async () => {

}

export const getCalendar = async (userId: string) : Promise<CalEvent[]> => {
    const supabase = createClient()
    const {data, error} = await supabase.rpc('assemble_calendar', {user_id: userId});
    if (error) {
        console.log(error)
        throw Error('h')
    }
    return data as CalEvent[]
}

export const getGroups = async () => {
    const supabase = createClient()
    const userId = (await supabase.auth.getUser()).data.user?.id
    if (!userId) {
        throw Error('not logged in')
    }
    const { data, error } = await supabase.rpc('get_groups', {user_id: userId})
    if (error) {
        console.log(error)
        throw Error('h')
    }
    return data as {name: string, url: string[], group_id: string}[]
}