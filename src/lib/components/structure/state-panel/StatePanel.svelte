<script lang="ts">
  import { onDestroy } from "svelte";
  import { page } from "$app/state";
  import { watch } from "runed";

  // Components
  import SolanaIcon from "@/icons/SolanaIcon.svelte";

  // Constants
  import { CHAINS } from "$lib/constants/app";

  // Services
  import binanceApi from "$lib/api/binance";

  // Stores
  import ratesStore from "$lib/stores/rates";

  // Data
  let intervalId: ReturnType<typeof setInterval>;
  let interval = 30_000;
  let chain = $derived.by(() => {
    const { chain } = page.params;
    return CHAINS[chain] ? CHAINS[chain] : CHAINS.SOL;
  });

  // Methods
  const fetchChainPrice = async () => {
    try {
      const result = await binanceApi.getSymbolPrice(chain.symbol);
      if (result.price) {
        $ratesStore.SOL = parseFloat(result.price);
      }
    }
    catch (e) {
      console.error(e)
    }
  }

  watch(() => chain, 
    () => {
      if (intervalId) {
        clearInterval(intervalId)
      }

      fetchChainPrice();
      intervalId = setInterval(() => {
        fetchChainPrice();
      }, interval);
    }
  );

  onDestroy(() => {
    if (intervalId) {
      clearInterval(intervalId)
    }
  });
</script>

<footer class="w-full h-10 flex items-center justify-between border-t border-stone-800">
  <div></div>
  <div class="flex items-center px-2">
    <div 
      class="flex items-center gap-1.5 cursor-default bg-stone-900 px-1.5 py-0.5 rounded"
      title={chain.title}
    >
      <SolanaIcon /> 
      <span class="text-[11px] leading-3 text-sky-500">
        ${$ratesStore.SOL}
      </span>
    </div>
  </div>
</footer>