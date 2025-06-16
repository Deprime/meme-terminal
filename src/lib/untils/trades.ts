import { random } from "./math";

export function calculateSwapOutput(
  baseLiq: bigint, 
  quoteLiq: bigint,
  amountSol: bigint,
  isSellingSOL: boolean
) {
  let amountOut, newBaseLiq, newQuoteLiq;

  if (isSellingSOL) {
    // Пользователь продаёт SOL, получает PIPE
    amountOut = (amountSol * baseLiq) / (quoteLiq + amountSol);
    newBaseLiq = quoteLiq + amountSol;
    newQuoteLiq = baseLiq - amountOut;
  } else {
    // Пользователь продаёт PIPE, получает SOL
    amountOut = (amountSol * quoteLiq) / (baseLiq + amountSol);
    newQuoteLiq = baseLiq + amountSol;
    newBaseLiq = quoteLiq - amountOut;
  }
  const price = newQuoteLiq / newBaseLiq;

  return {
    amountOut, 
    price, 
    newBaseLiq, 
    newQuoteLiq
  };
}

/**
 * Generate trades
 */
export function generateTrades(
  count: number, 
  tokenSymbol = 'TOKEN', 
  tokenDecimals = 8,
  chainDecimal = 9,
) {
  const transactions = [];
  let currentUnixTime = Math.floor(Date.now() / 1000);
    
  for (let i = 0; i < count; i++) {
    const pricePerToken = (Math.random() * 0.099 + 0.001).toFixed(chainDecimal);
    const tokenAmount = (Math.random() * 290 + 10).toFixed(tokenDecimals);
    const solAmount = (parseFloat(pricePerToken) * parseFloat(tokenAmount)).toFixed(chainDecimal);
    // Type (BUY / SELL)
    const type = Math.random() > 0.5 ? 'buy' : 'sell';
    const volume = random(0.5, 50);
    
    // Добавляем сделку в массив
    transactions.push({
      id: `tx_${Math.random().toString(36).substring(2, 9)}`,
      time: currentUnixTime, // UNIX-время в секундах
      type,
      tokenSymbol,
      tokenAmount,
      solAmount,
      pricePerToken,
      volume,
      // volume: solAmount,
      fee: (Math.random() * 0.01).toFixed(chainDecimal),
      wallet: "7UBVT45nAcb4h3Hfibhm6PEP4Px1c2nqKBZWJfvxtzWY",
    });
    
    // Вычитаем случайное количество секунд (2–10) для следующей сделки
    const secondsToSubtract = Math.floor(Math.random() * 9) + 2;
    currentUnixTime -= secondsToSubtract;
  }
  
  // transactions.sort((a, b) => b.time - a.time);
  return transactions;
}