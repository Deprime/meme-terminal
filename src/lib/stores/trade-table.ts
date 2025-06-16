import { persisted } from 'svelte-persisted-store';

// Types
export interface ITradeTableStore {
  timeFormat: "date" | "age",
  priceFormat: "chain" | "usd",
  valueFormat: "marketcup" | "token",
  walletFilter: string,
  sort: {
    key: "time",
    order: "asc" | "desc",
  }
}

const DEFAULT_STATE: ITradeTableStore = {
  timeFormat: "date",
  priceFormat:  "usd",
  valueFormat: "marketcup",
  walletFilter: "",
  sort: {
    key: "time",
    order: "asc",
  }
};

const { subscribe, set, update } = persisted('trade-table', DEFAULT_STATE, { storage: 'local' });
const clear = () => set({...DEFAULT_STATE});

const tradeTableStore = {
  subscribe,
  set,
  update,
  clear,
};

export default tradeTableStore;
