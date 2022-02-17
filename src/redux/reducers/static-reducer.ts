import Cookies from "universal-cookie";
const cookies = new Cookies();

export enum StaticStateActionTypes {
	SET_MNEMONIC_AND_PIN = "@@STATIC/SET_MNEMONIC_AND_PIN",
	SET_ACCOUNT_ID = "@@STATIC/SET_ACCOUNT_ID",
	UPDATE__PIN = "@@STATIC/UPDATE__PIN",
	LOAD_STATIC_INFO_REQUEST = "@@Static/LOAD_STATIC_INFO_REQUEST",
	LOAD_STATIC_INFO_SUCCESS = "@@Static/LOAD_STATIC_INFO_SUCCESS",
	LOAD_STATIC_INFO_ERROR = "@@Static/LOAD_STATIC_INFO_ERROR",
	LOAD_STATIC_REQUEST = "@@Static/LOAD_Static_REQUEST",
	LOAD_STATIC_SUCCESS = "@@Static/LOAD_Static_SUCCESS",
	LOAD_STATIC_ERROR = "@@Static/LOAD_Static_ERROR",
}

export interface IStaticReducerAction {
	type: StaticStateActionTypes;
	mnemonic: string;
	pin: string;
	statisticsInfo: any;
	staticInfo: any;
}

interface IStaticInfo {
	melecTarget: number;
	melegTarget: number;
	melecPrice: string;
	priceOfGoldPerGram: string;
	melgPerGramOfGold: string;
	createdAt: string;
}

interface IStaticInfoSegment {
	amount: number;
	count: number;
}

interface IStaticInfo {
	accounts: number;
	purchased: IStaticInfoSegment;
	pending: IStaticInfoSegment;
	approved: IStaticInfoSegment;
}

export class StaticState {
	mnemonic?: string = "";
	pin?: string = "";
	statisticsInfo?: any;
	staticInfo?: any;
	loaded?: boolean = false;
}

export const initialState: StaticState = new StaticState();

const staticReducer = (
	state: StaticState = initialState,
	action: IStaticReducerAction,
): StaticState => {
	switch (action.type) {
		case StaticStateActionTypes.SET_MNEMONIC_AND_PIN:
			cookies.set("pin", btoa(action.pin));
			cookies.set("mnemonic", btoa(action.mnemonic));
			return {
				mnemonic: action.mnemonic,
				pin: action.pin,
			};
		case StaticStateActionTypes.UPDATE__PIN:
			return {
				...state,
				pin: action.pin,
			};
		case StaticStateActionTypes.LOAD_STATIC_SUCCESS:
			return {
				...state,
				statisticsInfo: action.statisticsInfo,
				staticInfo: action.staticInfo,
				loaded: true,
			};
		case StaticStateActionTypes.LOAD_STATIC_ERROR:
			return {
				...state,
				loaded: false,
			};
		case StaticStateActionTypes.LOAD_STATIC_INFO_SUCCESS:
			return {
				...state,
				staticInfo: action.staticInfo,
				loaded: true,
			};
		case StaticStateActionTypes.LOAD_STATIC_INFO_ERROR:
			return {
				...state,
			};
		default:
			return {
				...state,
			};
	}
};

export default staticReducer;
