export const fakeConsole = {
  log: () => void 0,
  info: () => void 0,
};

export const toLamports = (sol: number): bigint =>
  BigInt(Math.round(sol * 1_000_000_000));
