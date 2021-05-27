import MainService from "./main-api-service";
import buildUrl from "build-url";
const { Mele, MnemonicSigner } = require("mele-sdk");

const mnemonic =
	"around fire birth cradle assault equal risk dune goat recycle torch hole control pluck cry math noble crystal language uncover leave ski dust answer";

const sdk = new Mele({
	nodeUrl: "http://3.126.68.149:26657/",
	chainId: "devnet",
	signer: new MnemonicSigner(mnemonic),
	indexerEndpoint: "http://18.192.179.29:3100/api/v1",
});

export interface ISearchAccountsParameter {
	address: string;
}

export default class AccountsService extends MainService {
	getAccount = async (p: ISearchAccountsParameter) => {
		const account = await sdk.query.getAccountInfo(p.address);
		return account;
	};
}
export const accountsService = new AccountsService();
