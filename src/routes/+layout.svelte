<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<main class=" flex flex-col p-4 gap-2 w-full h-dvh">
  <div class="h-full">
    {@render children()}
  </div>
</main>
