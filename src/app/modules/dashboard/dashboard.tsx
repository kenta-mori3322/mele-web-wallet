import * as React from "react";
import "./dashboard.scss";
import ApplicationState from "mele-web-wallet/redux/application-state";
import { connect } from "react-redux";
import {
	mapDispatchToProps,
	IActionCreators,
} from "mele-web-wallet/redux/methods/map-dispatch-to-props";

import { Location, History } from "history";
import { MatchProp } from "mele-web-wallet/app/common/utils/match-props/match-prop";
import { LanguageState } from "mele-web-wallet/redux/reducers/language-reducer";
import { TransactionsDroplet } from "mele-web-wallet/app/common/data-droplet/transactions-droplet/transactions-droplet";
import { BalanceDroplet } from "mele-web-wallet/app/common/data-droplet/balance-droplet/balance-droplet";
import { localeData } from "moment";
import { SendCoinsDroplet } from "./../../common/data-droplet/send-coins-droplet/send-coins-droplet";

interface IDashboardProps {
	location: Location;
	history: History;
	actionCreators: IActionCreators;
	languageState: LanguageState;
	match: MatchProp<{
		language: string;
	}>;
}

const languages = {
	en: require("../../translations/en.json"),
	ar: require("../../translations/ar.json"),
};

class DashboardComponent extends React.Component<IDashboardProps> {
	render() {
		const localeData = languages[this.props.languageState.currentLanguage];
		return (
			<div id="dashboard-module">
				<div className="dashboard-content">
					<div className="top-columns-titles">
						<div id="sendCoinsCol">
							<div id="dashboard-sendCoinsTitle">
								{localeData.dashboard.send}
							</div>
							<div id="dashboard-sendCoinsSubTitle">
								{localeData.dashboard.sendText}
							</div>
						</div>
						<div id="balanceCol">
							<div id="dashboard-balanceTitle">
								{localeData.dashboard.balance}
							</div>
							<div id="dashboard-balanceSubTitle">
								{localeData.dashboard.balance}
							</div>
						</div>
					</div>
					<div className="top-columns">
						<div className="left-column">
							<SendCoinsDroplet />
						</div>
						<div className="right-column">
							<BalanceDroplet />
						</div>
					</div>
					<div id="dashboard-transationsTitle">
						{localeData.transactions.recent}
					</div>
					<div id="dashboard-transationsSubTitle">
						{localeData.transactions.recentText}
					</div>
					<div className="bottom-column">
						<TransactionsDroplet />
					</div>
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

export const Dashboard = connect(
	mapStateToProps,
	mapDispatchToProps,
)(DashboardComponent);
