import { Dispatch } from "redux";
import LanguageActionCreator from "./language-action-creator";
import TransactionsActionCreator from "./transactions-action-creator ";
import StaticActionCreator from "./static-action-creator";
import WalletActionCreator from "./wallet-action-creator";

export interface IActionCreators {
	language: LanguageActionCreator;
	transactions: TransactionsActionCreator;
	static: StaticActionCreator;
	wallet: WalletActionCreator;
}

export const mapDispatchToProps = (
	dispatch: Dispatch,
): { actionCreators: IActionCreators } => {
	return {
		actionCreators: {
			language: new LanguageActionCreator(dispatch),
			transactions: new TransactionsActionCreator(dispatch),
			static: new StaticActionCreator(dispatch),
			wallet: new WalletActionCreator(dispatch),
		},
	};
};
