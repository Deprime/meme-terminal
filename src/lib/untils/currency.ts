/**
 * Currency format
 */
export function currencyFormat (
  value: number,
  minimumFractionDigits = 0,
  maximumFractionDigits = 2,
): string {
  value = typeof value === 'string' ? parseFloat(value) : value;
  return (value).toLocaleString(undefined, { minimumFractionDigits, maximumFractionDigits }).replace(/,/g, ".");
};