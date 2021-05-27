import "./language-selector.scss";
import * as React from "react";
import ApplicationState from "../../../redux/application-state";
import { connect } from "react-redux";
import {
	mapDispatchToProps,
	IActionCreators,
} from "mele-web-wallet/redux/methods/map-dispatch-to-props";

import { withRouter, RouteComponentProps } from "react-router-dom";
import Select from "react-select";
import { LanguageState } from "mele-web-wallet/redux/reducers/language-reducer";
import { MatchProp } from "mele-web-wallet/app/common/utils/match-props/match-prop";
import { PathUtil } from "mele-web-wallet/app/common/utils/path-util/path-util";

interface ILanguageSelectorComponentProps extends RouteComponentProps {
	languageState: LanguageState;
	actionCreators: IActionCreators;
	match: MatchProp<{
		language: number;
	}>;
	className?: string;
}

class LanguageSelectorComponent extends React.Component<
	ILanguageSelectorComponentProps
> {
	constructor(props: ILanguageSelectorComponentProps) {
		super(props);
		this.state = {};
	}

	render() {
		const languages = this.props.languageState.languages;
		const language = languages.find((lang) => {
			return lang.value == this.props.languageState.currentLanguage;
		});

		return (
			<Select
				isSearchable={false}
				classNamePrefix={"language-selector"}
				className={`language-selector ${this.props.className}`}
				value={language}
				onChange={(newLanguage: any) => {
					this.props.history.push(
						PathUtil.GeneratePath(this.props.match.path, {
							...this.props.match.params,
							language: newLanguage!.value,
						}),
					);
				}}
				options={languages}
			/>
		);
	}
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		languageState: state.language,
	};
};

const LanguageSelectorWithRedux = connect(
	mapStateToProps,
	mapDispatchToProps,
)(LanguageSelectorComponent);

export const LanguageSelector = withRouter(LanguageSelectorWithRedux);
