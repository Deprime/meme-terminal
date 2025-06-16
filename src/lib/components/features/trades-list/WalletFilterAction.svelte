<script lang="ts">
	import type { Snippet } from "svelte";

  // Components
  import FunnelIcon from "@lucide/svelte/icons/funnel";

  // Service
	import { tippy } from "$lib/config/tippy";

  // Props
  let {
    active= false,
    children,
    onclick =() => {},
    ...other
  } : {
    active?: boolean,
    children?: Snippet,
    onclick?: () => void,
    class?: string
  } = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<span 
  class="hover:text-zinc-300 cursor-pointer {other?.class}"
  class:text-zinc-400={!active}
  class:hover:text-zinc-300={!active}
  class:text-blue-500={active}
  class:hover:text-blue-400={active}
  use:tippy={{content: "Filter by Address"}}
  onclick={() => { onclick?.() }}
>
  {#if children}
    {@render children?.()}
  {:else}
    <FunnelIcon size={11} />
  {/if}
</span>