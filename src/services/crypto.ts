// @ts-nocheck

import axios, { AxiosError, AxiosInstance } from "axios";

const getUrl = (url: string, token: string) => {
  return axios.create({
    baseURL: url,
    headers: { "X-CMC_PRO_API_KEY": `${token}` },
  });
};

const FIELDS = ["id", "name", "symbol", "slug", "date_added", "last_updated"];
const QUOTEFIELDS = ["price", "last_updated"];
const QUOTESURL = "cryptocurrency/quotes/latest?symbol=";
const CONVERTURL = "tools/price-conversion?";

export default class Api {
  baseUrl: string = "https://pro-api.coinmarketcap.com/v1/";
  axiosInstance: AxiosInstance;

  constructor(key: string) {
    this.axiosInstance = getUrl(this.baseUrl, key);
  }

  public async quotes(symbol: string[] = ["BTC"]) {
    try {
      const response = await this.axiosInstance.get(
        QUOTESURL + symbol.join(",")
      );
      const { data } = response.data;

      const payload = {};

      for (const key in data) {
        payload[key] = {};
        for (const subKey in data[key]) {
          if (FIELDS.includes(subKey)) {
            payload[key] = { ...payload[key], [subKey]: data[key][subKey] };
          }
          if (subKey === "quote") {
            for (const quoteKey in data[key][subKey]) {
              payload[key][subKey] = {
                ...payload[key][subKey],
                [quoteKey]: {
                  price: data[key][subKey][quoteKey].price,
                  last_updated: data[key][subKey][quoteKey].last_updated,
                },
              };
            }
          }
        }
      }

      return data;
    } catch (error) {
      return error.response;
    }
  }

  public async conversion(
    symbol: string = "BTC",
    amount: number = 1,
    convert: string = "USDT"
  ) {
    try {
      const response = await this.axiosInstance.get(
        CONVERTURL + `amount=${amount}&symbol=${symbol}&convert=${convert}`
      );

      return { data: response.data.data };
    } catch (error) {
      return error.response;
    }
  }
}
