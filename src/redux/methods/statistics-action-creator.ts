import BaseActionCreator from "./base-action-creator";
import {
	StatisticsStateActionTypes,
	IStatisticsReducerAction,
} from "mele-web-wallet/redux/reducers/statistics-reducer";

export default class StatisticsActionCreator extends BaseActionCreator<
	StatisticsStateActionTypes,
	IStatisticsReducerAction
> {
	searchStatistics = async () => {
		this.dispatch({
			type: StatisticsStateActionTypes.LOAD_STATISTICS_REQUEST,
		});
	};
	searchDailyTransactions = async (startDate: string, endDate: string) => {
		this.dispatch({
			type: StatisticsStateActionTypes.LOAD_DAILY_TRANSACTIONS_REQUEST,
			dailyTransactionsEndDate: endDate,
			dailyTransactionsStartDate: startDate,
		});
	};
}
