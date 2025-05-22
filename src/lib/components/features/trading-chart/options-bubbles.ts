import {
	type CustomSeriesOptions,
	customSeriesDefaultOptions,
} from 'lightweight-charts';

export interface BubbleSeriesOptions extends CustomSeriesOptions {
  upColor: string,
	downColor: string,
	upStoke: string,
	downStroke: string,
	lineWidth: number;
}

export const defaultOptions: BubbleSeriesOptions = {
	...customSeriesDefaultOptions,
  upColor: '#26a69a50',
	downColor: '#ef535050',
	upStoke: '#26a69a',
	downStroke: '#ef5350',
	lineWidth: 2,
} as const;