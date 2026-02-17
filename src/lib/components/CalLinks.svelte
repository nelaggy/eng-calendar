<script lang="ts">
  import { browser } from '$app/environment';
  import CopyButton from './ui/CopyButton.svelte';
  import LinkButton from './ui/LinkButton.svelte';

  export let userId: string;
  $: baseURL = browser ? `${window.location.origin}/calendar/` : '/calendar/';
  $: webcalURL = `${baseURL}${userId}/calendar.ics`;
</script>

<div class="flex flex-col w-full space-y-4 h-full">
  <h4 class="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Export</h4>
  
  <div class="flex flex-col space-y-3">
    <LinkButton href={`webcal://${webcalURL}`}>Subscribe to Calendar</LinkButton>
    <LinkButton href={`/calendar/${userId}/calendar.ics`}>Download as .ical</LinkButton>
  </div>
  
  <div class="pt-4 border-t border-slate-100 mt-2">
    <p class="text-xs text-slate-500 mb-2 font-medium">Calendar Link</p>
    <div class="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-1 pl-3 transition-colors hover:border-slate-300">
      <div class="text-xs text-slate-600 truncate flex-grow font-mono select-all mr-2">{webcalURL}</div>
      <CopyButton content={webcalURL} />
    </div>
  </div>
</div>
