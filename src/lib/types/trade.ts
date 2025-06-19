export type TDirection = "buy" | "sell";
export type TOrderType = "market" | "limit" | "trailing";
export type TQuickSellType = "percent" | "amount";

export interface ITrade {
  time: string;
  open?: number;
  high?: number;
  low?: number;
  close?: number;
  price?: number;
  volume: number;
  direction: TDirection;
}

export interface ITradePeriod {
  timing: number,
  label: string,
}
