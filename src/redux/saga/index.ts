import { all } from "redux-saga/effects";
import { blocksSaga } from "./blocks-saga";
import { transactionsSaga } from "./transactions-saga";
import { statisticsSaga } from "./statistics-saga";
import { validatorsSaga } from "./validators-saga";
import { accountSaga } from "./account-saga";

export const rootSaga = function* handleMessage(
	params: any,
): IterableIterator<any> {
	yield all([
		blocksSaga(params),
		transactionsSaga(params),
		statisticsSaga(params),
		validatorsSaga(params),
		accountSaga(params),
	]);
};
