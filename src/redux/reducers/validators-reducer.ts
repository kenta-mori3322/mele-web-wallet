import { IBlockModel } from "./blocks-reducer";

export interface IValidatorModel {
	operator_address: string;
	consensus_pubkey: string;
	jailed: boolean;
	status: number;
	tokens: number;
	delegator_shares: number;
	delegator_address: string;
	uptime: Uptime;
	tokenPercentage: number;
	cumulativeShares: number;
	description: Description;
	unbonding_height: number;
	unbonding_time: string;
	commission: Commission;
	min_self_delegation: number;
	rewards: any;
	blocks: IBlockModel[];
	delegations: [];
}

interface Uptime {
	address: string;
	missed_blocks_count: number;
	total_blocks_count: number;
	uptime: number;
}

interface Commission {
	rate: string;
	maxRate: string;
	maxChangeRate: string;
	amount: string;
	update_time: string;
	commission_rates: CommisionRate;
}

interface CommisionRate {
	rate: string;
	maxRate: string;
	maxChangeRate: string;
}

interface Description {
	moniker: string;
	identity: string;
	website: string;
	securityContact: string;
	details: string;
}

export enum ValidatorsStateActionTypes {
	LOAD_VALIDATORS_REQUEST = "@@BLOCKS/LOAD_VALIDATORS_REQUEST",
	LOAD_VALIDATORS_SUCCESS = "@@BLOCKS/LOAD_VALIDATORS_SUCCESS",
	LOAD_VALIDATORS_ERROR = "@@BLOCKS/LOAD_VALIDATORS_ERROR",
	LOAD_VALIDATOR_REQUEST = "@@BLOCKS/LOAD_VALIDATOR_REQUEST",
	LOAD_VALIDATOR_SUCCESS = "@@BLOCKS/LOAD_VALIDATOR_SUCCESS",
	LOAD_VALIDATOR_ERROR = "@@BLOCKS/LOAD_VALIDATOR_ERROR",
}

export enum LoadValidatorsStatus {
	REQUESTED,
	SUCCESS,
	ERROR,
}

export class ValidatorsState {
	loadedValidators: IValidatorModel[];
	totalCount: number;
	loadedValidator?: IValidatorModel;
	loadValidatorsStatus: LoadValidatorsStatus;
}

export class IValidatorsReducerAction {
	page: number;
	size: number;
	address: string;
	type: ValidatorsStateActionTypes;
	loadedValidators: IValidatorModel[];
	totalCount: number;
	loadedValidator: IValidatorModel;
}

export const initialState: ValidatorsState = new ValidatorsState();

const validatorsReducer = (
	state: ValidatorsState = initialState,
	action: IValidatorsReducerAction,
): ValidatorsState => {
	switch (action.type) {
		case ValidatorsStateActionTypes.LOAD_VALIDATORS_REQUEST:
			return {
				...state,
				loadValidatorsStatus: LoadValidatorsStatus.REQUESTED,
			};
		case ValidatorsStateActionTypes.LOAD_VALIDATORS_SUCCESS:
			return {
				...state,
				loadedValidators: action.loadedValidators,
				totalCount: action.totalCount,
			};
		case ValidatorsStateActionTypes.LOAD_VALIDATORS_ERROR:
			return {
				...state,
				loadValidatorsStatus: LoadValidatorsStatus.ERROR,
				loadedValidators: [],
				totalCount: 0,
			};
		case ValidatorsStateActionTypes.LOAD_VALIDATOR_REQUEST:
			return {
				...state,
			};
		case ValidatorsStateActionTypes.LOAD_VALIDATOR_SUCCESS:
			return {
				...state,
				loadedValidator: action.loadedValidator,
			};
		case ValidatorsStateActionTypes.LOAD_VALIDATOR_ERROR:
			return {
				...state,
				loadedValidator: undefined,
			};
		default:
			return {
				...state,
			};
	}
};

export default validatorsReducer;
