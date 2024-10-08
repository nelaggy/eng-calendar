"use client";

import { assert } from "console";
import { useEffect, useState } from "react";

export default function LabPicker({
  onPicked,
}: {
  onPicked: (selected: { yearGroup: "IA" | "IB"; groupNo: number }) => void;
}) {
  const yearGroups = ["IA", "IB"];
  const [yearGroup, setYearGroup] = useState("");
  const [groupNo, setGroupNo] = useState(0);
  const yearGroupOpts = yearGroups.map((e) => (
    <option className="bg-black" key={e} value={e}>
      {e}
    </option>
  ));
  const onUpdate = () => {
    if (yearGroup != "IA" && yearGroup != "IB") {
      return;
    }
    onPicked({ yearGroup, groupNo });
  };
  useEffect(onUpdate, [yearGroup, groupNo]);
  return (
    <div className="flex flex-col w-full space-y-4">
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium">Year Group</label>
        <select
          defaultValue=""
          className="h-auto border bg-inherit text-base rounded-lg block w-full py-2.5 px-4 focus:outline-none"
          onChange={(e) => {
            setYearGroup(e.target.value);
          }}
        >
          <option className="bg-black" disabled key="" value="">
            {" "}
            -- select year group --{" "}
          </option>
          {yearGroupOpts}
        </select>
      </div>
      {(yearGroup == "IA" || yearGroup == "IB") && (
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium">Group Number</label>
          <input
            className="bg-inherit w-full max-w-xs pr-4 pl-5 py-2 text-sm font-normal shadow-xs border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none leading-relaxed"
            type="number"
            min={1}
            max={yearGroup == "IA" ? 180 : yearGroup == "IB" ? 163 : 1}
            onChange={(e) => {
              setGroupNo(e.target.valueAsNumber);
            }}
          />
        </div>
      )}
    </div>
  );
}
