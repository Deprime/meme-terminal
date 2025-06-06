import { createClient } from '@connectrpc/connect';
import { createGrpcWebTransport } from '@connectrpc/connect-web';
import { CabalRpc } from './CabalRpc/cabal_pb';

// gRPC-Web for Cabal
const createCabalTransport = ({
  apiKey,
  apiUrl,
}: {
  apiKey: string;
  apiUrl: string;
}) =>
  createGrpcWebTransport({
    baseUrl: apiUrl,
    interceptors: [
      (next) => async (req) => {
        req.header.set('auth', apiKey);
        return await next(req);
      },
    ],
  });

export const createGRPCCabalClient = ({
  apiKey,
  apiUrl,
}: {
  apiKey: string;
  apiUrl: string;
}) => {
  const transport = createCabalTransport({ apiKey, apiUrl });
  const client = createClient(CabalRpc, transport);
  return client;
};
