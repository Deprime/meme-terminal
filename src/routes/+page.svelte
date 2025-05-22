<script lang="ts">
  // Components
  import { 
    TokenInfo, 
    TradingChart, 
    CabalConnector,
    OrderControl
  } from "$lib/components/features";

  // Store
  import tradesStore from "$lib/stores/trades";

  // Data
  let order = false;
</script>

<div class="flex justify-center w-full h-fit">
  <div class="flex flex-col flex-grow gap-4 justify-start rounded-lg size-full max-w-5xl  bg-white p-4">
    <header class="w-full flex justify-between items-center gap-4">
      <div class="flex gap-4">
        <TokenInfo />
        <CabalConnector />
      </div>
      <OrderControl 
        disabled={$tradesStore.length === 0}
        onset={() => { order = true }} 
      />
    </header>
    <div class="border border-stone-200 rounded-xl p-2">
      <TradingChart trades={$tradesStore} bind:order />
    </div>
  </div>
</div>
