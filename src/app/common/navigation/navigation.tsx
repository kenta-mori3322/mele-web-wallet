import "./navigation.scss";
import * as React from "react";
import ApplicationState from "mele-web-wallet/redux/application-state";
import { connect } from "react-redux";
import {
	mapDispatchToProps,
	IActionCreators,
} from "mele-web-wallet/redux/methods/map-dispatch-to-props";
import { Location } from "history";
import { withRouter, RouteComponentProps, NavLink } from "react-router-dom";
import { LanguageState } from "mele-web-wallet/redux/reducers/language-reducer";
import { NavigationButton } from "mele-web-wallet/app/common/navigation/navigation-button";
import classNames from "classnames";
import { useHistory } from "react-router-dom";
import { WalletState } from "./../../../redux/reducers/wallet-reducer";

interface INavigationComponentProps extends RouteComponentProps {
	actionCreators: IActionCreators;
	location: Location;
	languageState: LanguageState;
	activeButton: string;
	walletState: WalletState;
}

const languages = {
	en: require("../../translations/en.json"),
	ar: require("../../translations/ar.json"),
};

class NavigationComponent extends React.Component<INavigationComponentProps> {
	constructor(props: INavigationComponentProps) {
		super(props);
	}

	render() {
		const localeData = languages[this.props.languageState.currentLanguage];
		const wallet = this.props.walletState.loadedWalletAddress;
		return (
			<div id="navigation">
				<div className="top-button-container">
					<NavigationButton
						buttonIconClass={classNames("button-icon", "icon-home", {
							selected: this.props.activeButton == "dashboard",
						})}
						to={`/${this.props.languageState.currentLanguage}/dashboard`}
					/>
					{wallet === undefined || wallet === "" ? (
						<NavigationButton
							buttonIconClass={classNames("button-icon", "icon-transactions", {
								selected: this.props.activeButton == "transactions",
								disabled: wallet === undefined || wallet === "",
							})}
						/>
					) : (
						<NavigationButton
							buttonIconClass={classNames("button-icon", "icon-transactions", {
								selected: this.props.activeButton == "transactions",
								disabled: wallet === undefined || wallet === "",
							})}
							to={`/${this.props.languageState.currentLanguage}/transactions`}
						/>
					)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		languageState: state.language,
		walletState: state.wallet,
	};
};

const NavigationWithRedux = connect(
	mapStateToProps,
	mapDispatchToProps,
)(NavigationComponent);

export const Navigation = withRouter(NavigationWithRedux);
