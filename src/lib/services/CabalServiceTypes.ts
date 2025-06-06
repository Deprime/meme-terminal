import { Pong } from '.';
import { CabalStreamEvents } from './CabalStream';

export enum streamNames {
  UA = 'UA',
  TRADE = 'TRADE',
}

export enum ErrorCase {
  ping = 'ping',
  pingFinally = 'pingFinally',
}
export interface CabalServiceOpts<StreamResponse> {
  nameStream: string;
  onMessage: CabalStreamEventsHandler;

  clientConnectToStream: () => AsyncIterable<StreamResponse>;
  clientIsPong: (response: StreamResponse) => boolean;
  streamPinger: (params: { count: bigint }) => Promise<Pong>;

  debug?: boolean;
}

export type CabalStreamEventsHandler = (
  message: CabalStreamEvents,
  messagePayload?: unknown,
) => void;

export enum CabalUserActivityStreamMessages {
  userActivityConnected = 'userActivityConnected',

  userActivityStreamMessage = 'userActivityStreamMessage',

  userActivityPing = 'userActivityPing',
  userActivityPong = 'userActivityPong',
  userActivityError = 'userActivityError',

  tradeStats = 'tradeStats',
}

export enum CabalTradeStreamMessages {
  tradeConnected = 'tradeConnected',
  tradeDisconnected = 'tradeDisconnected',

  tradeStreamMessage = 'tradeStreamMessage',

  tradePing = 'tradePing',
  tradePong = 'tradePong',
  tradeError = 'tradeError',

  tradeEvent = 'tradeEvent',
  tokenStatus = 'tokenStatus',
}
