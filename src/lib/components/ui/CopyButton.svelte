<script lang="ts">
  import { onDestroy } from 'svelte';

  export let content: string | undefined = undefined;
  let tooltipOpen = false;
  let timer: ReturnType<typeof setTimeout> | undefined;

  const copyLink = async () => {
    await navigator.clipboard.writeText(content || '');
    tooltipOpen = true;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      tooltipOpen = false;
    }, 2000);
  };

  onDestroy(() => {
    if (timer) clearTimeout(timer);
  });
</script>

<div class="relative">
  <button 
    class="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg transition-all shadow-sm border border-transparent hover:border-slate-200"
    on:click={copyLink}
    title="Copy to clipboard"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-4 h-4"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
      />
    </svg>
  </button>
  {#if tooltipOpen}
    <div class="absolute -top-8 right-0 bg-slate-800 text-white text-[10px] px-2 py-1 rounded shadow-lg animate-fade-in-up">Copied!</div>
  {/if}
</div>
