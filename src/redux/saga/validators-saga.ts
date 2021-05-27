import { put, call, takeLatest } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import {
	ValidatorsStateActionTypes,
	IValidatorsReducerAction,
} from "mele-web-wallet/redux/reducers/validators-reducer";
import {
	validatorsService,
	ISearchValidatorsParameter,
} from "../../api/validators-service";
export const validatorsSaga = function* handleMessage(
	params: any,
): SagaIterator {
	yield takeLatest(
		ValidatorsStateActionTypes.LOAD_VALIDATORS_REQUEST,
		searchValidators,
	);
	yield takeLatest(
		ValidatorsStateActionTypes.LOAD_VALIDATOR_REQUEST,
		getValidator,
	);
};

function* searchValidators(action: IValidatorsReducerAction): SagaIterator {
	try {
		const p: ISearchValidatorsParameter = {
			page: action.page,
			size: action.size || 9999,
		};

		const response = yield call(validatorsService.getValidators, p);
		return yield put({
			type: ValidatorsStateActionTypes.LOAD_VALIDATORS_SUCCESS,
			loadedValidators: response,
			totalCount: response.length,
		});
	} catch (e) {
		return yield put({
			type: ValidatorsStateActionTypes.LOAD_VALIDATORS_ERROR,
			loadedValidators: [],
			totalCount: 0,
		});
	}
}

function* getValidator(action: IValidatorsReducerAction): SagaIterator {
	try {
		const response = yield call(validatorsService.getValidator, action.address);
		return yield put({
			type: ValidatorsStateActionTypes.LOAD_VALIDATOR_SUCCESS,
			loadedValidator: response,
		});
	} catch (e) {
		return yield put({
			type: ValidatorsStateActionTypes.LOAD_VALIDATOR_ERROR,
			loadedValidator: undefined,
		});
	}
}
