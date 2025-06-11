<script lang="ts">
  // Components
  import { 
    TokenInfo, 
    TradingChart, 
    // CabalConnector,
    // OrderControl,
    TradesList,
  } from "$lib/components/features";

  // Store
  import tradesStore from "$lib/stores/trades";

  // Data
  let order = false;
</script>

<div class="flex justify-center w-full h-full">
  <div class="flex flex-col flex-grow gap-4 justify-start rounded-lg size-full">
    <header class="w-full flex justify-between items-center gap-4 border-b border-b-stone-800">
      <div class="flex gap-4">
        <TokenInfo />
        <!-- <CabalConnector /> -->
      </div>
      <!-- <OrderControl 
        disabled={$tradesStore.length === 0}
        onset={() => { order = true }} 
      /> -->
    </header>
    <div>
      <TradingChart trades={$tradesStore} bind:order />
    </div>
    <div class="flex w-full h-full">
      <TradesList />
    </div>
  </div>
</div>
