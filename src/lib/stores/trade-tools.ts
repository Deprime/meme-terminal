import { persisted } from 'svelte-persisted-store';

// Types
import type { TQuickSellType, TOrderType } from '$lib/types/trade';

import { ORDER_TYPE } from '$lib/constants/trades';

export interface ITradeToolsStore {
  quickBuyAmounts: number[],
  quickSellAmounts: number[],
  quickSellPercents: number[],
  quickSellType: TQuickSellType,
  orderType: TOrderType,
}

const DEFAULT_STATE: ITradeToolsStore = {
  quickBuyAmounts: [0.01, 0.1, 1, 10],
  quickSellAmounts: [0.01, 0.1, 1, 10],
  quickSellPercents: [10, 25, 50, 100],
  quickSellType: "percent",
  orderType: ORDER_TYPE.market,
};

const { subscribe, set, update } = persisted('trade-tools', DEFAULT_STATE, { storage: 'local' });
const clear = () => set({...DEFAULT_STATE});

const tradeToolsStore = {
  subscribe,
  set,
  update,
  clear,
};

export default tradeToolsStore;
