<script lang="ts">
  export let href: string;
</script>

<a href={href} class="inline-block py-2.5 px-6 text-sm border border-slate-200 rounded-xl shadow-sm bg-white font-medium text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2">
  <slot />
</a>
