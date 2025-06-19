// Types
import type { TOrderType } from '$lib/types/trade';

export const ORDER_TYPE: {
  [key in TOrderType]: TOrderType
} = {
  market: 'market',
  limit: 'limit',
  trailing: 'trailing',
}