"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const getUrl = (url, token) => {
    return axios_1.default.create({
        baseURL: url,
        headers: { "X-CMC_PRO_API_KEY": `${token}` },
    });
};
const FIELDS = ["id", "name", "symbol", "slug", "date_added", "last_updated"];
const QUOTEFIELDS = ["price", "last_updated"];
const QUOTESURL = "cryptocurrency/quotes/latest?symbol=";
const CONVERTURL = "tools/price-conversion?";
class Api {
    constructor(key) {
        this.baseUrl = "https://pro-api.coinmarketcap.com/v1/";
        this.axiosInstance = getUrl(this.baseUrl, key);
    }
    quotes(symbol = ["BTC"]) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.axiosInstance.get(QUOTESURL + symbol.join(","));
                const { data } = response.data;
                const payload = {};
                for (const key in data) {
                    payload[key] = {};
                    for (const subKey in data[key]) {
                        if (FIELDS.includes(subKey)) {
                            payload[key] = Object.assign(Object.assign({}, payload[key]), { [subKey]: data[key][subKey] });
                        }
                        if (subKey === "quote") {
                            for (const quoteKey in data[key][subKey]) {
                                payload[key][subKey] = Object.assign(Object.assign({}, payload[key][subKey]), { [quoteKey]: {
                                        price: data[key][subKey][quoteKey].price,
                                        last_updated: data[key][subKey][quoteKey].last_updated,
                                    } });
                            }
                        }
                    }
                }
                return data;
            }
            catch (error) {
                return error.response;
            }
        });
    }
    conversion(symbol = "BTC", amount = 1, convert = "USDT") {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.axiosInstance.get(CONVERTURL + `amount=${amount}&symbol=${symbol}&convert=${convert}`);
                return { data: response.data.data };
            }
            catch (error) {
                return error.response;
            }
        });
    }
}
exports.default = Api;
