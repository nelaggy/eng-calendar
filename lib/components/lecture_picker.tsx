import { YearGroup, getLectureGroups } from "../server/cal_pickers"

export default function LecturePicker ({lectureGroups, onPicked}: {lectureGroups: {name: string, group_id: string}[], onPicked: (selected: string[]) => void}) {
    const optionElems = lectureGroups.map((e) => <option value={e.group_id}>{e.name}</option>)
    const onChange = (selected: string[]) => {
        onPicked(selected)
    }

    return (
        <>
            <select name="lectureGroup" id="lectureGroup" multiple onChange={(e) => {
                const selected = e.target.selectedOptions
                const selectedOptions = []
                for (var i = 0; i<selected.length; i++) {
                    selectedOptions.push(selected[i].value)
                }
                onChange(selectedOptions)
            }}>
                {optionElems}
            </select>
        </>
    )
}