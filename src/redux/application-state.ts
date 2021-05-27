import { AccountsState } from "./reducers/account-reducer";
import { LanguageState } from "./reducers/language-reducer";
import { TransactionsState } from "./reducers/transactions-reducer";
import { BlocksState } from "./reducers/blocks-reducer";
import { StatisticsState } from "./reducers/statistics-reducer";
import { ValidatorsState } from "./reducers/validators-reducer";

export default class ApplicationState {
	account: AccountsState = new AccountsState();
	language: LanguageState = new LanguageState();
	transactions: TransactionsState = new TransactionsState();
	blocks: BlocksState = new BlocksState();
	statistics: StatisticsState = new StatisticsState();
	validators: ValidatorsState = new ValidatorsState();
}
