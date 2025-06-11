<script lang="ts">
  // import { type Snippet } from 'svelte';
  import VirtualList from 'svelte-tiny-virtual-list';

  // Components
  import InfoIcon from "@lucide/svelte/icons/info";
  import TradesListItem from "./TradesListItem.svelte";

  import { tippy } from "$lib/config/tippy";

  // Types
  interface ITradesList {
    trades?: [],
    // children?: Snippet,
    // class?: string,
  }

  // Props
  let {
    trades = [],
    // children,
    // ...other
  }: ITradesList = $props();
</script>

<div class="w-full flex flex-col">
  <div class="sticky top-0 z-10 hidden xl:flex flex-shrink-0 items-center h-10 min-w-max border-b border-b-stone-800 px-4">
    <div class="flex items-center">
      <span>
        Date age
      </span>

      <span use:tippy={{ content: "The date/time the transaction was made."}}>
        <InfoIcon size={16} class="text-slate-400" />
      </span>
    </div>
  </div>

  {#each trades as trade, index (index)}
    <TradesListItem {trade}  />
  {/each}
</div>