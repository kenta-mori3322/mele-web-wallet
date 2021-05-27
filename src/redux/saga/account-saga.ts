import { put, call, takeLatest } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import {
	AccountStateActionTypes,
	IAccountsReducerAction,
} from "mele-web-wallet/redux/reducers/account-reducer";
import { accountsService } from "../../api/account-service";
export const accountSaga = function* handleMessage(params: any): SagaIterator {
	yield takeLatest(AccountStateActionTypes.GET_ACCOUNT_REQUEST, getAccount);
};

function* getAccount(action: IAccountsReducerAction): SagaIterator {
	try {
		const response = yield call(accountsService.getAccount, action);
		return yield put({
			type: AccountStateActionTypes.GET_ACCOUNT_SUCCESS,
			loadedAccount: response,
		});
	} catch (e) {
		return yield put({
			type: AccountStateActionTypes.GET_ACCOUNT_ERROR,
			loadedAccount: undefined,
		});
	}
}
