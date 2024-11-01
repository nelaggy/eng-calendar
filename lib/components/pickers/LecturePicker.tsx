import { YearGroup, getLectureGroups } from "../../server/cal_pickers";

export default function LecturePicker({
  lectureGroups,
  onPicked,
}: {
  lectureGroups: { name: string; group_id: string }[];
  onPicked: (selected: string[]) => void;
}) {
  const optionElems = lectureGroups.map((e) => (
    <option className="dark:bg-neutral-900" key={e.group_id} value={e.group_id}>
      {e.name}
    </option>
  ));
  const onChange = (selected: string[]) => {
    onPicked(selected);
  };

  return (
    <div className="flex flex-col w-full space-y-2">
      <label className="text-sm font-medium">Lecture Group</label>
      <select
        defaultValue=""
        className="bg-inherit h-auto border border-gray-300 text-base rounded-lg block w-full py-2.5 px-4 focus:outline-none"
        name="lectureGroup"
        id="lectureGroup"
        onChange={(e) => {
          const selected = e.target.selectedOptions;
          const selectedOptions = [];
          for (var i = 0; i < selected.length; i++) {
            selectedOptions.push(selected[i].value);
          }
          onChange(selectedOptions);
        }}
      >
        <option className="dark:bg-neutral-900" disabled value="" key="">
          {" "}
          -- select lecture group --{" "}
        </option>
        {optionElems}
      </select>
    </div>
  );
}
