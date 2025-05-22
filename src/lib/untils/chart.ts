import { TOKEN } from "$lib/constants/app";

/**
 * Format trades data to line data
 */
export function mapTradesToLine(trades) {
  return trades.map(el => {
    const priceFloat = Number(el.price) / 10 ** (TOKEN.decimal);
    const amountToken = Number(el.amountToken);
    return {
      direction: el.direction,
      volume: amountToken,
      time: el.time,
      value: priceFloat,
    };
  })
}

export function aggregateTrades(trades, intervalSeconds: number) {
    if (!trades.length || intervalSeconds <= 0) return [];
    const aggregated = [];
    let currentIntervalStart = Math.floor(trades[0].time / intervalSeconds) * intervalSeconds;

    const TPL = {
      direction: "buy",
      volume: 0,
      value: 0,
      count: 0
    }

    let currentInterval = {
      time: currentIntervalStart,
      ...TPL,
    };
    
    for (const trade of trades) {
      const interval = Math.floor(trade.time / intervalSeconds) * intervalSeconds;
      if (interval !== currentIntervalStart) {
          aggregated.push({
            direction: currentInterval.direction,
            time: currentInterval.time,
            value: currentInterval.volume > 0 
                ? currentInterval.value / currentInterval.volume 
                : 0,
            volume: currentInterval.volume
          });
          
        // Начинаем новый интервал
        currentIntervalStart = interval;
        currentInterval = {
          time: currentIntervalStart,
          ...TPL,
        };
      }
        
      // Аккумулируем данные
      currentInterval.direction = trade.direction;
      currentInterval.volume += trade.volume;
      currentInterval.value += trade.value * trade.volume;
      currentInterval.count++;
    }
    
    // Добавляем последний интервал
    if (currentInterval.count > 0) {
      aggregated.push({
          direction: currentInterval.direction,
          time: currentInterval.time,
          value: currentInterval.volume > 0 
              ? currentInterval.value / currentInterval.volume 
              : 0,
          volume: currentInterval.volume
      });
    }
    
    return aggregated;
}