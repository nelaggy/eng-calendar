import { ChangeEventHandler, EventHandler } from "react"

export default function TypePicker ({onChange} : {onChange: (value: 'Lectures'|'Labs'|'CUES') => void}) {
    const calTypes = [{name: 'Lectures', value: 'Lectures'}, {name: 'Labs', value: 'Labs'}]
    const optionElems = calTypes.map((e) => <option className="bg-black" key={e.value} value={e.value}>{e.name}</option>)
    const onTypeChange = (value: string) => {
        if (value != 'Lectures' && value != 'Labs' && value != 'CUES') {
            throw Error('unexpected error has occurred')
        }
        onChange(value)
    }

    return (
        <>
            <select defaultValue='' className="bg-inherit border-2 border-slate-50" name="calType" id="calType" onChange={(e) => onTypeChange(e.target.value)}>
                <option className="bg-black" disabled value='' key=''> -- calendar type -- </option>
                {optionElems}
            </select>
        </>
    )
}