<script lang="ts">
  export let disabled = false;
  export let onClick: (() => void) | undefined;
</script>

{#if !disabled}
  <button
    class="py-2.5 px-6 text-sm border border-slate-200 rounded-xl shadow-sm bg-white font-medium text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2"
    on:click={() => onClick && onClick()}
  >
    <slot />
  </button>
{:else}
  <button
    class="py-2.5 px-6 text-sm border border-slate-200 rounded-xl shadow-sm bg-slate-50 text-slate-400 font-medium cursor-not-allowed"
    disabled={true}
  >
    <slot />
  </button>
{/if}
