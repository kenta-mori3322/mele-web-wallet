import MainService from "./main-api-service";
import Cookies from "universal-cookie";
const { Mele, MnemonicSigner, Utils } = require("mele-sdk");

const sdk = new Mele({
	nodeUrl: "http://3.19.27.59:26657",
	indexerEndpoint: "http://3.17.204.165:3100/api/v1",
	chainId: "testnet",
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
			nodeUrl: "http://3.19.27.59:26657",
			indexerEndpoint: "http://3.17.204.165:3100/api/v1",
			chainId: "testnet",
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
