
/**
 * Get fibonacci number by index
 */
export function fibo(n: number): number {
  return n <= 1 ? n : fibo(n - 1) + fibo(n - 2);
}

/**
 * Number format
 */
export function numberFormat (
  value: number,
  precision = 0,
): string {
  value = typeof value === 'string' ? parseFloat(value) : value;
  return (value).toLocaleString(undefined, { minimumFractionDigits: precision });
};

/**
 * Get number within range
 */
export function numberWithinRange (
  number: number,
  min: number,
  max: number
): number {
  return Math.min(Math.max(number, min), max)
};

/**
 * Random
 */
export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}
