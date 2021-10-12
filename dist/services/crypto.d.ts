import { AxiosInstance } from "axios";
export default class Api {
    baseUrl: string;
    axiosInstance: AxiosInstance;
    constructor(key: string);
    quotes(symbol?: string[]): Promise<any>;
    conversion(symbol?: string, amount?: number, convert?: string): Promise<any>;
}
