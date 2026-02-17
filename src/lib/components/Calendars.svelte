<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import AddButton from './ui/AddButton.svelte';
  import DeleteButton from './ui/DeleteButton.svelte';
  import CalPicker from './pickers/CalPicker.svelte';

  export let cals: { name: string; url: string[]; group_id: string }[];
  let adder = false;

  const delCal = async (id: string) => {
    await fetch('/api/groups/delete', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ groupIds: [id] })
    });
    await invalidateAll();
  };
</script>

<div class="flex flex-col w-full h-full">
  <div class="flex flex-row w-full items-center mb-4 justify-between">
    <div class="text-sm font-semibold text-slate-400 uppercase tracking-wider">Calendars</div>
    <button on:click={() => (adder = true)} class="p-1 -mr-1 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors" title="Add Calendar">
      <AddButton />
    </button>
  </div>
  {#if cals.length > 0}
  <ul class="flex flex-col space-y-1">
    {#each cals as cal}
      <li class="group flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
        <span class="text-sm font-medium text-slate-700 truncate mr-2">{cal.name}</span>
        <button class="text-slate-300 hover:text-red-500 transition-colors p-1 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none" on:click={() => delCal(cal.group_id)} aria-label="Delete calendar">
          <DeleteButton />
        </button>
      </li>
    {/each}
  </ul>
  {:else}
    <div class="text-sm text-slate-400 py-2 italic">No calendars added yet</div>
  {/if}
</div>
{#if adder}
  <CalPicker onClose={() => (adder = false)} />
{/if}
