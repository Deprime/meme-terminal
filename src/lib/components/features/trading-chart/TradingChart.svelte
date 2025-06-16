<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { 
    createChart, 
    CandlestickSeries, 
    CrosshairMode, 
    LineStyle, 
    AreaSeries, 
    createSeriesMarkers 
  } from 'lightweight-charts';
  import type { IChartApi, WhitespaceData,  } from 'lightweight-charts';
  // import { BubbleSeries } from './custom-series-bubble';
  import type { BubbleData } from './data-bubbles';

  // Components
  // import UButton from '@/ui/u-button/UButton.svelte';
  // import { Button } from "$lib/components/ui/button";
  // import Loader from '$lib/components/ui/loader/Loader.svelte';

  // Utils
  import { mapTradesToLine, aggregateTrades } from '$lib/untils/chart';
  import { generateOHLCV } from '$lib/untils/ohlcv';

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
  let mainSeries;
  let data = [];
  let intervalId: ReturnType<typeof setInterval>;

  // Methods
  const onPeriodClick = (item: ITradePeriod) => {
    period = item;
    updateChart();
  } 

  function initChart() {
    chart = createChart(chartContainer, {
      layout: {
        background: {  color: 'transparent' },
        textColor: '#DDD',
        fontFamily: "'Roboto', sans-serif",
      },
      grid: {
        vertLines: { color: '#18181b' },
        horzLines: { color: '#18181b' },
      },
      // autoSize: true,
      timeScale: {
        timeVisible: true,
        secondsVisible: true,
        borderColor: '#292524',
      },
      rightPriceScale: {
        borderColor: 'transparent',
        ticksVisible: true,
        autoScale: true, // disables auto scaling based on visible content
        scaleMargins: {
          top: 0.45,
          bottom: 0.1,
        }
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        // Vertical crosshair line (showing Date in Label)
        vertLine: {
          // width: 8,
          color: '#555',
          // style: LineStyle.Solid,
          style: LineStyle.LargeDashed,
          labelBackgroundColor: '#777',
        },

        // Horizontal crosshair line (showing Price in Label)
        horzLine: {
          color: '#555',
          labelBackgroundColor: '#777',
        },
      },
    });

    data = generateOHLCV(10_000);

    const lineData = data.map(el => ({
      time: el.time,
      value: (el.close + el.open) / 2,
    }));

    const areaSeries = chart.addSeries(AreaSeries, {
      lastValueVisible: false, // hide the last value marker for this series
      crosshairMarkerVisible: false, // hide the crosshair marker for this series
      lineColor: 'transparent', // hide the line
      topColor: 'rgba(56, 33, 110,0.3)',
      bottomColor: 'rgba(56, 33, 110, 0.0)',
    });
    // Set the data for the Area Series
    areaSeries.setData(lineData);

    mainSeries = chart.addSeries(CandlestickSeries);
    mainSeries.setData(data);
    mainSeries.applyOptions({
      wickUpColor: '#2dd4bf',
      upColor: '#2dd4bf',
      wickDownColor: '#e11d48',
      downColor: '#e11d48',
      borderVisible: false,
    });

    const markers = [];
    for (let i = 0; i < data.length; i++) {
      if (i % 100 == 0) {
        const el =data[i];

        const rec = {
          time: el.time,
          position: 'aboveBar',
          color: '#22d3ee',
          shape: 'circle',
          size: 2,
          text: `D-${i}`,
        }
        markers.push(rec)
      }
    }
    createSeriesMarkers(mainSeries, markers);
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
      // updateChart();
    }
  })

  onMount(() => {
    initChart();

    // intervalId = setInterval(() => {
    //   const record = generateOHLCV(1);
    //   console.log(record)
    //   data.push(record);
    //   mainSeries?.setData(data);
    // }, 5_000);
  });

  onDestroy(() => {
    // if (intervalId) {
    //   clearInterval(intervalId);
    // }
  })
</script>

<div class="flex flex-col gap-2 w-full h-full max-h-[600px]">
  <div class="w-full h-full relative" >
    <div class="w-full h-[400px]" bind:this={chartContainer}></div>

    <!-- {#if trades.length === 0}
      <div class="absolute top-0 z-10 inset-0 size-full flex justify-center items-center bg-white/50">
        <div class="flex flex-col items-center gap-2">
         <Loader size="lg" />
         <p class="text-xs text-gray-500">
          Awaiting new trades
        </p>
        </div>
      </div>
    {/if} -->
  </div>
</div>
