interface TransactionMsg {
	action: string;
	data: any;
	module: string;
	sender: string;
	meta: any[];
	addresses: string[];
	log: string;
}

interface MsgObject {}

export interface ITRANSACTIONModel {
	_id: string;
	hash: string;
	height: string;
	msgs: TransactionMsg[];
	log: string;
	info: string;
	code: string;
	codespace: string;
	gas_wanted: string;
	gas_used: string;
	timestamp: string;
	valid: boolean;
}

export enum TransactionsStateActionTypes {
	LOAD_TRANSACTIONS_REQUEST = "@@Transactions/LOAD_TRANSACTIONS_REQUEST",
	LOAD_TRANSACTIONS_SUCCESS = "@@Transactions/LOAD_TRANSACTIONS_SUCCESS",
	LOAD_TRANSACTIONS_ERROR = "@@Transactions/LOAD_TRANSACTIONS_ERROR",
	LOAD_TRANSACTION_REQUEST = "@@Transactions/LOAD_TRANSACTION_REQUEST",
	LOAD_TRANSACTION_SUCCESS = "@@Transactions/LOAD_TRANSACTION_SUCCESS",
	LOAD_TRANSACTION_ERROR = "@@Transactions/LOAD_TRANSACTION_ERROR",
	GET_TRANSACTIONS_COUNT_REQUEST = "@@Transactions/GET_TRANSACTIONS_COUNT_REQUEST",
	GET_TRANSACTIONS_COUNT_SUCCESS = "@@Transactions/GET_TRANSACTIONS_COUNT_SUCCESS",
	GET_TRANSACTIONS_COUNT_ERROR = "@@Transactions/GET_TRANSACTIONS_COUNT_ERROR",
}

export enum LoadTransactionsStatus {
	REQUESTED,
	SUCCESS,
	ERROR,
	TRANSACTIONS_COUNT_REQUESTED,
}

export class TransactionsState {
	loadedTransactions: ITRANSACTIONModel[];
	totalCount: number;
	generatedTransactionsCount: number;
	loadedTransaction?: ITRANSACTIONModel;
	loadTransactionsStatus: LoadTransactionsStatus;
}

export class ITransactionsReducerAction {
	page: number;
	size: number;
	hash: string;
	type: TransactionsStateActionTypes;
	loadedTransactions: ITRANSACTIONModel[];
	totalCount: number;
	loadedTransaction: ITRANSACTIONModel;
	generatedTransactionsCount: number;
}

export const initialState: TransactionsState = new TransactionsState();

const TransactionsReducer = (
	state: TransactionsState = initialState,
	action: ITransactionsReducerAction,
): TransactionsState => {
	switch (action.type) {
		case TransactionsStateActionTypes.LOAD_TRANSACTIONS_REQUEST:
			return {
				...state,
				loadTransactionsStatus: LoadTransactionsStatus.REQUESTED,
			};
		case TransactionsStateActionTypes.LOAD_TRANSACTIONS_SUCCESS:
			return {
				...state,
				loadedTransactions: action.loadedTransactions,
				totalCount: action.totalCount,
			};
		case TransactionsStateActionTypes.LOAD_TRANSACTIONS_ERROR:
			return {
				...state,
				loadTransactionsStatus: LoadTransactionsStatus.ERROR,
				loadedTransactions: [],
				totalCount: 0,
			};
		case TransactionsStateActionTypes.GET_TRANSACTIONS_COUNT_REQUEST:
			return {
				...state,
				loadTransactionsStatus:
					LoadTransactionsStatus.TRANSACTIONS_COUNT_REQUESTED,
			};
		case TransactionsStateActionTypes.GET_TRANSACTIONS_COUNT_SUCCESS:
			return {
				...state,
				generatedTransactionsCount: action.generatedTransactionsCount,
			};
		case TransactionsStateActionTypes.GET_TRANSACTIONS_COUNT_ERROR:
			return {
				...state,
				generatedTransactionsCount: 0,
			};
		case TransactionsStateActionTypes.LOAD_TRANSACTION_REQUEST:
			return {
				...state,
			};
		case TransactionsStateActionTypes.LOAD_TRANSACTION_SUCCESS:
			return {
				...state,
				loadedTransaction: action.loadedTransaction,
			};
		case TransactionsStateActionTypes.LOAD_TRANSACTION_ERROR:
			return {
				...state,
				loadedTransaction: undefined,
			};
		default:
			return {
				...state,
			};
	}
};

export default TransactionsReducer;
