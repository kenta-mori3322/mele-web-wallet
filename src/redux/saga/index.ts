import { all } from "redux-saga/effects";
import { transactionsSaga } from "./transactions-saga";
import { staticSaga } from "./static-saga";
import { walletSaga } from "./wallet-saga";

export const rootSaga = function* handleMessage(
	params: any,
): IterableIterator<any> {
	yield all([transactionsSaga(params), staticSaga(params), walletSaga(params)]);
};
