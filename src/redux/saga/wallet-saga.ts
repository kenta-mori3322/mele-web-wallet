import { put, call, takeLatest } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import {
	WalletStateActionTypes,
	IWalletReducerAction,
} from "mele-web-wallet/redux/reducers/wallet-reducer";
import { walletService } from "../../api/wallet-service";
export const walletSaga = function* handleMessage(params: any): SagaIterator {
	yield takeLatest(
		WalletStateActionTypes.GET_WALLET_ADDRESS_REQUEST,
		getWalletAddress,
	);
	yield takeLatest(WalletStateActionTypes.GET_WALLET_REQUEST, getWallet);
};

function* getWalletAddress(action: IWalletReducerAction): SagaIterator {
	try {
		const response = yield call(walletService.getWalletAddress, action);
		return yield put({
			type: WalletStateActionTypes.GET_WALLET_ADDRESS_SUCCESS,
			loadedWalletAddress: response,
		});
	} catch (e) {
		return yield put({
			type: WalletStateActionTypes.GET_WALLET_ADDRESS_ERROR,
			loadedWalletAddress: "",
		});
	}
}

function* getWallet(action: IWalletReducerAction): SagaIterator {
	try {
		const response = yield call(walletService.getWallet, action);
		return yield put({
			type: WalletStateActionTypes.GET_WALLET_SUCCESS,
			loadedWallet: response,
		});
	} catch (e) {
		return yield put({
			type: WalletStateActionTypes.GET_WALLET_ERROR,
			loadedWallet: undefined,
		});
	}
}
