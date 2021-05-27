export enum StatisticsStateActionTypes {
	LOAD_STATISTICS_REQUEST = "@@STATISTICS/LOAD_STATISTICS_REQUEST",
	LOAD_STATISTICS_SUCCESS = "@@STATISTICS/LOAD_STATISTICS_SUCCESS",
	LOAD_STATISTICS_ERROR = "@@STATISTICS/LOAD_STATISTICS_ERROR",
	LOAD_DAILY_TRANSACTIONS_REQUEST = "@@STATISTICS/LOAD_DAILY_TRANSACTIONS_REQUEST",
	LOAD_DAILY_TRANSACTIONS_SUCCESS = "@@STATISTICS/LOAD_DAILY_TRANSACTIONS_SUCCESS",
	LOAD_DAILY_TRANSACTIONS_ERROR = "@@STATISTICS/LOAD_DAILY_TRANSACTIONS_ERROR",
}

interface IDailyTransactions {
	count: number;
	amount: number;
	date: string;
}

enum DailyTransactionsLoadStatus {
	NOT_REQUESTED,
	REQUESTED,
	SUCCESS,
	ERROR,
}

interface IStaticInfo {
	melecTarget: number;
	melegTarget: number;
	melecPrice: string;
	priceOfGoldPerGram: string;
	melgPerGramOfGold: string;
	createdAt: string;
}

interface IStatisticsInfoSegment {
	amount: number;
	count: number;
}

interface IStatisticsInfo {
	accounts: number;
	purchased: IStatisticsInfoSegment;
	pending: IStatisticsInfoSegment;
	approved: IStatisticsInfoSegment;
	totalAproved: number;
}

export class StatisticsState {
	statisticsInfo: IStatisticsInfo;
	staticInfo: IStaticInfo;
	loaded: boolean = false;
	dailyTransactions: IDailyTransactions[] = [];
	dailyTransactionsStartDate: string;
	dailyTransactionsEndDate: string;
	dailyTransactionsLoadStatus: DailyTransactionsLoadStatus =
		DailyTransactionsLoadStatus.NOT_REQUESTED;
}
export class IStatisticsReducerAction {
	type: StatisticsStateActionTypes;
	statisticsInfo: any;
	staticInfo: any;
	dailyTransactions: IDailyTransactions[];
	dailyTransactionsStartDate: string;
	dailyTransactionsEndDate: string;
}

export const initialState: StatisticsState = new StatisticsState();

const statisticsReducer = (
	state: StatisticsState = initialState,
	action: IStatisticsReducerAction,
): StatisticsState => {
	switch (action.type) {
		case StatisticsStateActionTypes.LOAD_STATISTICS_SUCCESS:
			return {
				...state,
				statisticsInfo: action.statisticsInfo,
				staticInfo: action.staticInfo,
				loaded: true,
			};
		case StatisticsStateActionTypes.LOAD_STATISTICS_ERROR:
			return {
				...state,
				loaded: false,
			};
		case StatisticsStateActionTypes.LOAD_DAILY_TRANSACTIONS_REQUEST:
			return {
				...state,
				dailyTransactionsStartDate: action.dailyTransactionsStartDate,
				dailyTransactionsEndDate: action.dailyTransactionsEndDate,
				dailyTransactionsLoadStatus: DailyTransactionsLoadStatus.REQUESTED,
				dailyTransactions: [],
			};
		case StatisticsStateActionTypes.LOAD_DAILY_TRANSACTIONS_SUCCESS:
			return {
				...state,
				dailyTransactionsLoadStatus: DailyTransactionsLoadStatus.SUCCESS,
				dailyTransactions: action.dailyTransactions,
			};
		case StatisticsStateActionTypes.LOAD_DAILY_TRANSACTIONS_ERROR:
			return {
				...state,
				dailyTransactionsLoadStatus: DailyTransactionsLoadStatus.ERROR,
				dailyTransactions: [],
			};
		default:
			return {
				...state,
			};
	}
};

export default statisticsReducer;
