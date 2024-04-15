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
        <li key={cal.group_id} className='h-10 flex items-center'>
            {cal.name}
            <div className="flex grow"></div>
            <button className='float-end flex items-center justify-center' onClick={() => delCal(cal.group_id)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
            </button>
        </li>
        )
    }
    return (
        <>
            <div className="flex flex-col w-full sm:w-72">
                <div className="flex flex-row w-full mb-2">
                    <div className="text-3xl">Your Calendars</div>
                    <div className="flex grow"></div>
                    <button onClick={() => setAdder(true)} className="flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
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