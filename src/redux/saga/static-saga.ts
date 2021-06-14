import {
	StaticStateActionTypes,
	IStaticReducerAction,
} from "../reducers/static-reducer";
import { put, call, takeEvery, takeLatest, select } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import { staticService } from "mele-web-wallet/api/static-service";

export const staticSaga = function* handleMessage(params: any): SagaIterator {
	yield takeLatest(StaticStateActionTypes.LOAD_STATIC_REQUEST, loadStatic);
	yield takeLatest(
		StaticStateActionTypes.LOAD_STATIC_INFO_REQUEST,
		loadStaticInfo,
	);
};

function* loadStatic(action: IStaticReducerAction): SagaIterator {
	try {
		const staticInfo = yield call(staticService.getStaticInfo);
		const StaticInfo = yield call(staticService.getStaticNumbers);

		staticInfo.melecPrice = "370370000";
		staticInfo.priceOfGoldPerGram = "61570000000";
		staticInfo.melgPerGramOfGold = "10";

		return yield put({
			type: StaticStateActionTypes.LOAD_STATIC_SUCCESS,
			StaticInfo: StaticInfo,
			staticInfo: staticInfo,
		});
	} catch (e) {
		return yield put({
			type: StaticStateActionTypes.LOAD_STATIC_ERROR,
		});
	}
}
function* loadStaticInfo(action: IStaticReducerAction): SagaIterator {
	try {
		const staticInfo = yield call(staticService.getStaticInfo);

		staticInfo.melecPrice = "370370000";
		staticInfo.priceOfGoldPerGram = "61570000000";
		staticInfo.melgPerGramOfGold = "10";

		return yield put({
			type: StaticStateActionTypes.LOAD_STATIC_INFO_SUCCESS,
			staticInfo: staticInfo,
		});
	} catch (e) {
		return yield put({
			type: StaticStateActionTypes.LOAD_STATIC_INFO_ERROR,
		});
	}
}
