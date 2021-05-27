import {
	TransactionsStateActionTypes,
	ITransactionsReducerAction,
} from "../reducers/transactions-reducer";
import BaseActionCreator from "./base-action-creator";

export default class TransactionsActionCreator extends BaseActionCreator<
	TransactionsStateActionTypes,
	ITransactionsReducerAction
> {
	searchTransactions = async () => {
		this.dispatch({
			type: TransactionsStateActionTypes.LOAD_TRANSACTIONS_REQUEST,
		});
	};

	getTransactionsCount = async () => {
		this.dispatch({
			type: TransactionsStateActionTypes.GET_TRANSACTIONS_COUNT_REQUEST,
		});
	};

	getTransaction = async (hash: string) => {
		this.dispatch({
			type: TransactionsStateActionTypes.LOAD_TRANSACTION_REQUEST,
			hash: hash,
		});
	};
}
