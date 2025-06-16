<script lang="ts">
  import { format } from "date-fns";

  // Components
  // import CopyIcon from "@lucide/svelte/icons/copy";
  import ExternalLinkIcon from "@lucide/svelte/icons/external-link";
  import SolanaIcon from "@/icons/SolanaIcon.svelte";
  import VolumeIndicator from "./VolumeIndicator.svelte";
  import WalletFilterAction from "./WalletFilterAction.svelte";

  // Stores
  import tradeTableStore from '$lib/stores/trade-table';
  import ratesStore from "$lib/stores/rates";

  // Helpers
  import { currencyFormat } from "$lib/untils/currency";
	import { tippy } from "$lib/config/tippy";

  // Props
  let {
    trade
  } = $props();

  // Data
  let shotWallet = $derived.by(() => {
    const length = trade.wallet.length;
    return trade.wallet.substring(0, 5) + '..' + trade.wallet.substring(length - 5, length)
  });

  // Methods
  const onFilterByWallet = () => {
    $tradeTableStore.walletFilter = $tradeTableStore.walletFilter 
      ? ""
      : trade.wallet;
  }
</script>

<div 
  class="transition-colors duration-150 hover:bg-slate-400/10 odd:bg-slate-500/5 
  hover:[&_.tx-wallet]:underline
  flex flex-shrink-0 items-center justify-between 
  h-8 min-w-max px-4 font-family-mono"
>
  <div class="flex gap-2 items-center min-w-40 text-xs text-zinc-500">
    {#if $tradeTableStore.timeFormat === "date"}
      {format(new Date(trade.time * 1000), 'HH:mm:ss')}
    <!-- {:else} -->
    {/if}
  </div>
  <div 
    class="flex gap-2 items-center min-w-40 text-xs"
    class:text-rose-500={trade.type === "sell"}
    class:text-teal-400={trade.type === "buy"}
  >
    {trade.type}
  </div>
  <div class="flex gap-2 items-center min-w-40 text-xs text-zinc-400">
    ${currencyFormat(trade.pricePerToken, 2, 2)}
  </div>
  <div class="flex gap-2 items-center min-w-40 text-xs text-zinc-400">
    {currencyFormat(trade.tokenAmount, 2, 2)}
  </div>

  <div class="flex items-center min-w-40 h-full relative">
    <VolumeIndicator type={trade.type} volume={trade.volume} />
    <span 
      class="relative flex  items-center gap-1 z-[2] text-xs"
      class:text-rose-500={trade.type === "sell"}
      class:text-teal-400={trade.type === "buy"}
    >
      {#if $tradeTableStore.priceFormat === "chain"}
        <SolanaIcon size={12} />  
        {currencyFormat(trade.solAmount, 2, 3)}
      {:else}
        ${currencyFormat($ratesStore.SOL * trade.solAmount)}
      {/if}
    </span>
  </div>

  <div class="flex gap-2 items-center justify-end min-w-40 text-xs">
    <span class="tx-wallet text-zinc-400 hover:text-zinc-300 cursor-pointer mr-1">
      {shotWallet}
    </span>

    <a 
      href="https://solscan.io/tx/"
      target="_blank" 
      rel="noopener noreferrer"
      use:tippy={{content: "Open TX in Solscan"}}
      class="text-zinc-400 hover:text-zinc-300 cursor-pointer"
    >
      <ExternalLinkIcon size={11} />
    </a>

    <WalletFilterAction onclick={onFilterByWallet} />
  </div>
</div>