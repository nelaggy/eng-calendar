'use client'

import { useState } from "react"
import CalPicker from "./cal_picker"
import { delGroups } from "../server/cal_pickers"
import { useRouter } from "next/navigation"

export default function Calendars({cals, children}: {cals: {name: string, url: string[], group_id: string}[], children: React.ReactNode}) {
    const calComponents = []
    const [adder, setAdder] = useState(false)
    const router = useRouter()
    const delCal = (id: string) => {
        delGroups([id]);
        router.refresh()
    }
    for (let cal of cals) {
        calComponents.push(
        <li key={cal.group_id}>{cal.name} <button className='float-end' onClick={() => delCal(cal.group_id)}>delete</button></li>
        )
    }
    return (
        <>
            <div className="flex flex-col w-1/3">
                <div className="flex flex-row w-full">
                    <div className="text-3xl">Your Calendars</div>
                    <div className="flex grow"></div>
                    <div className='items-center place-items-center place-content-center float-end'><button onClick={() => setAdder(true)}>Add</button></div>
                </div>
                <ul>
                    {calComponents}
                </ul>
            </div>
            {adder && <CalPicker onClose={() => setAdder(false)}/>}
            {children}
        </>
    )
}