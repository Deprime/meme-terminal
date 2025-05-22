import { CanvasRenderingTarget2D, type BitmapCoordinatesRenderingScope } from 'fancy-canvas';

import type {
	Coordinate,
	ICustomSeriesPaneRenderer,
	PaneRendererCustomData,
	PriceToCoordinateConverter,
	Time,
  IRange
} from 'lightweight-charts';

import type { BubbleData } from './data-bubbles';
import type { BubbleSeriesOptions } from './options-bubbles';

import { positionsBox, positionsLine } from './helpers/postitons';

// interface BarItem {
// 	openY: number;
// 	highY: number;
// 	lowY: number;
// 	closeY: number;
// 	amount: number;
// 	x: number;
// 	isUp: boolean;
// }

interface BubbleBarItem {
  volume: number; 
  isUp: boolean,
	x: number;
	y: Coordinate | number;
}

export class BubbleSeriesRenderer<TData extends BubbleData>
	implements ICustomSeriesPaneRenderer
{
	_data: PaneRendererCustomData<Time, TData> | null = null;
	_options: BubbleSeriesOptions | null = null;

  draw(
		target: CanvasRenderingTarget2D,
		priceConverter: PriceToCoordinateConverter
	): void {
		target.useBitmapCoordinateSpace(scope =>
			this._drawImpl(scope, priceConverter)
		);
	}

	update(
		data: PaneRendererCustomData<Time, TData>,
		options: BubbleSeriesOptions
	): void {
		this._data = data;
		this._options = options;
	}

  _drawImpl(
		renderingScope: BitmapCoordinatesRenderingScope,
		priceToCoordinate: PriceToCoordinateConverter
	): void {
		if (
			this._data === null ||
			this._data.bars.length === 0 ||
			this._data.visibleRange === null ||
			this._options === null
		) {
			return;
		}
		const bars: BubbleBarItem[] = this._data.bars.map(bar => {
			return {
        volume: bar.originalData.volume,
        isUp: bar.originalData.direction === "buy",
				x: bar.x,
				y: priceToCoordinate(bar.originalData.value) ?? 0,
			};
		});

		this._drawEllips(
      renderingScope, 
      bars, 
      this._data.visibleRange, 
      this._options
    );
	}

  private _drawEllips(
    renderingScope: BitmapCoordinatesRenderingScope,
    bars: readonly BubbleBarItem[],
    visibleRange: IRange<number>,
    options: BubbleSeriesOptions
  ) {
		for (let i = visibleRange.from; i < visibleRange.to; i++) {
      const min =  4;
      const max = 150;
			const bar = bars[i];
      const zipped = bar.volume / 4**10;
      let sinthVolume = zipped < min ? min : zipped;
      sinthVolume = sinthVolume > max ? max : sinthVolume;
		  const radius = Math.floor(sinthVolume  / 2);

      renderingScope.context.fillStyle = bar.isUp 
        ? options.upColor
				: options.downColor; 

      renderingScope.context.strokeStyle = bar.isUp 
        ? options.upStoke
				: options.downStroke; 

			renderingScope.context.beginPath();
			renderingScope.context.arc(
				bar.x * renderingScope.horizontalPixelRatio,
				bar.y * renderingScope.verticalPixelRatio,
				radius * renderingScope.horizontalPixelRatio,
				0,
				Math.PI * 2
			);
      renderingScope.context.stroke();
			renderingScope.context.fill();
		}
  }
}