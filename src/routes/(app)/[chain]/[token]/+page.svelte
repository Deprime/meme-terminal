<script lang="ts">
	import { onMount, onDestroy } from "svelte";
  import { page } from "$app/state";

  // Components
  import { Separator,  } from "@/ui/separator";
  import { ScrollArea } from "@/ui/scroll-area";
  import { 
    TradingChart, 
    // CabalConnector,
    // OrderControl,
    TradesList,
  } from "$lib/components/features";
  import { TokenImage, TokenMint } from "@/shared";

  // Store
  import tradesStore from "$lib/stores/trades";

  // Constants
  import { TOKENS } from "$lib/constants/app";
  import type { IToken } from "$lib/constants/app";

  // Helpers
  import { delay } from "$lib/untils/common";
  import { generateTrades } from '$lib/untils/trades';

  // Data
  let intervalId: ReturnType<typeof setInterval>;
  let trades = $state([]);
  let loading = $state(true);
  let token = $derived.by(() => {
    const { token } = page.params;
    const current = TOKENS.find(el => token.toUpperCase() === el.symbol.toUpperCase());
    return current as IToken;
  });

  // Methods
  const getTrades = async () => {
    try {
      await delay(1500);
      // @ts-expect-error any
      trades = generateTrades(100, token.symbol, token.decimal);
    }
    catch(e) {
      throw new Error(e);
    }
    finally {
      loading = false;
    }
  }

  const addTrade = () => {
    try {
      const list = generateTrades(1, token.symbol, token.decimal);
      const record = list[0];
      trades.unshift(record);
    }
    catch(e) {
      throw new Error(e);
    }
  }

  onMount(async () => {
    await getTrades();

    // intervalId = setInterval(() => {
    //   addTrade();
    // }, 1_800);
  });

  onDestroy(() => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  }); 
</script>

<div class="flex justify-center w-full h-full">
  <div class="flex flex-col flex-grow justify-start size-full border-r border-r-stone-800">
    <header class="w-full flex justify-between items-center gap-4 border-b border-b-stone-800">
      <div class="flex gap-4 py-2 px-3">
        <TokenImage {token} size="sm" localImgSrc showLaunchpad />
        <!-- <CabalConnector /> -->
        <div class="w-fit flex flex-col gap-0.5">
          <p class="w-full flex gap-1">
            <span class="text-sm text-gray-300 font-semibold">
              {token.title}
            </span>
            <span class="text-sm text-gray-400">
              {token.symbol}
            </span>
          </p>

          <div class="flex gap-2">
            <span class="text-sm text-teal-500">
              21m
            </span>
            <Separator orientation="vertical" />
            <TokenMint 
              class="relative z-[3]" 
              mint={token.mint} 
            />
          </div>
        </div>
      </div>
    </header>
    <div class="flex">
      <div class="flex flex-col h-full w-16 gap-1 p-1">
        <div class="border border-stone-800/30 size-12 rounded"></div>
        <div class="border border-stone-800/30 size-12 rounded"></div>
        <div class="border border-stone-800/30 size-12 rounded"></div>
      </div>
      <TradingChart trades={$tradesStore} />
    </div>
    <div class="flex w-full h-full">
      <TradesList {loading} {trades} />
    </div>
  </div>

  <ScrollArea class="w-full max-w-72 h-full overflow-y-auto">
    <header class="p-2 text-sm text-gray-400 font-semibold">
      Sidebar B
    </header>
  </ScrollArea>
</div>
