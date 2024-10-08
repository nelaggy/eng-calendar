"use client";

import { useState } from "react";
import TypePicker from "./TypePicker";
import LecturePicker from "./LecturePicker";
import {
  addGroups,
  addLabGroup,
  getLectureGroups,
} from "@/lib/server/cal_pickers";
import { useRouter } from "next/navigation";
import LabPicker from "./LabPicker";
import { Button } from "../ui/Button";

export default function CalPicker({ onClose }: { onClose: () => void }) {
  const [submit, setSubmit] = useState(false);
  const [typePicked, setTypePicked] = useState("");
  const [lectureGroups, setLectureGroups] = useState<
    { name: string; group_id: string }[]
  >([]);
  const [labGroup, setLabGroup] = useState<{
    yearGroup: "" | "IA" | "IB";
    groupNo: number;
  }>({ yearGroup: "", groupNo: 0 });
  const [groups, setGroups] = useState<string[]>([]);
  const router = useRouter();
  const CUES_GROUP_ID = "32e339a9-b351-4721-98f4-72f6cabbbae9";
  const onTypeChange = async (value: "Lectures" | "Labs" | "CUES") => {
    setTypePicked(value);
    setSubmit(false);
    if (value == "Lectures") {
      setLectureGroups(await getLectureGroups());
    }
    if (value == "CUES") {
      setSubmit(true);
    }
  };
  const onPicked = (selected: string[]) => {
    setSubmit(false);
    setGroups(selected);
    if (selected.length > 0) {
      setSubmit(true);
    }
  };
  const onUpdateLabGroup = (selected: {
    yearGroup: "IA" | "IB";
    groupNo: number;
  }) => {
    setSubmit(false);
    setLabGroup(selected);
    const max =
      selected.yearGroup == "IA" ? 180 : selected.yearGroup == "IB" ? 168 : 0;
    if (
      (selected.yearGroup == "IA" || selected.yearGroup == "IB") &&
      selected.groupNo > 0 &&
      selected.groupNo <= max
    ) {
      setSubmit(true);
    }
  };
  const onSubmit = async () => {
    if (typePicked == "Lectures") {
      await addGroups(groups);
    }
    if (typePicked == "Labs") {
      if (labGroup.yearGroup == "") {
        throw Error("pick a year group");
      }
      await addLabGroup(labGroup.yearGroup, labGroup.groupNo);
    }
    if (typePicked == "CUES") {
      await addGroups([CUES_GROUP_ID]);
    }
    router.refresh();
    onClose();
  };
  return (
    <div className="absolute inset-0 w-full h-full flex justify-center items-center z-10 bg-black/50">
      <div className="w-96 flex items-center z-10 flex-col space-y-4 bg-neutral-50 dark:bg-neutral-900 min-h-100 p-6 rounded-lg">
        <h3 className="text-xl font-semibold">Add Calendar</h3>
        <div className="flex-col flex-grow space-y-4 w-11/12">
          <TypePicker onChange={(value) => onTypeChange(value)} />
          {typePicked == "Lectures" && (
            <LecturePicker lectureGroups={lectureGroups} onPicked={onPicked} />
          )}
          {typePicked == "Labs" && <LabPicker onPicked={onUpdateLabGroup} />}
        </div>
        <div className="flex flex-row w-64 justify-between mt-8">
          <div>
            <Button onClick={() => onClose()}>Cancel</Button>
          </div>
          <div>
            <Button onClick={() => onSubmit()} disabled={!submit}>
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
