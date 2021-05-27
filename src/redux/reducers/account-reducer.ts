import { Reducer, Action } from "redux";

export interface IAccountModel {
	type: string;
	value:
		| AccountDetail
		| ContinuousVestingAccount
		| DelayedVestingAccount
		| PeriodicVestingAccount;
}

export interface AccountDetail {
	address: string;
	coins: SDKCoin[];
	public_key: PubKey;
	account_number: number;
	sequence: number;
}

export interface SDKCoin {
	denom: string;
	amount: number;
}

export interface PubKey {
	type: string;
	value: string;
}

export interface ContinuousVestingAccount {
	BaseVestingAccount: BaseVestingAccount;
	start_time: string;
}

export interface DelayedVestingAccount {
	BaseVestingAccount: BaseVestingAccount;
}

export interface Period {
	length: number;
	amount: SDKCoin[];
}

export interface PeriodicVestingAccount {
	BaseVestingAccount: BaseVestingAccount;
	vesting_periods: Period[];
}

export interface BaseVestingAccount {
	BaseAccount: AccountDetail;
	original_vesting: SDKCoin[];
	delegated_free: SDKCoin[];
	delegated_vesting: SDKCoin[];
	end_time: string;
}

export enum AccountStateActionTypes {
	GET_ACCOUNT_REQUEST = "@@ACCOUNT/GET_ACCOUNT_REQUEST",
	GET_ACCOUNT_SUCCESS = "@@ACCOUNT/GET_ACCOUNT_SUCCESS",
	GET_ACCOUNT_ERROR = "@@ACCOUNT/GET_ACCOUNT_ERROR",
}

export enum LoadAccountsStatus {
	REQUESTED,
	SUCCESS,
	ERROR,
	GENERATED_Accounts_REQUESTED,
}

export class AccountsState {
	loadedAccount?: IAccountModel;
	loadAccountsStatus: LoadAccountsStatus;
}

export class IAccountsReducerAction {
	address: string;
	type: AccountStateActionTypes;
	loadedAccount: IAccountModel;
}

export const initialState: AccountsState = new AccountsState();

const accountsReducer = (
	state: AccountsState = initialState,
	action: IAccountsReducerAction,
): AccountsState => {
	switch (action.type) {
		case AccountStateActionTypes.GET_ACCOUNT_REQUEST:
			return {
				...state,
				loadAccountsStatus: LoadAccountsStatus.REQUESTED,
			};
		case AccountStateActionTypes.GET_ACCOUNT_SUCCESS:
			return {
				...state,
				loadedAccount: action.loadedAccount,
			};
		case AccountStateActionTypes.GET_ACCOUNT_ERROR:
			return {
				...state,
				loadAccountsStatus: LoadAccountsStatus.ERROR,
				loadedAccount: undefined,
			};
		default:
			return {
				...state,
			};
	}
};

export default accountsReducer;
