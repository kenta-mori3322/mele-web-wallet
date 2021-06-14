import {
	StaticStateActionTypes,
	IStaticReducerAction,
} from "../reducers/static-reducer";
import BaseActionCreator from "./base-action-creator";

export default class StaticActionCreator extends BaseActionCreator<
	StaticStateActionTypes,
	IStaticReducerAction
> {
	setMnemonicAndPin = async (mnemonic: string, pin: string) => {
		this.dispatch({
			type: StaticStateActionTypes.SET_MNEMONIC_AND_PIN,
			mnemonic: mnemonic,
			pin: pin,
		});
	};
	updatePin = async (pin: string) => {
		this.dispatch({
			type: StaticStateActionTypes.UPDATE__PIN,
			pin: pin,
		});
	};
	searchStatistics = async () => {
		this.dispatch({
			type: StaticStateActionTypes.LOAD_STATIC_REQUEST,
		});
	};
	searchStaticInfo = async () => {
		this.dispatch({
			type: StaticStateActionTypes.LOAD_STATIC_INFO_REQUEST,
		});
	};
}
