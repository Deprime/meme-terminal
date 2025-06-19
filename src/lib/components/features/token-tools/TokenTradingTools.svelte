<script lang="ts">
  // Components
  import { Button } from "@/ui/button";
  import { Input } from "@/ui/input";
  import WalletIcon from "@lucide/svelte/icons/wallet";
  import PercentIcon from "@lucide/svelte/icons/percent";
  import SolanaIcon from "@/icons/SolanaIcon.svelte";
  import SettingsIcon from "@lucide/svelte/icons/settings";

  // Stores
  import tradeToolsStore from "$lib/stores/trade-tools";

  // Props
  let {
    token
  } = $props();

  // Serivces
  import { tippy } from "$lib/config/tippy";

  // Constants
  import { ORDER_TYPE } from "$lib/constants/trades";

  // Type
  import type { TDirection, TOrderType } from "$lib/types/trade";

  // Data
  const directionList: TDirection[] = ['buy', 'sell'];
  const typeList: TOrderType[] = Object.values(ORDER_TYPE).map(el => el);
  let direction: TDirection = $state(directionList[0]);
  let orderValue = $state(0);

  let quickActions = $derived.by(() => {
    if (direction === "buy") {
      return $tradeToolsStore.quickBuyAmounts;
    }
    else {
      return $tradeToolsStore.quickSellType === "amount" 
        ? $tradeToolsStore.quickSellAmounts :
        $tradeToolsStore.quickSellPercents;
    }
  });

  // Methods
  const onTypeToggle = (selected: TDirection) => {
    direction = selected;
    orderValue = 0;
  }

  const onOrderTypeClick = (selected: TOrderType) => {
    $tradeToolsStore.orderType = selected;
  }

  const setOrderValue = (amount: number) => {
    orderValue = amount;
  }

  const changeQuickSellType = () => {
    $tradeToolsStore.quickSellType = $tradeToolsStore.quickSellType === "percent" 
      ? "amount" 
      : "percent";
  }

  const onBuyClick = () => {}
  const onSellClick = () => {}
</script>

<div class="relative flex flex-col border-b border-b-stone-800">
  <div class="w-full flex justify-between gap-2 p-2 border-b border-b-stone-800">
    {#each directionList as el (el)}
      <Button 
        class="flex flex-grow cursor-pointer"
        variant={direction === el ? el === "buy" ? "default" : "sell" : "ghost"}
        onclick={() => onTypeToggle(el)}
      >
        <span class="capitalize">
          {el}
        </span>
      </Button>
    {/each}
  </div>

  <div class="flex items-center justify-between px-2 border-b border-b-stone-800">
    <div class="text-xs font-semibold flex gap-5">
      {#each typeList as el (el)}
        <button
          class="border-b text-gray-400 capitalize py-2 cursor-pointer"
          class:text-gray-300={$tradeToolsStore.orderType !== el}
          class:border-b-transparent={$tradeToolsStore.orderType !== el}
          class:text-white={$tradeToolsStore.orderType === el}
          class:border-b-white={$tradeToolsStore.orderType === el}
          onclick={() => onOrderTypeClick(el)}
        >
          {el}
        </button>
      {/each}
    </div>

    <button 
      class="flex items-center gap-2 px-2 py-1 border border-stone-800 rounded-md"
      use:tippy={{ content: "Active wallets" }}
    >
      <div class="flex items-center gap-1">
        <WalletIcon size={12} class="text-gray-400" />
        <span class="text-xs text-gray-300">
          1
        </span>
      </div>

      <div class="flex items-center gap-1">
        <SolanaIcon size={12} /> 
        <span class="text-xs text-gray-300">
          0
        </span>
      </div>
    </button>
  </div>

  <div class="p-2">
    <div>
      <div class="relative">
        <Input 
          placeholder="Amount" 
          type="number" 
          class="!text-xs rounded-t-sm rounded-b-none" 
          bind:value={orderValue}
        />

        <span class="absolute z-[2] w-8 right-0 top-px bottom-px flex items-center text-sm text-gray-300 bg-zinc-900">
          {#if direction === "buy"}
            <SolanaIcon size={16} />
          {:else}
            {#if $tradeToolsStore.quickSellType === "amount"}
              <SolanaIcon size={16} />
            {:else}
              <PercentIcon size={16} />
            {/if}
          {/if}
        </span>
      </div>
      <div class="flex  border-x border-b border-stone-800 rounded-b-sm">
        <div class="grid grid-cols-4 w-full">
          {#each quickActions as amount, idx (idx)}
            <button 
              class="text-xs cursor-pointer font-semibold h-8 border-r border-r-stone-800 hover:bg-stone-800/50"
              onclick={() => {setOrderValue(amount)}}
            >
              {amount}
            </button>
          {/each}
        </div>

        {#if direction === 'sell'}
          <button 
            class="cursor-pointer flex flex-shrink h-8 items-center px-1.5 border-r border-r-stone-800 hover:bg-stone-800/50"
            onclick={changeQuickSellType}
          >
            {#if $tradeToolsStore.quickSellType === "amount"}
              <SolanaIcon size={16} />
            {:else}
              <PercentIcon size={16} />
            {/if}
          </button>
        {/if}

        <button class="cursor-pointer flex flx-shrink h-8 items-center justify-center px-1.5 hover:bg-stone-800/50">
          <SettingsIcon size={14} />
        </button>
      </div>
    </div>
  </div>

  <div class="px-2 pb-2 w-full">
    {#if direction === "buy"}
      <Button 
        class="flex flex-grow w-full cursor-pointer"
        onclick={onBuyClick}
      >
        <span>
          Buy {token.symbol}
        </span>
        {#if orderValue > 0 }
          <span class="flex gap-2 items-center">
            {orderValue}
            <SolanaIcon size={10} variant="black"/>
          </span>
        {/if}
      </Button>
    {:else}
      <Button 
        class="flex flex-grow w-full cursor-pointer"
        variant="sell"
        onclick={onSellClick}
      >
        Sell {token.symbol}

        {#if $tradeToolsStore.quickSellType === "amount" && orderValue > 0 }
          <span class="flex gap-2 items-center">
            {orderValue}
            <SolanaIcon size={10} variant="black"/>
          </span>
        {/if}
      </Button>
    {/if}
  </div>
</div>
