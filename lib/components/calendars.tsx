'use client'

import { useState } from "react"
import CalPicker from "./cal_picker"
import { delGroups } from "../server/cal_pickers"
import { useRouter } from "next/navigation"

export default function Calendars({cals}: {cals: {name: string, url: string[], group_id: string}[]}) {
    const calComponents = []
    const [adder, setAdder] = useState(false)
    const router = useRouter()
    const delCal = (id: string) => {
        delGroups([id]);
        router.refresh()
    }
    for (let cal of cals) {
        calComponents.push(<li key={cal.group_id}>{cal.name} <button onClick={() => delCal(cal.group_id)}>delete</button></li>)
    }
    return (
        <>
            <div>Your Calendars</div>
            <div><button onClick={() => setAdder(true)}>Add Calendar</button></div>
            <ul>
                {calComponents}
            </ul>
            {adder && <CalPicker onClose={() => setAdder(false)}/>}
        </>
    )
}