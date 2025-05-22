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