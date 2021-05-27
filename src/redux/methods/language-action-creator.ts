import {
	LanguageStateActionTypes,
	ILanguageReducerAction,
} from "../reducers/language-reducer";
import BaseActionCreator from "./base-action-creator";

export default class LanguageActionCreator extends BaseActionCreator<
	LanguageStateActionTypes,
	ILanguageReducerAction
> {
	changeLanguage = async (language: "en") => {
		this.dispatch({
			type: LanguageStateActionTypes.CHANGE_LANGUAGE,
			language: language,
		});
	};
}
