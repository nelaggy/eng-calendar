<script lang="ts">
  export let lectureGroups: { name: string; group_id: string }[];
  export let onPicked: (selected: string[]) => void;

  const onChange = (selected: string[]) => {
    onPicked(selected);
  };

  const handleChange = (event: Event) => {
    const target = event.currentTarget as HTMLSelectElement;
    const selected = target.selectedOptions;
    const selectedOptions: string[] = [];
    for (let i = 0; i < selected.length; i++) {
      selectedOptions.push(selected[i].value);
    }
    onChange(selectedOptions);
  };
</script>

<div class="flex flex-col w-full space-y-2">
  <label class="text-sm font-medium text-slate-700">Lecture Group</label>
  <div class="relative">
    <select
      class="bg-white h-auto border border-slate-200 text-base rounded-xl block w-full py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300 transition-all appearance-none text-slate-700"
      name="lectureGroup"
      id="lectureGroup"
      on:change={handleChange}
    >
      <option disabled value="" selected> -- select lecture group -- </option>
      {#each lectureGroups as e}
        <option value={e.group_id}>{e.name}</option>
      {/each}
    </select>
    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </svg>
    </div>
  </div>
</div>
