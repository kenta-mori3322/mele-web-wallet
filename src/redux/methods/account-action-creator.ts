import {
	AccountStateActionTypes,
	IAccountsReducerAction,
} from "../reducers/account-reducer";
import BaseActionCreator from "./base-action-creator";

export default class AccountActionCreator extends BaseActionCreator<
	AccountStateActionTypes,
	IAccountsReducerAction
> {
	getAccount = async (address: string) => {
		this.dispatch({
			type: AccountStateActionTypes.GET_ACCOUNT_REQUEST,
			address: address,
		});
	};
}
