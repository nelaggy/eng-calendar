import { ChangeEventHandler, EventHandler } from "react";

export default function TypePicker({
  onChange,
}: {
  onChange: (value: "Lectures" | "Labs" | "CUES") => void;
}) {
  const calTypes = [
    { name: "Lectures", value: "Lectures" },
    { name: "Labs", value: "Labs" },
  ];
  const optionElems = calTypes.map((e) => (
    <option className="bg-neutral-900" key={e.value} value={e.value}>
      {e.name}
    </option>
  ));
  const onTypeChange = (value: string) => {
    if (value != "Lectures" && value != "Labs" && value != "CUES") {
      throw Error("unexpected error has occurred");
    }
    onChange(value);
  };

  return (
    <div className="flex flex-col w-full space-y-2">
      <label className="text-sm font-medium">Calendar Type</label>
      <select
        defaultValue=""
        className="h-auto border bg-inherit text-base rounded-lg block w-full py-2.5 px-4 focus:outline-none"
        name="calType"
        id="calType"
        onChange={(e) => onTypeChange(e.target.value)}
      >
        <option className="bg-neutral-900" disabled value="" key="">
          {" "}
          -- select calendar type --{" "}
        </option>
        {optionElems}
      </select>
    </div>
  );
}
