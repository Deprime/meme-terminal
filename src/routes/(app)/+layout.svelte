<script lang="ts">
  // Components
  import { StatePanel, Header } from "@/structure";

  // Props
	let { children } = $props();
</script>

<main class="flex flex-col w-full h-dvh overflow-auto">
  <Header />

  <div class="flex justify-center w-full h-full overflow-y-auto">
    {@render children()}
  </div>
  <StatePanel />
</main>
