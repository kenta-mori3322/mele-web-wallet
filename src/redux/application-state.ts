import { WalletState } from "./reducers/wallet-reducer";
import { LanguageState } from "./reducers/language-reducer";
import { TransactionsState } from "./reducers/transactions-reducer";
import { StaticState } from "./reducers/static-reducer";

export default class ApplicationState {
	wallet: WalletState = new WalletState();
	language: LanguageState = new LanguageState();
	transactions: TransactionsState = new TransactionsState();
	static: StaticState = new StaticState();
}
