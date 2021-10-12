export interface Quote {
  USD: {
    price: number;
    last_updated: string;
  };
}

interface BaseData {
  id: number;
  name: string;
  symbol: string;
  last_updated: string;
  quote: Quote;
}

interface QuoteBaseData extends BaseData {
  slug: string;
  date_added: string;
}

interface ConversionBaseData extends BaseData {
  amount: number;
}

interface QuoteData {
  [name: string]: QuoteBaseData;
}

interface ConversionData {
  [name: string]: ConversionBaseData;
}

export interface QuoteResponse {
  data: QuoteData;
}

export interface ConversionResponse {
  data: ConversionData;
}

export function isQuoteResponse(data: QuoteResponse): data is QuoteResponse {
  return true;
}

export function isConversionResponse(
  data: ConversionResponse
): data is ConversionResponse {
  return true;
}
