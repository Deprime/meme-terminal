import { persisted } from 'svelte-persisted-store';

// Types
export interface IRatesStore {
  'SOL': number,
}

const DEFAULT_STATE: IRatesStore = {
  'SOL': 0,
};

const { subscribe, set, update } = persisted('rates', DEFAULT_STATE, { storage: 'local' });
const clear = () => set({...DEFAULT_STATE});

const ratesStore = {
  subscribe,
  set,
  update,
  clear,
};

export default ratesStore;
