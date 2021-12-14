import MainService from "./main-api-service";
import buildUrl from "build-url";
const { Mele } = require("mele-sdk");

const sdk = new Mele({
	nodeUrl: "http://3.19.27.59:26657",
	indexerEndpoint: "http://3.17.204.165:3100/api/v1",
	chainId: "test",
});

export interface ISearchTransactionsParameter {
	page: number;
	size: number;
}

export default class TransactionsService extends MainService {
	getTransactions = async (p: ISearchTransactionsParameter) => {
		const txs = await sdk.indexer.transactions();
		return txs;
	};
	getTransactionsCount = async () => {
		const txCount = await sdk.indexer.transactionCount();
		return txCount.count;
	};

	getTransaction = async (hash: string) => {
		const tx = sdk.indexer.transaction(hash);
		return tx;
	};
}
export const transactionsService = new TransactionsService();
