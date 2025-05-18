export interface ITrade {
    time: string;
    open?: number;
    high?: number;
    low?: number;
    close?: number;
    price?: number;
    volume: number;
    direction: 'buy' | 'sell';
  }