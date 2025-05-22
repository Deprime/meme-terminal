/**
 * Get unix time now
 */
export function getUnixTimeNow(float = false, precition = 1000): number {
  const now = Date.now() / precition;
  return float ? now : Math.floor(now);
}