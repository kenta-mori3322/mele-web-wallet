import axios, { AxiosRequestConfig, Method, AxiosResponse } from "axios";
require("dotenv").config();

declare const global: {};

const getUrl = () => {
	return process.env.REACT_APP_DEV_INDEXER_ENDPOINT;
};

export const API_URL = getUrl();

export interface ServiceRequestParam {
	timeout?: number;
	method?: Method;
	headers?: any;
	data?: any;
	path: string;
	body?: FormData;
}

export default class MainApiService {
	protected request = async (p: ServiceRequestParam): Promise<any> => {
		const defaultHeaders: any = {
			Accept: "application/json",
		};

		if (!p.body) {
			defaultHeaders["Content-Type"] = "application/json";
		}

		const fetchParam: AxiosRequestConfig = {
			method: p.method,
			headers: { ...defaultHeaders, ...p.headers },
		};
		if (p.data) {
			fetchParam.data = JSON.stringify(p.data);
		}
		if (p.body) {
			fetchParam.data = p.body;
		}
		let result: AxiosResponse<any>;
		try {
			result = await axios({
				...fetchParam,
				url: API_URL + p.path,
			});
		} catch (e) {
			result = e.response;
		}
		const body = await result.data;

		return { body: body, result: result };
	};

	protected get = async (p: ServiceRequestParam) => {
		p.method = "GET";
		const resp = await this.request(p);
		return resp.body;
	};
}
