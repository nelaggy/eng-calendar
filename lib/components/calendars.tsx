'use client'

import { useState } from "react"
import CalPicker from "./pickers/CalPicker"
import { delGroups } from "../server/cal_pickers"
import { useRouter } from "next/navigation"
import { DeleteButton } from "./ui/DeleteButton"
import { AddButton } from "./ui/AddButton"

export default function Calendars({
    cals, 
    children
}: {
    cals: {
        name: string, 
        url: string[], 
        group_id: string
    }[], 
    children: React.ReactNode
}) {
    const calComponents = []
    const [adder, setAdder] = useState(false)
    const router = useRouter()
    const delCal = (id: string) => {
        delGroups([id]);
        router.refresh()
    }
    for (let cal of cals) {
        calComponents.push(
        <li key={cal.group_id} className='h-10 flex items-center'>
            {cal.name}
            <div className="flex grow"></div>
            <button className='float-end flex items-center justify-center' onClick={() => delCal(cal.group_id)}>
                <DeleteButton />
            </button>
        </li>
        )
    }
    return (
        <>
            <div className="flex flex-col w-full md:w-72">
                <div className="flex flex-row w-full items-center">
                    <div className="text-3xl">Your Calendars</div>
                    <div className="flex grow"></div>
                    <button onClick={() => setAdder(true)}>
                        <AddButton />
                    </button>
                </div>
                <ul className="divide-y divide-solid">
                    {calComponents}
                </ul>
            </div>
            {adder && <CalPicker onClose={() => setAdder(false)}/>}
            {children}
        </>
    )
}