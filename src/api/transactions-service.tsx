import MainService from "./main-api-service";
import Cookies from "universal-cookie";
const { Mele, MnemonicSigner, Utils } = require("mele-sdk");
require("dotenv").config();

const sdk = new Mele({
	nodeUrl: process.env.REACT_APP_DEV_NODE_URL,
	indexerEndpoint: process.env.REACT_APP_DEV_INDEXER_ENDPOINT,
	chainId: process.env.REACT_APP_DEV_CHAINID,
});

const cookies = new Cookies();

export interface ISearchTransactionsParameter {
	page: number;
	size: number;
	address: string;
}

export default class TransactionsService extends MainService {
	getTransactions = async (p: ISearchTransactionsParameter) => {
		const txs = await sdk.indexer.transactions({
			address: p.address,
		});
		return txs;
	};
	getTransactionsCount = async () => {
		const txCount = await sdk.indexer.transactionCount();
		return txCount.count;
	};

	getTransaction = async (hash: string) => {
		const tx = await sdk.indexer.transaction(hash);
		return tx;
	};

	sendTransaction = async (address: string, denom: string, amount: string) => {
		const mnemonic = atob(cookies.get("mnemonic"));
		const mele = new Mele({
			nodeUrl: process.env.REACT_APP_DEV_NODE_URL,
			indexerEndpoint: process.env.REACT_APP_DEV_INDEXER_ENDPOINT,
			chainId: process.env.REACT_APP_DEV_CHAINID,
			signer: new MnemonicSigner(mnemonic),
		});
		const response = Utils.promisify(
			await mele.bank
				.transfer(address, [{ denom: denom, amount: amount }])
				.sendTransaction(),
		);
		return response;
	};
}
export const transactionsService = new TransactionsService();
