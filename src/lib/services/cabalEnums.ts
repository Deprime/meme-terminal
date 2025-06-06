export enum CabalConfig {
  pingUserInterval = 8000,
  pingTradeInterval = 8000,
}

export const defaultState = {
  api_secret_key: '',
  quick_buy_amount: 0.001,
  quick_sell_amount: 0.001,
  buy_presets: [0.5, 1, 2, 5],
  sell_presets: [0.5, 1, 2, 5],
  buy_tip: 0.001,
  sell_tip: 0.001,
  buy_slippage: 20,
  sell_slippage: 20,
};
