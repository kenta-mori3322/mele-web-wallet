import { put, call, takeLatest } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import {
	TransactionsStateActionTypes,
	ITransactionsReducerAction,
} from "mele-web-wallet/redux/reducers/transactions-reducer";
import {
	transactionsService,
	ISearchTransactionsParameter,
} from "../../api/transactions-service";
export const transactionsSaga = function* handleMessage(
	params: any,
): SagaIterator {
	yield takeLatest(
		TransactionsStateActionTypes.LOAD_TRANSACTIONS_REQUEST,
		searchTransactions,
	);
	yield takeLatest(
		TransactionsStateActionTypes.GET_TRANSACTIONS_COUNT_REQUEST,
		getTransactionsCount,
	);
	yield takeLatest(
		TransactionsStateActionTypes.LOAD_TRANSACTION_REQUEST,
		getTransaction,
	);
	yield takeLatest(
		TransactionsStateActionTypes.SEND_TRANSACTION_REQUEST,
		sendTransaction,
	);
};

function* searchTransactions(action: ITransactionsReducerAction): SagaIterator {
	try {
		const p: ISearchTransactionsParameter = {
			page: action.page,
			size: action.size || 9999,
			address: action.address,
		};
		const response = yield call(transactionsService.getTransactions, p);
		return yield put({
			type: TransactionsStateActionTypes.LOAD_TRANSACTIONS_SUCCESS,
			loadedTransactions: response,
			totalCount: response.length,
		});
	} catch (e) {
		return yield put({
			type: TransactionsStateActionTypes.LOAD_TRANSACTIONS_ERROR,
			loadedTransactions: [],
			totalCount: 0,
		});
	}
}

function* getTransactionsCount(
	action: ITransactionsReducerAction,
): SagaIterator {
	try {
		const response = yield call(transactionsService.getTransactionsCount);
		return yield put({
			type: TransactionsStateActionTypes.GET_TRANSACTIONS_COUNT_SUCCESS,
			generatedTransactionsCount: response,
		});
	} catch (e) {
		return yield put({
			type: TransactionsStateActionTypes.GET_TRANSACTIONS_COUNT_ERROR,
			generatedTransactionsCount: 0,
		});
	}
}

function* getTransaction(action: ITransactionsReducerAction): SagaIterator {
	try {
		const response = yield call(
			transactionsService.getTransaction,
			action.hash,
		);
		return yield put({
			type: TransactionsStateActionTypes.LOAD_TRANSACTION_SUCCESS,
			loadedTransaction: response,
		});
	} catch (e) {
		return yield put({
			type: TransactionsStateActionTypes.LOAD_TRANSACTION_ERROR,
			loadedTransactions: undefined,
		});
	}
}

function* sendTransaction(action: ITransactionsReducerAction): SagaIterator {
	try {
		const response = yield call(
			transactionsService.sendTransaction,
			action.address,
			action.denom,
			action.amount,
		);
		return yield put({
			type: TransactionsStateActionTypes.SEND_TRANSACTION_SUCCESS,
		});
	} catch (e) {
		return yield put({
			type: TransactionsStateActionTypes.SEND_TRANSACTION_ERROR,
		});
	}
}
