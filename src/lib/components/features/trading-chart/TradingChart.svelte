<script lang="ts">
  import { onMount, afterUpdate } from 'svelte';
  import { createChart } from 'lightweight-charts';

  // Types
  import type { ITrade } from '$lib/types/trade';

  // Props
  let {
    trades,
    showCandles = true,
    showVolumeCircles = true,
  }: {
    trades: ITrade[],
    showCandles?: boolean,
    showVolumeCircles?: boolean,
  } = $props();

  // Data
  let chartContainer: HTMLDivElement;
  let chart: any;
  let candleSeries: any;
  let lineSeries: any;

  onMount(() => {
    initChart();
  });

  afterUpdate(() => {
    updateChart();
  });

  function initChart() {
    chart = createChart(chartContainer, {
      layout: { background: { color: '#1E1E1E' }, textColor: '#D9D9D9' },
      grid: { vertLines: { color: '#2B2B43' }, horzLines: { color: '#2B2B43' } },
    });

    if (showCandles) {
      candleSeries = chart.addCandlestickSeries({
        upColor: '#26A69A',
        downColor: '#EF5350',
        wickUpColor: '#26A69A',
        wickDownColor: '#EF5350',
      });
    }

    if (showVolumeCircles) {
      lineSeries = chart.addLineSeries({ color: 'transparent' });
    }
  }

  function updateChart() {
    if (!chart) return;

    if (showCandles && candleSeries) {
      const candleData = trades.map(trade => ({
        time: trade.time,
        open: trade.open,
        high: trade.high,
        low: trade.low,
        close: trade.close,
        ...(trade.direction === 'sell' && trade.close >= trade.open
          ? { open: trade.close, close: trade.open }
          : {}),
      }));
      candleSeries.setData(candleData);
    }

    if (showVolumeCircles && lineSeries) {
      const markers = trades.map(trade => ({
        time: trade.time,
        position: 'aboveBar',
        color: trade.direction === 'buy' ? '#26A69A' : '#EF5350',
        shape: 'circle',
        size: Math.sqrt(trade.volume / 1000),
        text: `Vol: ${trade.volume}`,
      }));
      lineSeries.setMarkers(markers);
      lineSeries.setData(trades.map(trade => ({ time: trade.time, value: trade.price || trade.close })));
    }

    chart.timeScale().fitContent();
  }

  $: {
    if (chart) updateChart();
  }
</script>

<div bind:this={chartContainer} style="width: 100%; height: 500px;" />

<style>
  div {
    border-radius: 8px;
    overflow: hidden;
  }
</style>