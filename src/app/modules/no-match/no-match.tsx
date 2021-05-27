import * as React from "react";
import { Redirect } from "react-router";
import {
	mapDispatchToProps,
	IActionCreators,
} from "mele-web-wallet/redux/methods/map-dispatch-to-props";
import ApplicationState from "../../../redux/application-state";
import { connect } from "react-redux";
import { LanguageState } from "mele-web-wallet/redux/reducers/language-reducer";

interface INoMatchProps {
	actionCreators: IActionCreators;
	languageState: LanguageState;
}
class NoMatchComponent extends React.Component<INoMatchProps> {
	render() {
		return (
			<Redirect to={`/${this.props.languageState.currentLanguage}/dashboard`} />
		);
	}
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		languageState: state.language,
	};
};
export const NoMatch = connect(
	mapStateToProps,
	mapDispatchToProps,
)(NoMatchComponent);
