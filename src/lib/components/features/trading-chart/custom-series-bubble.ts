import type {
	CustomSeriesPricePlotValues,
	ICustomSeriesPaneView,
	PaneRendererCustomData,
	WhitespaceData,
	Time,
} from 'lightweight-charts';

import  { type BubbleSeriesOptions, defaultOptions } from './options-bubbles';
import { BubbleSeriesRenderer } from './renderer-bubbles';
import type { BubbleData } from './data-bubbles';

export class BubbleSeries<TData extends BubbleData>
	implements ICustomSeriesPaneView<Time, TData, BubbleSeriesOptions>
{
	_renderer: BubbleSeriesRenderer<TData>;

	constructor() {
		this._renderer = new BubbleSeriesRenderer();
	}

	priceValueBuilder(plotRow: TData): CustomSeriesPricePlotValues {
		// zero at the start because it should draw from zero (like a column)
		return [0, plotRow.value];
	}

	isWhitespace(data: TData | WhitespaceData): data is WhitespaceData {
		return (data as Partial<TData>).value === undefined;
	}

	renderer(): BubbleSeriesRenderer<TData> {
		return this._renderer;
	}

	update(
		data: PaneRendererCustomData<Time, TData>,
		options: BubbleSeriesOptions
	): void {
		this._renderer.update(data, options);
	}

	defaultOptions() {
		return defaultOptions;
	}
}