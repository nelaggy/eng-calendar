<script lang="ts">
  import type { CalEvent } from '$lib/cal/generator';
  import MonthView from './MonthView.svelte';

  export let events: CalEvent[];
</script>

<div class="w-full h-full select-none overflow-hidden">
  <MonthView {events} />
</div>
