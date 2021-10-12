"use strict";
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
const crypto_1 = __importDefault(require("./services/crypto"));
const crypto_2 = require("./types/crypto");
const dotenv = require("dotenv");
dotenv.config();
const key = process.env.KEY;
if (!key) {
    throw Error("key not found");
}
const api = new crypto_1.default(key);
function getBtcQuotes() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield api.quotes(["BTC"]);
            if ((0, crypto_2.isQuoteResponse)(response)) {
                return response.data;
            }
        }
        catch (error) {
            return error;
        }
    });
}
function convertBtcToUsdt() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield api.conversion();
            if ((0, crypto_2.isConversionResponse)(response)) {
                return response.data;
            }
        }
        catch (error) {
            return error;
        }
    });
}
