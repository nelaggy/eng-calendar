<script lang="ts">
  export let onPicked: (selected: { yearGroup: 'IA' | 'IB'; groupNo: number }) => void;

  const yearGroups = ['IA', 'IB'];
  let yearGroup = '';
  let groupNo = 0;

  $: if (yearGroup == 'IA' || yearGroup == 'IB') {
    onPicked({ yearGroup, groupNo });
  }

  const handleYearGroupChange = (event: Event) => {
    const target = event.currentTarget as HTMLSelectElement;
    yearGroup = target.value;
  };

  const handleGroupNoChange = (event: Event) => {
    const target = event.currentTarget as HTMLInputElement;
    groupNo = target.valueAsNumber;
  };
</script>

<div class="flex flex-col w-full space-y-4">
  <div class="flex flex-col space-y-2">
    <label class="text-sm font-medium text-slate-700">Year Group</label>
    <div class="relative">
      <select
        class="h-auto border border-slate-200 bg-white text-base rounded-xl block w-full py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300 transition-all appearance-none text-slate-700"
        onchange={handleYearGroupChange}
      >
        <option disabled value="" selected> -- select year group -- </option>
        {#each yearGroups as e}
          <option value={e}>{e}</option>
        {/each}
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </div>
  </div>

  {#if yearGroup == 'IA' || yearGroup == 'IB'}
    <div class="flex flex-col space-y-2">
      <label class="text-sm font-medium text-slate-700">Group Number</label>
      <input
        class="bg-white w-full pr-4 pl-5 py-2.5 text-base font-normal shadow-sm border border-slate-200 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300 transition-all text-slate-700"
        type="number"
        min={1}
        max={yearGroup == 'IA' ? 180 : yearGroup == 'IB' ? 168 : 1}
        onchange={handleGroupNoChange}
      />
    </div>
  {/if}
</div>
