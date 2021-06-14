import "./header-non-authenticated.scss";
import * as React from "react";
import ApplicationState from "../../../redux/application-state";
import { connect } from "react-redux";
import {
	mapDispatchToProps,
	IActionCreators,
} from "mele-web-wallet/redux/methods/map-dispatch-to-props";

import { Location } from "history";
import { withRouter, RouteComponentProps, NavLink } from "react-router-dom";
import { StandardInput } from "mele-web-wallet/app/common/standard-input/standard-input";
import { LanguageState } from "mele-web-wallet/redux/reducers/language-reducer";
import { StandardButton } from "mele-web-wallet/app/common/buttons/standard-button";
import { WalletDroplet } from "../data-droplet/wallet-droplet/wallet-droplet";

interface IHeaderNonAuthenticatedComponentProps extends RouteComponentProps {
	actionCreators: IActionCreators;
	location: Location;
	languageState: LanguageState;
}

const languages = {
	en: require("../../translations/en.json"),
	ar: require("../../translations/ar.json"),
};

class HeaderNonAuthenticatedComponent extends React.Component<
	IHeaderNonAuthenticatedComponentProps
> {
	constructor(props: IHeaderNonAuthenticatedComponentProps) {
		super(props);
	}

	render() {
		const localeData = languages[this.props.languageState.currentLanguage];
		return (
			<div id="header-nonauthenticated">
				<div className="logo-container">
					<div className="logo" />
				</div>
				<div className="widget-container"></div>
				<div className="buttons-container">
					<WalletDroplet />
					<div className="buttons-separator" />
					{/* <StandardButton
						className="send-coins-button"
						to={`/${this.props.languageState.currentLanguage}/home`}
					>
						Send Coins
					</StandardButton> */}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		walletState: state.wallet,
		languageState: state.language,
	};
};

const HeaderAuthenticatedWithRedux = connect(
	mapStateToProps,
	mapDispatchToProps,
)(HeaderNonAuthenticatedComponent);

export const HeaderNonAuthenticated = withRouter(HeaderAuthenticatedWithRedux);
