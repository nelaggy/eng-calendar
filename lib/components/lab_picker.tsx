'use client'

import { assert } from "console"
import { useEffect, useState } from "react"

export default function LabPicker({onPicked}: {onPicked: (selected: {yearGroup: 'IA'|'IB', groupNo: number}) => void}) {
    const yearGroups = ['IA', 'IB']
    const [yearGroup, setYearGroup] = useState('')
    const [groupNo, setGroupNo] = useState(0)
    const yearGroupOpts = yearGroups.map(e => <option className="bg-black" key={e} value={e}>{e}</option>) 
    const onUpdate = () => {
        if (yearGroup != 'IA' && yearGroup != 'IB') {
            return
        }
        onPicked({yearGroup, groupNo})
    }
    useEffect(onUpdate, [yearGroup, groupNo])
    return (
        <>
        <select defaultValue='' className="bg-inherit border-2 border-slate-50" onChange={(e) => {
            setYearGroup(e.target.value)
        }}>
            <option className='bg-black' disabled key='' value=''> -- year group -- </option>
            {yearGroupOpts}
        </select>
        {(yearGroup == 'IA' || yearGroup == 'IB') && <input className="bg-inherit border-2 border-slate-50" type="number" min={1} max={yearGroup == 'IA' ? 180 : (yearGroup == 'IB' ? 163 : 1)}  onChange={(e) => {
            setGroupNo(e.target.valueAsNumber)
        }}/> }
        </>
    )
}