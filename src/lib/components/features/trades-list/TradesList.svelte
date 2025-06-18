<script lang="ts">
  // import { type Snippet } from 'svelte';
  import VirtualList from 'svelte-tiny-virtual-list';

  // Components
  import InfoIcon from "@lucide/svelte/icons/info";
  import ArroUpIcon from "@lucide/svelte/icons/arrow-up";
  import ArroDownIcon from "@lucide/svelte/icons/arrow-down";
  import CircleDollarSignIcon from "@lucide/svelte/icons/circle-dollar-sign";

  import TradesListItem from "./TradesListItem.svelte";
  import TradesListPlaceholder from './TradesListPlaceholder.svelte';

  // Services
  import { tippy } from "$lib/config/tippy";

  // Stores
  import tradeTableStore from '$lib/stores/trade-table';

  // Constants
  import { TRADES_HEADERS } from './constants';
  import { CHAINS } from '$lib/constants/app';

  // Types
  interface ITradesList {
    loading?: boolean,
    trades?: [],
    // children?: Snippet,
    // class?: string,
  }

  // Props
  let {
    loading = true,
    trades = [],
    // children,
    // ...other
  }: ITradesList = $props();

  // Methods
  const onTimeFormatClick = (format: "date" | "age") => {
    $tradeTableStore.timeFormat = format;
  }

  /**
   * On sort change
   */
  const onChangeSort = () => {
    const { order } = $tradeTableStore.sort;
    $tradeTableStore.sort.order = order === 'asc' ? 'desc' : 'asc';
  }

  /**
   * On currency change
   */
  const onChangeCurrency = () => {
    $tradeTableStore.priceFormat = $tradeTableStore.priceFormat === "usd" 
      ? "chain" 
      : "usd"
  }
</script>

<div class="w-full h-[804px] overflow-y-auto flex flex-col border-t border-t-stone-800">
  <div class="sticky top-0 z-10 hidden xl:flex flex-shrink-0 items-center justify-between h-9 min-w-max border-b border-b-stone-800 px-4">
    {#each TRADES_HEADERS as header (header.key)}
      <div 
        class="flex gap-2 items-center min-w-40"
        class:justify-end={header.key === "maker"}
      >
        {#if header.label}
          <span class="text-xs text-zinc-500 font-semibold cursor-default">
            {header.label}
          </span>
        {/if}

        {#if header.key === 'time'}
          <div class="flex gap-0.5 p-0.5 rounded-full bg-zinc-900">
            <button 
              class="text-xs font-semibold px-2 py-px rounded-lg cursor-pointer transition-all"
              class:bg-zinc-800={$tradeTableStore.timeFormat === "date"}
              class:text-zinc-400={$tradeTableStore.timeFormat !="date"}
              class:text-zinc-200={$tradeTableStore.timeFormat === "date"}
              disabled={loading}
              onclick={() => { onTimeFormatClick("date") }}
            >
              Date
            </button>
            <button 
              class="text-xs font-semibold px-2 py-px rounded-lg cursor-pointer transition-all"
              class:bg-zinc-800={$tradeTableStore.timeFormat === "age"}
              class:text-zinc-400={$tradeTableStore.timeFormat !="age"}
              class:text-zinc-200={$tradeTableStore.timeFormat === "age"}
              disabled={loading}
              onclick={() => { onTimeFormatClick("age") }}
            >
              Age
            </button>
          </div>

          <button 
            class="text-zinc-500 cursor-pointer"
            disabled={loading}
            onclick={onChangeSort}
          >
            {#if $tradeTableStore.sort.order === "asc"}
              <ArroDownIcon size={16} />
            {:else}
              <ArroUpIcon size={16} />
            {/if}
          </button>
        {/if}

        {#if header.key === 'total'}
          <button 
            class="text-zinc-500 font-semibold cursor-pointer text-xs flex items-center gap-1.5"
            disabled={loading}
            onclick={onChangeCurrency}
          >
            <span class="flex items-center gap-1 pb-px">
              <span class="capitalize">
                {header.key} 
              </span>
              <span class="uppercase">
                {#if $tradeTableStore.priceFormat === "usd"}
                  {$tradeTableStore.priceFormat}
                {:else}
                  {CHAINS.SOL.symbol}
                {/if}
              </span>
            </span>
            <span class:text-teal-400={$tradeTableStore.priceFormat === "usd"}>
              <CircleDollarSignIcon size={15} />
            </span>
          </button>
        {/if}

        {#if header.tip}
          <span use:tippy={{ content: header.tip}}>
            <InfoIcon size={16} class="text-zinc-500" />
          </span>
        {/if}
      </div>
    {/each}
  </div>

  {#if loading}
    {#each Array(10).keys()}
      <TradesListPlaceholder />
    {/each}
  {:else}
    {#each trades as trade, index (index)}
      <TradesListItem {trade}  />
    {/each}
  {/if}
</div>