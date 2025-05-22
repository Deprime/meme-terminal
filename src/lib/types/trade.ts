export type TDirection = "buy" | "sell";

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
