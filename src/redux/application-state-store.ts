import { Reducer, applyMiddleware, compose } from "redux";
import ApplicationState from "./application-state";
import accountReducer from "./reducers/account-reducer";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { createStore, combineReducers } from "redux";
import { rootSaga } from "./saga";
import languageReducer from "mele-web-wallet/redux/reducers/language-reducer";
import createReduxWaitForMiddleware from "redux-wait-for-action";
import transactionsReducer from "mele-web-wallet/redux/reducers/transactions-reducer";
import blocksReducer from "./reducers/blocks-reducer";
import statisticsReducer from "./reducers/statistics-reducer";
import validatorsReducer from "./reducers/validators-reducer";

const AccountPersistConfig = {
	key: "account",
	storage: storage,
	whitelist: ["account"],
};

export const reducers: Reducer<ApplicationState> = combineReducers<
	ApplicationState
>({
	account: persistReducer(AccountPersistConfig, accountReducer) as any,
	language: languageReducer,
	transactions: transactionsReducer,
	blocks: blocksReducer,
	statistics: statisticsReducer,
	validators: validatorsReducer,
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
