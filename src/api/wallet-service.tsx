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
		cookies.set("address", address);
		return address;
	};

	getWallet = async (p: ISearchWalletParameter) => {
		const mele = new Mele({
			nodeUrl: "http://3.126.68.149:26657/",
			indexerEndpoint: "http://18.192.179.29:3100/api/v1",
			chainId: "devnet",
			signer: new MnemonicSigner(p.mnemonic),
		});
		const cookies = new Cookies();
		const wallet = await mele.query.getAccountInfo(cookies.get("address"));
		return wallet;
	};
}
export const walletService = new WalletService();
