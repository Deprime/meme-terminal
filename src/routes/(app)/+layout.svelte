<script lang="ts">
  // Components
  import { StatePanel, Header } from "@/structure";

  // import { ScrollArea } from "$lib/components/ui/scroll-area";

  // Props
	let { children } = $props();
</script>

<main class="flex flex-col w-full h-dvh overflow-auto">
  <Header />
  <!-- <ScrollArea class="flex justify-center w-full h-full overflow-y-auto"> -->
  <!-- </ScrollArea> -->
  <div class="flex justify-center w-full h-full overflow-y-auto">
    {@render children()}
  </div>
  <StatePanel />
</main>
