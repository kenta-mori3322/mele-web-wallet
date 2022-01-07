import MainService from "./main-api-service";
import Cookies from "universal-cookie";
const { MnemonicSigner, Mele } = require("mele-sdk");

export interface ISearchWalletParameter {
	mnemonic: string;
	address: string;
}

export default class WalletService extends MainService {
	getWalletAddress = async (p: ISearchWalletParameter) => {
		// const signer = new MnemonicSigner(
		// 	"betray theory cargo way left cricket doll room donkey wire reunion fall left surprise hamster corn village happy bulb token artist twelve whisper expire",
		// );
		const signer = new MnemonicSigner(p.mnemonic);
		const address = signer.getAddress();
		const cookies = new Cookies();
		cookies.set("address", btoa(address));
		return address;
	};

	getWallet = async (p: ISearchWalletParameter) => {
		const cookies = new Cookies();
		const mele = new Mele({
			nodeUrl: "http://18.198.187.57:26657",
			indexerEndpoint: "http://18.195.116.23:3100/api/v1",
			chainId: "test",
			signer: new MnemonicSigner(p.mnemonic),
		});
		const wallet = await mele.query.getAccountInfo(
			atob(cookies.get("address")),
		);
		console.log(atob(cookies.get("address")));
		return wallet;
	};
}
export const walletService = new WalletService();
