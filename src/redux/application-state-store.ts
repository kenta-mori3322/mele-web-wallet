import { Reducer, applyMiddleware, compose } from "redux";
import ApplicationState from "./application-state";
import walletReducer from "./reducers/wallet-reducer";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { createStore, combineReducers } from "redux";
import { rootSaga } from "./saga";
import languageReducer from "mele-web-wallet/redux/reducers/language-reducer";
import createReduxWaitForMiddleware from "redux-wait-for-action";
import transactionsReducer from "mele-web-wallet/redux/reducers/transactions-reducer";
import staticReducer from "./reducers/static-reducer";

const WalletPersistConfig = {
	key: "wallet",
	storage: storage,
};

export const reducers: Reducer<ApplicationState> =
	combineReducers<ApplicationState>({
		wallet: persistReducer(WalletPersistConfig, walletReducer) as any,
		language: languageReducer,
		transactions: transactionsReducer,
		static: staticReducer,
	});

export const getApplicationStateStore = () => {
	const sagaMiddleware = createSagaMiddleware();

	const enhancer = compose(
		applyMiddleware(sagaMiddleware),
		applyMiddleware(createReduxWaitForMiddleware()),
	);
	const store = createStore(
		reducers,
		{
			...new ApplicationState(),
		},
		enhancer,
	);

	sagaMiddleware.run(rootSaga, undefined as any);
	let persister = persistStore(store);

	return { store, persister };
};
