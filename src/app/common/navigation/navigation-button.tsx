import "./navigation-button.scss";
import * as React from "react";
import ApplicationState from "mele-web-wallet/redux/application-state";
import { connect } from "react-redux";
import {
	mapDispatchToProps,
	IActionCreators,
} from "mele-web-wallet/redux/methods/map-dispatch-to-props";
import { Location } from "history";
import { RouteComponentProps, NavLink, withRouter } from "react-router-dom";
import { LanguageState } from "mele-web-wallet/redux/reducers/language-reducer";

interface INavigationButtonComponentProps extends RouteComponentProps {
	location: Location;
	languageState: LanguageState;
	buttonIconClass: string;
	onClick?: () => any;
	to?: string;
}

class NavigationComponent extends React.Component<
	INavigationButtonComponentProps
> {
	constructor(props: INavigationButtonComponentProps) {
		super(props);
	}

	render() {
		if (this.props.to) {
			return (
				<NavLink className="navigation-button" to={this.props.to}>
					<div className="button-icon-container">
						<div className={this.props.buttonIconClass} />
					</div>
				</NavLink>
			);
		}

		return (
			<div className="navigation-button" onClick={this.props.onClick}>
				<div className="button-icon-container">
					<div className={this.props.buttonIconClass} />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		languageState: state.language,
	};
};

const NavigationButtonWithRedux = connect(
	mapStateToProps,
	mapDispatchToProps,
)(NavigationComponent);

export const NavigationButton = withRouter(NavigationButtonWithRedux);
