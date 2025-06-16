// import { getUnixTimeNow } from "./datetime";
import { random } from "./math";

/**
 * Генерирует массив mock данных OHLCV (Open, High, Low, Close, Volume) с поминутными интервалами
 * @param {number} count - Количество минутных записей для генерации
 * @param {number} [startPrice=100] - Начальная цена
 * @param {number} [volatility=1] - Волатильность (в процентах) - уменьшена для минутных данных
 * @param {number} [baseVolume=10] - Базовый объем (уменьшен для минутных данных)
 * @param {Date} [startDate] - Начальная дата (по умолчанию текущее время минус count минут)
 * @returns {Array} Массив объектов OHLCV
 */
export function generateOHLCV(
  count: number, 
  startDate = null, 
  startPrice = 100, 
  volatility = 1, 
  peakIntensity = 1,
  baseVolume = 10
) {
  const result = [];
  let previousClose = startPrice;
  let timestamp = startDate ? startDate.getTime() : Date.now() - count * 60 * 1000;

  // Нормализуем интенсивность пиков между 1 и 5
  peakIntensity = Math.max(1, Math.min(5, peakIntensity));
  
  for (let i = 0; i < count; i++) {
    // Более плавное изменение цены для минутных данных
    const changePercent = (Math.random() * 2 - 1) * volatility / 100;
    const change = previousClose * changePercent;
    
    const open = previousClose;
    const close = open + change;

    // Усиливаем размах high/low в зависимости от peakIntensity
    const peakFactor = peakIntensity * (0.2 + Math.random() * 0.1);
    const direction = Math.random() > 0.5 ? 1 : -1;

    // Меньший разброс между high/low для минутных данных
    const high = Math.max(open, close) * (1 + Math.abs(direction * peakFactor * volatility / 100));
    const low = Math.min(open, close) * (1 - Math.abs((1 - direction) * peakFactor * volatility / 100));
    
    // Увеличиваем объем при сильных движениях
    const volume = baseVolume * (0.7 + Math.random() * 0.6) * (1 + peakFactor / 10);
    
    // Увеличиваем timestamp на 1 минуту
    timestamp += 60 * 1000;

    const record = {
      time: timestamp,
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      volume: parseFloat(volume.toFixed(2))
    };
    
    result.push(record);
    
    previousClose = close;
  }
  
  return result;
}
