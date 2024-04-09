import { ChangeEventHandler, EventHandler } from "react"

export default function TypePicker ({onChange} : {onChange: (value: 'Lectures'|'Labs'|'CUES') => void}) {
    const calTypes = [{name: 'Lectures', value: 'Lectures'}, {name: 'Labs', value: 'Labs'}, {name: 'CUES Events', value: 'CUES'}]
    const optionElems = calTypes.map((e) => <option value={e.value}>{e.name}</option>)
    const onTypeChange = (value: string) => {
        if (value != 'Lectures' && value != 'Labs' && value != 'CUES') {
            throw Error('unexpected error has occurred')
        }
        onChange(value)
    }

    return (
        <>
            <select name="calType" id="calType" onChange={(e) => onTypeChange(e.target.value)}>
                <option disabled selected value=''> -- calendar type -- </option>
                {optionElems}
            </select>
        </>
    )
}