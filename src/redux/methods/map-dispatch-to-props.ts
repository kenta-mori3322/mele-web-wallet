import { Dispatch } from "redux";
import LanguageActionCreator from "./language-action-creator";
import BlocksActionCreator from "./blocks-action-creator";
import TransactionsActionCreator from "./transactions-action-creator ";
import StatisticsActionCreator from "./statistics-action-creator";
import ValidatorsActionCreator from "./validators-action-creator";
import AccountActionCreator from "./account-action-creator";

export interface IActionCreators {
	language: LanguageActionCreator;
	blocks: BlocksActionCreator;
	transactions: TransactionsActionCreator;
	statistics: StatisticsActionCreator;
	validators: ValidatorsActionCreator;
	account: AccountActionCreator;
}

export const mapDispatchToProps = (
	dispatch: Dispatch,
): { actionCreators: IActionCreators } => {
	return {
		actionCreators: {
			language: new LanguageActionCreator(dispatch),
			blocks: new BlocksActionCreator(dispatch),
			transactions: new TransactionsActionCreator(dispatch),
			statistics: new StatisticsActionCreator(dispatch),
			validators: new ValidatorsActionCreator(dispatch),
			account: new AccountActionCreator(dispatch),
		},
	};
};
