<script lang="ts">
  import type { CalEvent } from '$lib/cal/generator';
  import { onMount } from 'svelte';

  export let month: number;
  export let day: number;
  export let events: CalEvent[];

  const sortedEvents = events.sort((a, b) => new Date(a.start_time!).getTime() - new Date(b.start_time!).getTime());

  let isDesktop = false;
  let showModal = false;

  onMount(() => {
    isDesktop = window.innerWidth > 1024;
    const handleResize = () => {
      isDesktop = window.innerWidth > 1024;
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('click', (e) => {
      if (showModal && (e.target as HTMLElement).closest('#day-modal') === null) {
        showModal = false;
      }
    });
    return () => window.removeEventListener('resize', handleResize);
  });

  const months = ['October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June'];
</script>

<button
  class="h-full border-r border-slate-100 last:border-r-0 flex flex-col items-stretch p-2 transition-colors duration-200 hover:bg-slate-50 cursor-pointer relative group text-left"
  onclick={(e) => {
    e.stopPropagation();
    showModal = true;
  }}
  aria-roledescription="button"
>
  {#if day !== 0}
    <div class="flex justify-between items-start mb-1 h-7">
      <span class="text-sm font-medium text-slate-700 w-7 h-7 flex items-center justify-center rounded-full group-hover:bg-slate-200/50 transition-colors">{day}</span>
    </div>
    {#if isDesktop}
      <div class="flex flex-col space-y-1 w-full overflow-hidden">
        {#each sortedEvents.slice(0, 3) as e}
          <div class="text-[10px] bg-sky-50 text-sky-700 px-1.5 py-0.5 rounded truncate border border-sky-100 w-full block">
            {#if e.start_time}
              <span class="font-medium mr-1">{new Date(e.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            {/if}
            <span class="opacity-90">{e.title}</span>
          </div>
        {/each}
        {#if sortedEvents.length > 3}
          <div class="text-[10px] text-slate-400 pl-1 font-medium">+ {sortedEvents.length - 3} more</div>
        {/if}
      </div>
    {:else}
      <div class="flex space-x-1 mt-1 justify-center">
        {#if sortedEvents.length > 0}
           <div class="w-1.5 h-1.5 rounded-full bg-sky-400"></div>
        {/if}
      </div>
    {/if}
  {/if}
</button>

{#if showModal}
  <div class="fixed inset-0 w-full h-full flex justify-center items-center z-50 bg-slate-900/20 backdrop-blur-sm p-4 top-0 left-0">
    <div id="day-modal" class="w-full max-w-md flex items-center z-50 flex-col space-y-4 bg-white shadow-xl min-h-100 p-6 rounded-2xl border border-slate-100 max-h-[80vh] overflow-y-auto">
      <div class="w-full flex justify-between items-center border-b border-slate-100 pb-4">
        <h3 class="text-xl font-medium text-slate-800">{months[month]} {day}</h3>
        <button aria-label="close modal" onclick={() => showModal = false} class="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-50 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>  
      </div>
      
      <div class="flex flex-col space-y-3 w-full">
        {#each events as e}
          <div class="text-sm p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 hover:border-slate-200 transition-colors">
            {#if e.start_time && e.end_time}
               <div class="text-xs font-semibold text-slate-500 mb-1 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3 h-3 mr-1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {new Date(e.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  {' - '}
                  {new Date(e.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
               </div>
            {/if}
            <div class="font-medium text-slate-800">{e.title}</div>
            {#if e.location}
               <div class="text-xs text-slate-500 mt-1 line-clamp-2">{e.location}</div>
            {/if}
          </div>
        {/each}
        {#if events.length === 0}
          <div class="text-center text-slate-400 py-8 flex flex-col items-center">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 mb-2 opacity-50">
               <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
             </svg>
             No events for this day
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}
