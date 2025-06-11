export const TRADE_PERIODS = [
  {
    timing: 0,
    label: 'One trade',
  },  {
    timing: 1,
    label: '1 sec',
  },  {
    timing: 15,
    label: '15 sec',
  },  {
    timing: 30,
    label: '30 sec',
  },
];

export const SOL_DECIMAL = 9;

export interface IToken {
  symbol: string,
  title: string,
  mint: string,
  decimal: number, 
  img: string, 
}

export const TOKENS: IToken[] = [
  {
    symbol: "POPCAT",
    title: "POPCAT",
    mint: "7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr",
    decimal: 6,
    img: "https://gmgn.ai/external-res/59e6bcbba447323141e5fc5f1400dfe6.webp",
  }, {
    symbol: "Fartcoin",
    title: "Fartcoin",
    mint: "9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump",
    decimal: 6,
    img: "https://gmgn.ai/external-res/854569df0f58dc4c20cabf526eaf0b39.webp",
  }, {
    symbol: "TRUMP",
    title: "OFFICIAL TRUMP",
    mint: "6p6xgHyF7AeE6TZkSmFsko444wqoP15icUSqi2jfGiPN",
    decimal: 6,
    img: "https://gmgn.ai/defi/images/tokenmedia/b71639ceb0f9226c0f98a06dfa0d260c_128x128.jpg",
  }, {
    symbol: "RAY",
    title: "RAY",
    mint: "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
    decimal: 6,
    img: "https://gmgn.ai/external-res/df7d371ee60f57fa2d4f5f7124edcb73.webp",
  },
];

export const TOKEN = {
  title: "POPCAT",
  mint: "7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr",
  decimal: 6,
  // title: "RAY",
  // mint: "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
  // decimal: 6,

  // title: "$WIF",
  // mint: "EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm",
  // decimal: 6,

  // title: "Fartcoin",
  // mint: "9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump",
  // decimal: 6,
};

export type TChain = {
  symbol: string,
  title: string,
  mint: string,
  decimal: number,
}
export type TChainSet = {
  [key: string]: TChain,
}
export const CHAINS: TChainSet = {
  "SOL": {
    symbol: "SOL",
    title: "Solana",
    mint: "7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr",
    decimal: 9,
  }
}