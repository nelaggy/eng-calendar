<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import Button from '../ui/Button.svelte';
  import LabPicker from './LabPicker.svelte';
  import LecturePicker from './LecturePicker.svelte';
  import TypePicker from './TypePicker.svelte';

  export let onClose: () => void;

  let submit = false;
  let typePicked = '';
  let lectureGroups: { name: string; group_id: string }[] = [];
  let labGroup: { yearGroup: '' | 'IA' | 'IB'; groupNo: number } = { yearGroup: '', groupNo: 0 };
  let groups: string[] = [];
  const CUES_GROUP_ID = '32e339a9-b351-4721-98f4-72f6cabbbae9';

  const onTypeChange = async (value: 'Lectures' | 'Labs' | 'CUES') => {
    typePicked = value;
    submit = false;
    if (value == 'Lectures') {
      const res = await fetch('/api/groups/lecture');
      lectureGroups = await res.json();
    }
    if (value == 'CUES') {
      submit = true;
    }
  };

  const onPicked = (selected: string[]) => {
    submit = false;
    groups = selected;
    if (selected.length > 0) {
      submit = true;
    }
  };

  const onUpdateLabGroup = (selected: { yearGroup: 'IA' | 'IB'; groupNo: number }) => {
    submit = false;
    labGroup = selected;
    const max = selected.yearGroup == 'IA' ? 180 : selected.yearGroup == 'IB' ? 168 : 0;
    if ((selected.yearGroup == 'IA' || selected.yearGroup == 'IB') && selected.groupNo > 0 && selected.groupNo <= max) {
      submit = true;
    }
  };

  const onSubmit = async () => {
    if (typePicked == 'Lectures') {
      await fetch('/api/groups/add', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ groupIds: groups })
      });
    }
    if (typePicked == 'Labs') {
      if (labGroup.yearGroup == '') {
        throw Error('pick a year group');
      }
      await fetch('/api/groups/lab', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ yearGroup: labGroup.yearGroup, groupNo: labGroup.groupNo })
      });
    }
    if (typePicked == 'CUES') {
      await fetch('/api/groups/add', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ groupIds: [CUES_GROUP_ID] })
      });
    }
    await invalidateAll();
    onClose();
  };
</script>

<div class="absolute inset-0 w-full h-full flex justify-center items-center z-50 bg-slate-900/20 backdrop-blur-sm">
  <div class="w-96 flex items-center z-50 flex-col space-y-6 bg-white shadow-xl min-h-100 p-8 rounded-2xl border border-slate-100">
    <h3 class="text-xl font-medium text-slate-800">Add Calendar</h3>
    <div class="flex-col flex-grow space-y-4 w-full">
      <TypePicker onChange={onTypeChange} />
      {#if typePicked == 'Lectures'}
        <LecturePicker {lectureGroups} onPicked={onPicked} />
      {/if}
      {#if typePicked == 'Labs'}
        <LabPicker onPicked={onUpdateLabGroup} />
      {/if}
    </div>
    <div class="flex flex-row w-64 justify-between mt-8">
      <div>
        <Button onClick={() => onClose()}>Cancel</Button>
      </div>
      <div>
        <Button onClick={onSubmit} disabled={!submit}>Add</Button>
      </div>
    </div>
  </div>
</div>
