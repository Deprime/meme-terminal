import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import { CabalRpcClient } from './stubs-ts/cabal.client';

const GRPC_URL = import.meta.env.VITE_GRPC_URL;
const GRPC_TOKEN = import.meta.env.VITE_GRPC_TOKEN;
const HTTPS_GRPC_URL = `https://${GRPC_URL}`;

export const options = {
  meta: {
    "auth": GRPC_TOKEN
  }
}

const transport = new GrpcWebFetchTransport({
  baseUrl: HTTPS_GRPC_URL,
  format: "text",
});

// transport: grpc.WebsocketTransport(),
export const grpcClientTs = new CabalRpcClient(transport);

/**
 * Get Trades stream call
 */
export function getStreamCallTrades() {
  return grpcClientTs.tradesUni({}, options);
}

/**
 * Get UserActivity stream call
 */
export function getStreamCallUserActivity() {
  return grpcClientTs.userActivityUni({}, options);
}

/**
 * Subscribe token
 */
export async function subscribeToken(mint: string) {
  const input = {
    mint
  }
  return grpcClientTs.subscribeToken(input, options);
}

/**
 * Ping user stream
 */
export async function pingUser() {
  const input = { 
    count: BigInt(1) 
  }
  grpcClientTs.userPing(input, options);
}
 
/**
 * Ping trade stream
 */
export async function pingTrade() {
  const input = { 
    count: BigInt(1) 
  }
  grpcClientTs.tradePing(input, options);
}
 