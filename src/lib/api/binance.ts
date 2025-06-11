import ky from 'ky';

const HOST = `https://api.binance.com`;
const VERSION = `/api/v3`;

export interface ISympolPrieResponse {
  price: string,
  symbol: string,
}

const binanceApi = {
  /**
   * Get symbol price
   */
  getSymbolPrice: async (symbol: string): Promise<ISympolPrieResponse> => {
    const endpoint = `/ticker/price`;
    const params = `?symbol=${symbol}USDT`
    const url = `${HOST}${VERSION}${endpoint}${params}`
    return await ky.get(url).json();
  },
}

export default binanceApi;