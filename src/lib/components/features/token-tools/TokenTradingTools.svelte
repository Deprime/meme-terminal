<script lang="ts">
  // Components
  import { Button } from "@/ui/button";
  import { Input } from "@/ui/input";
  import WalletIcon from "@lucide/svelte/icons/wallet";
  import PercentIcon from "@lucide/svelte/icons/percent";
  import SolanaIcon from "@/icons/SolanaIcon.svelte";

  // Props
  let {
    token
  } = $props();

  // Serivces
  import { tippy } from "$lib/config/tippy";

  // Type
  import type { TDirection, TOrderType } from "$lib/types/trade";


  // Data
  let direction: TDirection = $state("buy");
  let type: TOrderType = $state("market");
  const directionList: TDirection[] = ['buy', 'sell'];
  const typeList: TOrderType[] = ['market', 'limit', 'advanced'];
  let orderValue = $state(0);

  // Methods
  const onTypeToggle = (selected: TDirection) => {
    direction = selected;
    orderValue = 0;
  }

  const onOrderTypeClick = (selected: TOrderType) => {
    type = selected;
  }
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
          class:text-gray-300={type !== el}
          class:border-b-transparent={type !== el}
          class:text-white={type === el}
          class:border-b-white={type === el}
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
          class="rounded-t-sm rounded-b-none" 
          bind:value={orderValue}
        />

        <span class="absolute right-2.5 top-2.5 text-sm text-gray-300">
          {#if direction === "buy"}
            <SolanaIcon size={16} />
          {:else}
            <PercentIcon size={16} />
          {/if}
        </span>

      </div>
    </div>
  </div>

</div>
