import type { CustomData } from 'lightweight-charts';

/**
 * Bubble Series Data
 */
export interface BubbleData extends CustomData {
	value: number;
  volume: number;
  direction: "buy" | "sell";
}