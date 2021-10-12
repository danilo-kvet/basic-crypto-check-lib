import Api from "./services/crypto";
import {
  QuoteResponse,
  isQuoteResponse,
  ConversionResponse,
  isConversionResponse,
} from "./types/crypto";
const dotenv = require("dotenv");
dotenv.config();

const key = process.env.KEY;

if (!key) {
  throw Error("key not found");
}
const api = new Api(key);

async function getBtcQuotes() {
  try {
    const response: QuoteResponse = await api.quotes(["BTC"]);
    if (isQuoteResponse(response)) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
}

async function convertBtcToUsdt() {
  try {
    const response: ConversionResponse = await api.conversion();
    if (isConversionResponse(response)) {
      return response.data;
    }
  } catch (error) {
    return error;
  }
}
