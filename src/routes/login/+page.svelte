<script lang="ts">
  import LoginButton from '$lib/components/LoginButton.svelte';
</script>

<svelte:head>
  <title>Cambridge Engineering Calendar</title>
</svelte:head>

<div class="flex flex-col justify-center items-center align-middle text-center mx-4 space-y-8 min-h-screen bg-slate-50">
  <div class="space-y-2">
    <h1 class="text-4xl font-light tracking-tight text-slate-800">Cambridge Engineering Calendar</h1>
    <p class="text-slate-500">Sign in to manage your schedule</p>
  </div>
  <LoginButton />
  <p class="text-sm text-slate-400">Encountered issues? <a href="https://github.com/nelaggy/eng-calendar/issues" class="underline hover:text-slate-600">Contact</a></p>
</div>
