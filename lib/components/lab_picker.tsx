'use client'

import { useEffect, useState } from "react"

export default function LabPicker({onPicked}: {onPicked: (selected: {yearGroup: 'IA'|'IB', groupNo: number}) => void}) {
    const yearGroups = ['IA', 'IB']
    const [yearGroup, setYearGroup] = useState('')
    const [groupNo, setGroupNo] = useState(0)
    const yearGroupOpts = yearGroups.map(e => <option value={e}>{e}</option>) 
    const onUpdate = () => {
        const max = yearGroup == 'IA' ? 180 : (yearGroup == 'IB' ? 163 : 1)
        if ((yearGroup == 'IA' || yearGroup == 'IB') && groupNo > 0 && groupNo <= max) {
            onPicked({yearGroup, groupNo})
        }
    }
    useEffect(onUpdate, [yearGroup, groupNo])
    return (
        <>
        <select onChange={(e) => {
            setYearGroup(e.target.value)
        }}>
            <option disabled selected value=''> -- year group -- </option>
            {yearGroupOpts}
        </select>
        {(yearGroup == 'IA' || yearGroup == 'IB') && <input type="number" min={1} max={yearGroup == 'IA' ? 180 : (yearGroup == 'IB' ? 163 : 1)}  onChange={(e) => {
            setGroupNo(e.target.valueAsNumber)
        }}/> }
        </>
    )
}