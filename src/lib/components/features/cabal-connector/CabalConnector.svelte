<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import type { ServerStreamingCall } from "@protobuf-ts/runtime-rpc";

  // Services
  import { 
    getStreamCallUserActivity,
    getStreamCallTrades,
    subscribeToken, 
    pingUser, 
    pingTrade,
  } from "$lib/grpc/grpc-web";

  // Helpers
  import { getUnixTimeNow } from "$lib/untils/datetime";
  import { calculateSwapOutput } from "$lib/untils/trades";
  import { delay } from "$lib/untils/common";

  import tradesStore from "$lib/stores/trades";

  // Constants
  import { TOKEN } from "$lib/constants/app";

  // Data
  let pingIntervalId: ReturnType<typeof setInterval>;
  let pingCount = $state(0);
  let isStreamActive = $state(false);
  let reconnectAttempts = 0;
  let lastTs = 0;
  const RECONNECT_DELAY_MS = 2_000; // 3 секунд задержки перед переподключением
  const PING_INTERVAL_MS = 6_000;

  // Methods
  /**
   * Stream processing wrapper
   */
  async function processStream(
    call: ServerStreamingCall, 
    // @ts-expect-error some
    callback?: (resp) => void
  ) {
    for await (let resp of call.responses) {
      callback?.(resp);
    }
  }

  /**
   * Start streams
   */
  async function startTradeStream() {
    try {
      isStreamActive = true;
      const callUserActivity = getStreamCallUserActivity();
      await delay(300);
      const callTrades = getStreamCallTrades();
      await delay(300);

      onSubscribeToken()
        .catch(e => console.error(e));

      // Start pings
      if (pingIntervalId) {
        clearInterval(pingIntervalId);
        pingCount = 0;
      }
      pingIntervalId = setInterval(checkConnection, PING_INTERVAL_MS);
      
      processStream(callUserActivity, (resp) => {
        if (resp?.userResponseKind?.oneofKind !== 'pong') {
          console.log("user stream:", resp)
        }
      });

      processStream(callTrades, (resp) => {
        if (resp?.tradeEventResponseKind?.oneofKind !== 'pong') {
          const event = resp.tradeEventResponseKind?.tradeEvent?.tradeEventKind;
          if (event && (event.sell || event.buy)) {
            const raw = event.sell ? event.sell : event.buy;
            const { baseLiq, quoteLiq, amountSol } = raw;
            const direction = event.sell ? "sell" : "buy";

            const time = getUnixTimeNow(true);
            if (lastTs === 0) {
              lastTs = time;
            }
            else {
              if (lastTs === time)
                return;
            }
            const result = calculateSwapOutput(baseLiq, quoteLiq, amountSol, direction === 'buy');
            const trade = {
              direction,
              amountSol,
              amountToken: result.amountOut,
              price: result.price,
              time,
              baseLiq, 
              quoteLiq,
            };
            tradesStore.update(value => {
              value.push(trade);
              return value;
            });

            console.log(trade)
            lastTs = time;
          }
        }
      });
    } 
    catch (error) {
      isStreamActive = false;
      console.error("Trade stream error:", error);
      scheduleReconnect();
    } 
    // finally {
    //   isStreamActive = false;
    //   console.log("Trade stream disconnected");
    //   scheduleReconnect();
    // }
  }

  async function checkConnection() {
    try {
      pingUser()
      pingTrade()
      console.log("Ping successful, connection is alive");
      pingCount = pingCount + 1;
    } 
    catch (error) {
      console.error("Ping failed, connection is dead:", error);
      if (isStreamActive) {
        pingCount = 0;
        // Принудительно закрываем текущее соединение, чтобы вызвать переподключение
        isStreamActive = false;
      }
    }
  }

  function scheduleReconnect() {
    if (isStreamActive) 
      return;

    reconnectAttempts++;
    const delay = Math.min(RECONNECT_DELAY_MS * (reconnectAttempts * 0.5), 60000);
    console.log(`Scheduling reconnect in ${delay}ms (attempt ${reconnectAttempts})`);
    
    setTimeout(() => {
      if (!isStreamActive) {
        startTradeStream();
      }
    }, delay);
  }

  async function onSubscribeToken() {
    await subscribeToken(TOKEN.mint);
  }

  onMount(async () => {
    startTradeStream();
  });

  onDestroy(() => {
    if (pingIntervalId) {
      clearInterval(pingIntervalId);
    }
  });
</script>

<div class="p-2 text-xs h-full bg-stone-100 rounded-lg">
  <div class="flex justify-between items-center gap-4 py-1.5 px-2 text-gray-700">
    <p class="flex gap-2 items-center">
      <span class="size-2 rounded-full"
        class:bg-orange-500={!isStreamActive}
        class:bg-green-500={isStreamActive}
      >
      </span>
      Cabal gRPC
    </p>

    <span>
      pings: {pingCount}
    </span>
  </div>
</div>