import { writable } from 'svelte/store';

const DEFAULT_STATE = [];

const { subscribe, set, update } = writable(DEFAULT_STATE);
const clear = () => set(DEFAULT_STATE);

const tradesStore = {
  subscribe,
  set,
  update,
  clear,
};

export default tradesStore;
