import { ConnectError } from '@connectrpc/connect';

import { FakeConsole } from './types';
import { fakeConsole } from './utils';

import { CabalConfig } from './cabalEnums';
import { Pong } from '.';
import {
  CabalServiceOpts,
  CabalStreamEventsHandler,
  ErrorCase,
} from './CabalServiceTypes';

export enum CabalStreamEvents {
  connected = 'connected',
  message = 'message',
  ping = 'ping',
  pong = 'pong',
  error = 'error',
}

class CabalStream<StreamResponse> {
  nameStream: string;
  streamInstance: AsyncIterable<StreamResponse> | undefined;
  reconnect: boolean = true;
  private onMessage: CabalStreamEventsHandler;
  private pingUserTimeout: number | undefined;
  private isPinging = false;
  log: Console | FakeConsole;
  onePongReceived: Promise<void> | undefined;
  _resolveOnePong: undefined | (() => void);
  _rejectedOnePong: undefined | (() => void);

  clientConnectToStream: () => AsyncIterable<StreamResponse>;
  clientIsPong: (response: StreamResponse) => boolean;
  streamPinger: (params: { count: bigint }) => Promise<Pong>;

  constructor({
    nameStream,

    clientConnectToStream,
    clientIsPong,
    streamPinger,

    onMessage,
    debug = false,
  }: CabalServiceOpts<StreamResponse>) {
    this.nameStream = nameStream;
    this.log = debug ? console : fakeConsole;

    this.clientConnectToStream = clientConnectToStream;
    this.clientIsPong = clientIsPong;
    this.streamPinger = streamPinger;

    this.onMessage = onMessage;

    this.isPinging = false;
  }

  async start() {
    try {
      this.log.log(`[${this.nameStream}]: start`);
      this.streamInstance = this.connectToStream();

      this.onePongReceived = new Promise((resolve, rejected) => {
        this._resolveOnePong = resolve;
        this._rejectedOnePong = rejected;
      });
      setTimeout(() => this.listen(), 0);

      // start pinging
      this.isPinging = true;
      setTimeout(() => this.ping(), 0);

      await this.onePongReceived;
      this.onMessage(CabalStreamEvents.connected);
    } catch (error) {
      this.onErrorAndDestoy(`start error`, (error as unknown as Error).message);
      if (this._rejectedOnePong) {
        this._rejectedOnePong();
      }
    }
  }

  connectToStream() {
    try {
      this.log.log(`[${this.nameStream}]: start connect`);
      return this.clientConnectToStream();
    } catch (error) {
      throw new Error((error as unknown as Error).message);
    }
  }

  async listen() {
    this.log.log(`[${this.nameStream}]: start listening`);
    if (!this.streamInstance) {
      throw new Error(
        `[${this.nameStream}]: streamInstance is undefined error`,
      );
    }

    try {
      for await (const response of this.streamInstance) {
        this.log.log(`[${this.nameStream}]: received message`, response);
        if (this.clientIsPong(response) && this._resolveOnePong) {
          this._resolveOnePong();
        }

        this.onMessage(CabalStreamEvents.message, response);
      }
    } catch (error) {
      console.error(error);
      // this.onErrorAndDestoy(`[${this.nameStream}]: listen error `, error);
    }
  }

  async ping() {
    try {
      this.log.log(`[${this.nameStream}]: start ping`);

      const error = this.checkForError({ errorCase: ErrorCase.ping });
      if (error) {
        console.error('!!!', error);
        throw new Error(error);
      }

      const pingResult = await this.streamPinger({ count: BigInt(Date.now()) });
      this.log.log(`[${this.nameStream}]: ping result `, pingResult);
    } catch (error) {
      this.onErrorAndDestoy(`[${this.nameStream}]: ping error `, error);
    } finally {
      this.log.log(`[${this.nameStream}]: ping finally`);
      const error = this.checkForError({ errorCase: ErrorCase.pingFinally });

      if (error) {
        console.error(error);
        return;
      }

      if (!error) {
        clearTimeout(this.pingUserTimeout);
        this.pingUserTimeout = setTimeout(
          () => this.ping(),
          CabalConfig.pingUserInterval,
        );
      }
    }
  }

  checkForError({ errorCase }: { errorCase: ErrorCase }) {
    if (!this.streamInstance) {
      return `[${this.nameStream}]: streamInstance is undefined error`;
    }
    if (errorCase === ErrorCase.ping || errorCase === ErrorCase.pingFinally) {
      if (!this.isPinging) {
        return `[${this.nameStream}]: isPinging: ${this.isPinging}`;
      }

      if (!this.streamPinger) {
        return `[${this.nameStream}]: streamInstance is undefined error`;
      }
    }
    return undefined;
  }

  destroy() {
    this.log.log('destroy cabal UAStream');
    this.streamInstance = undefined;
    this.onePongReceived = undefined;
    this.isPinging = false;
    clearTimeout(this.pingUserTimeout);
    this.pingUserTimeout = undefined;
  }

  onErrorAndDestoy(errorMessage: string, error: unknown | Error) {
    console.error(errorMessage);
    this.onMessage(CabalStreamEvents.error, (error as Error).message);
    this.destroy();
  }
}

export default CabalStream;
