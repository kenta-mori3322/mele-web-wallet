import "./balance-droplet.scss";
import * as React from "react";
import { BaseDroplet } from "mele-web-wallet/app/common/data-droplet/base-droplet/base-droplet";
import { connect } from "react-redux";
import { mapDispatchToProps } from "mele-web-wallet/redux/methods/map-dispatch-to-props";
import ApplicationState from "mele-web-wallet/redux/application-state";
import { LanguageState } from "mele-web-wallet/redux/reducers/language-reducer";
import { StatisticsState } from "mele-web-wallet/redux/reducers/statistics-reducer";
import { MeleCalculator } from "mele-web-wallet/app/common/calculator/mele-calculator";
import { Calculator } from "mele-web-wallet/app/common/calculator/calculator";
import { StandardButton } from "mele-web-wallet/app/common/buttons/standard-button";
import { CalculatorExplanationWindow } from "mele-web-wallet/app/common/calculator/calculator-explanation-window";

interface BalanceDropletProps extends React.HTMLAttributes<HTMLDivElement> {
	languageState: LanguageState;
	cents: string;
}

const languages = {
	en: require("../../../translations/en.json"),
	ar: require("../../../translations/ar.json"),
};

class BalanceDropletComponent extends React.Component<BalanceDropletProps> {
	constructor(props: BalanceDropletProps) {
		super(props);
		this.state = {
			explanationOpen: false,
		};
	}

	render() {
		const isLogged = false;
		let totalUSD = MeleCalculator.centsToUSDFormatted(this.props.cents);
		const localeData = languages[this.props.languageState.currentLanguage];
		return (
			<BaseDroplet {...this.props}>
				<div
					className={isLogged ? "balance-droplet" : "balance-droplet-notlogged"}
				>
					<div className="balance-droplet-title">
						<div className="droplet-subtitle balance-droplet-subtitle">
							${totalUSD}
						</div>
						<CalculatorExplanationWindow
							rootComponent={<div className="notification-icon" />}
						/>
					</div>
					<div className="calculator-container">
						<Calculator
							centsAmount={this.props.cents}
							disableExplanationWindow={true}
							// onExplanationTriggerZoneMouseEnter={() => {
							// 	this.setState({ explanationOpen: true });
							// }}
							// onExplanationTriggerZoneMouseLeave={() => {
							// 	this.setState({ explanationOpen: false });
							// }}
						/>
					</div>
					<div className="purchase-coins-container">
						<StandardButton
							className="purchase-coins-button"
							to={`/${this.props.languageState.currentLanguage}/purchase-coins`}
						>
							{localeData.dashboard.purchaseCoins}
						</StandardButton>
					</div>
				</div>
			</BaseDroplet>
		);
	}
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		languageState: state.language,
	};
};

export const BalanceDroplet = connect(
	mapStateToProps,
	mapDispatchToProps,
)(BalanceDropletComponent);
