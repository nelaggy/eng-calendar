<script lang="ts">
  import type { CalEvent } from '$lib/cal/generator';
  import { Calendar } from 'calendar';
  import DayCell from './DayCell.svelte';

  export let events: CalEvent[];

  const months = ['October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June'];
  const cal = new Calendar();
  let month = 0;

  const nextMonth = () => {
    if (month < 8) month = month + 1;
  };

  const prevMonth = () => {
    if (month > 0) month = month - 1;
  };

  $: days = month < 3 ? cal.monthDays(2024, month + 9) : cal.monthDays(2025, month - 3);
  $: filteredEvents = events.filter((e) => {
    if (!e.start_time) return false;
    const eventMonth = new Date(e.start_time).getMonth();
    if (month < 3) return eventMonth == month + 9;
    return eventMonth == month - 3;
  });
</script>

<div class="flex flex-col h-full bg-white">
  <div class="flex-none sticky top-0 z-10 bg-white border-b border-slate-100 p-4 mb-0 flex justify-between items-center">
    <button on:click={prevMonth} aria-label="previous month" class={`p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors ${month == 0 ? 'invisible' : ''}`}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </button>
    <h2 class="text-xl font-medium text-slate-800">{months[month]}</h2>
    <button on:click={nextMonth} aria-label="next month" class={`p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors ${month == 8 ? 'invisible' : ''}`}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </button>
  </div>

  <div class="flex-none grid grid-cols-7 border-b border-slate-100 bg-slate-50 sticky top-[73px] z-10">
    {#each ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as day}
      <div class="py-3 text-center">
        <span class="text-xs font-semibold tracking-wider text-slate-400 uppercase">{day}</span>
      </div>
    {/each}
  </div>

  <div class="flex-grow flex flex-col">
    {#each days as week}
      <div class="grid grid-cols-7 border-b border-slate-100 last:border-b-0 flex-1">
        {#each week as day}
          <DayCell
            {month}
            {day}
            events={filteredEvents.filter((e) => {
              if (!e.start_time) return false;
              return new Date(e.start_time).getDate() === day;
            })}
          />
        {/each}
      </div>
    {/each}
  </div>
</div>
