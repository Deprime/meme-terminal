<script lang="ts">
  import { onMount } from 'svelte';
  import { createChart } from 'lightweight-charts';
  import type { IChartApi, WhitespaceData } from 'lightweight-charts';
  import { BubbleSeries } from './custom-series-bubble';
  import type { BubbleData } from './data-bubbles';

  // Components
  import Button from '$lib/components/ui/button/Button.svelte';
  import Loader from '$lib/components/ui/loader/Loader.svelte';

  // Utils
  import { mapTradesToLine, aggregateTrades } from '$lib/untils/chart';

  // Types
  import type { ITrade, ITradePeriod } from '$lib/types/trade';

  // Constants
  import { TRADE_PERIODS } from '$lib/constants/app';

  // Props
  let {
    order = $bindable(false),
    trades,
  }: {
    trades: ITrade[],
    order?: boolean,
  } = $props();

  // Data
  let period: ITradePeriod = $state(TRADE_PERIODS[0]);
  let count = $state(0)
  let chartContainer: HTMLDivElement;
  let chart: IChartApi|null = $state(null);
  let bubbleSeries;

  // Methods
  const onPeriodClick = (item: ITradePeriod) => {
    period = item;
    updateChart();
  } 

  function initChart() {
    chart = createChart(chartContainer, {
      layout: {
        textColor: 'black',
        background: { type: 'solid', color: 'white' },
      },
      // autoSize: true,
      timeScale: {
        timeVisible: true,
        secondsVisible: true
      },
      rightPriceScale: {
        ticksVisible: true,
        autoScale: true, // disables auto scaling based on visible content
        scaleMargins: {
          top: 0.45,
          bottom: 0.1,
        }
      },
    });

    const bubbleSeriesView = new BubbleSeries();
    bubbleSeries = chart.addCustomSeries(bubbleSeriesView, {
      lineWidth: 2,
      priceFormat: {
        type: 'price', 
        precision: 7, 
        minMove: 0.0000001
      }
    });
  }

  function updateChart() {
    if (!chart) 
      return;
    const mapped: (BubbleData | WhitespaceData)[] = mapTradesToLine(trades);
    const data = period.timing === 0 
      ? mapped 
      : aggregateTrades(mapped, period.timing);

    count = data.length;
    bubbleSeries.setData(data);

    // Limit order
    if (order) {
      const maxPrice = mapped.reduce((prev, curr) => {
        return curr.value > prev ? curr.value : prev;
      }, 0);
      const priceLine = {
        price: maxPrice * 1.5,
        color: '#0C7FE6',
        lineWidth: 1,
        lineStyle: 2, // LineStyle.Dashed
        axisLabelVisible: true,
        title: 'limit order',
      };
      bubbleSeries.createPriceLine(priceLine);
      order = false;
    }

    chart.timeScale();
  }

  $effect(() => {
    if (chart) {
      updateChart();
    }
  })

  onMount(() => {
    initChart();
  });
</script>

<div class="flex flex-col gap-2 w-full h-full max-h-[600px]">
  <header class="flex gap-2 p-1 w-full justify-between">
    <div class="flex items-center gap-2 px-4 bg-stone-100 w-fit rounded-lg ">
      <div class="text-xs text-stone-600">
        Marker count: {count}
      </div>
    </div>

    <div class="flex gap-2 p-1 bg-stone-100 w-fit rounded-lg">
      {#each TRADE_PERIODS as item (item.timing)}
        <Button 
          size="sm"
          disabled={trades.length === 0}
          variant={item.timing === period.timing ? "primary" : "text"}
          onclick={() => { onPeriodClick(item) }}
        > 
          {item.label}
        </Button>
      {/each}
    </div>
  </header>

  <div class="w-full h-full relative" >
    <div class="w-full h-[500px]" bind:this={chartContainer}></div>

    {#if trades.length === 0}
      <div class="absolute top-0 z-10 inset-0 size-full flex justify-center items-center bg-white/50">
        <div class="flex flex-col items-center gap-2">
         <Loader size="lg" />
         <p class="text-xs text-gray-500">
          Awaiting new trades
        </p>
        </div>
      </div>
    {/if}
  </div>
</div>
