import {
	ValidatorsStateActionTypes,
	IValidatorsReducerAction,
} from "../reducers/validators-reducer";
import BaseActionCreator from "./base-action-creator";

export default class BlocksActionCreator extends BaseActionCreator<
	ValidatorsStateActionTypes,
	IValidatorsReducerAction
> {
	searchValidators = async () => {
		this.dispatch({
			type: ValidatorsStateActionTypes.LOAD_VALIDATORS_REQUEST,
		});
	};
	getValidator = async (address: string) => {
		this.dispatch({
			type: ValidatorsStateActionTypes.LOAD_VALIDATOR_REQUEST,
			address: address,
		});
	};
}
