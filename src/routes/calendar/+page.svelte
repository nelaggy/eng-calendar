<script lang="ts">
  import CalLinks from '$lib/components/CalLinks.svelte';
  import CalendarView from '$lib/components/calendar/CalendarView.svelte';
  import Calendars from '$lib/components/Calendars.svelte';
  import LogoutButton from '$lib/components/LogoutButton.svelte';

  export let data: {
    groups: { name: string; url: string[]; group_id: string }[];
    user: string;
    events: any[];
  };
</script>

<svelte:head>
  <title>Calendar</title>
</svelte:head>

<div class="h-screen flex flex-col bg-slate-50">
  <nav class="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm z-20 shrink-0">
    <div class="flex items-center space-x-8">
      <h1 class="text-xl font-light tracking-tight text-slate-800">Engineering Calendar</h1>
      <div class="hidden md:flex space-x-1">
        <a href="/calendar" class="px-4 py-2 text-sm font-medium text-slate-900 bg-slate-100 rounded-lg">Calendar</a>
        <a href="/modules" class="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors">Modules</a>
      </div>
    </div>
    <LogoutButton />
  </nav>

  <div class="flex-grow overflow-hidden flex flex-col lg:flex-row">
    <div class="flex-grow relative overflow-hidden bg-slate-50 p-6 flex flex-col space-y-6">
      <div class="flex-grow overflow-hidden rounded-2xl bg-white shadow-sm border border-slate-200">
         <div class="h-full">
            <CalendarView events={data.events} />
         </div>
      </div>
    </div>

    <div class="w-full lg:w-72 border-l border-slate-200 bg-white overflow-y-auto p-6 shrink-0 z-10 shadow-[-4px_0_24px_-12px_rgba(0,0,0,0.1)]">
       <CalLinks userId={data.user} />
    </div>
  </div>
</div>
