<script lang="ts">

  // Props
  let {
    token
  } = $props();

  // Data
  let summary = $derived.by(() => {
    const vol5m = {
      label: "5m Vol",
      key: '5mvol',
      value: 102.1,
      prefix: '',
      symbol: '$',
      type: "neutral"
    };
    const buys = {
      label: "Buys",
      key: 'buys',
      value: 0.209,
      prefix: '14',
      symbol: '$',
      type: "positive"
    };
    const sells = {
      label: "Sells",
      key: 'sells',
      value: 0.035,
      prefix: '1',
      symbol: '$',
      type: "negative"
    };
    const volNet = {
      label: "Net Vol.",
      key: 'volnet',
      value: 0.174,
      prefix: '',
      symbol: '$',
      type: "negative"
    };

    return {
      vol5m,
      buys,
      sells,
      volNet
    };
  });

  let ratio = $derived.by(() => {
    const buys = parseInt(summary.buys.prefix);
    const sells = parseInt(summary.sells.prefix);
    const total = buys + sells;
    return parseFloat((buys * 100 / total).toFixed(2));
  })
</script>

<div class="relative flex flex-col h-16 border-b border-b-stone-800">
  <div class="grid grid-cols-4 ">
    {#each Object.values(summary) as item (item.key)}
      <div class="text-xs font-semibold flex flex-col gap-y-1 items-center py-2">
        <p 
          class:text-gray-200={item.key === '5mvol'}
          class:text-gray-400={item.key !== '5mvol'}
        >
          {item.label}
        </p>

        <p
          class="flex gap-0.5 items-center"
          class:text-gray-200={item.type === 'neutral'}
          class:text-teal-500={item.type === 'positive'}
          class:text-rose-500={item.type === 'negative'}
        >
          {#if item.prefix}
            <span>
              {item.prefix}
            </span>
            <span class="text-gray-600">/</span>
          {/if}
          <span class="flex">
            {#if item.symbol}
              {item.symbol}
            {/if}
            {item.value}
          </span>
        </p>
      </div>
    {/each}
  </div>

  <div class="absolute bottom-2 z-[2] left-2.5 right-2.5 h-0.5 bg-rose-500">
    <div 
      class="absolute left-0 h-0.5 bg-teal-500"
      style="width: {ratio}%"
    >
      {#if ratio > 0}
        <span class="absolute right-0 size-0.5 bg-stone-950"></span>
      {/if}
    </div>
  </div>
</div>
