'use server'
import { createClient } from "@/utils/supabase/server";
import type { Database } from "@/lib/supabase";
export type YearGroup = Database['public']['Enums']['year_groups']
type LectureGroupsReturn = Database['public']['Functions']['all_groups_by_type']['Returns']
//export type CalType = Database['public']['Enums']['cal_type']

const sortLectureGroups = (groups: LectureGroupsReturn) => {
    const sortedGroups = groups.sort((a, b) => {
        const aModule = a.name.split(' ')[0]
        const bModule = b.name.split(' ')[0]
        if (aModule == 'IA') {
            if (bModule == 'IA') {
                return 0
            }
            return -1
        }
        if (aModule == 'IB') {
            if (bModule == 'IA') {
                return 1
            }
            if (bModule == 'IB') {
                return 0
            }
            return -1
        }
        const aYear = parseInt(aModule[0])
        const bYear = parseInt(bModule[0])
        const aCode = aModule[1]
        const bCode = bModule[1]
        const aNumber = parseInt(aModule.slice(2))
        const bNumber = parseInt(bModule.slice(2))
        if (aYear == bYear) {
            if (aCode == bCode) {
                return aNumber - bNumber
            }
            return aCode < bCode ? -1 : 1
        }
        return aYear - bYear
    })
    return sortedGroups
}

export const getLectureGroups = async () => {
    const supabase = createClient()
    const userId = (await supabase.auth.getUser()).data.user?.id
    if (!userId) {
        throw Error('not logged in')
    }
    const { data, error } = await supabase.rpc('all_groups_by_type', {caltype: 'Lectures'})
    return sortLectureGroups(data as LectureGroupsReturn);
}

export const addGroups = async (groupIds: string[]) => {
    const supabase = createClient()
    const userId = (await supabase.auth.getUser()).data.user?.id
    if (!userId) {
        throw Error('not logged in')
    }
    return await supabase.rpc('add_groups', {user_id: userId, group_ids: groupIds})
}

export const addLabGroup = async (yearGroup: 'IA'|'IB'|'IIA'|'IIB', groupNo: number) => {
    if (!(['IA', 'IB', 'IIA', 'IIB'].includes(yearGroup))) {
        throw Error('invalid year group')
    }
    if (!Number.isInteger(groupNo) || (yearGroup == 'IA' && groupNo > 180) || (yearGroup == 'IB' && groupNo > 168) || groupNo < 1) {
        throw Error('invalid group number')
    }
    const supabase = createClient()
    const userId = (await supabase.auth.getUser()).data.user?.id
    if (!userId) {
        throw Error('not logged in')
    }
    const { data,error } = await supabase.rpc('add_lab_group', {user_id: userId, year: yearGroup, group_no: groupNo})
    return data;
}

export const delGroups = async (groupIds: string[]) => {
    const supabase = createClient()
    const userId  = (await supabase.auth.getUser()).data.user?.id
    if (!userId) {
        throw Error('not logged in')
    }
    return await supabase.rpc('del_groups', {userid: userId, group_ids: groupIds})
}