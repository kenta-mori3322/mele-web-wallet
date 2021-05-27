import "./send-coins-droplet.scss";
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
import { StandardInput } from "../../standard-input/standard-input";

interface SendCoinsDropletProps extends React.HTMLAttributes<HTMLDivElement> {
	languageState: LanguageState;
}

interface SendCoinsDropletState {
	recipient: string;
}

const languages = {
	en: require("../../../translations/en.json"),
	ar: require("../../../translations/ar.json"),
};

class SendCoinsDropletComponent extends React.Component<
	SendCoinsDropletProps,
	SendCoinsDropletState
> {
	constructor(props: SendCoinsDropletProps) {
		super(props);
		this.state = {
			recipient: "",
		};
	}

	render() {
		const isLogged = false;
		const localeData = languages[this.props.languageState.currentLanguage];
		return (
			<BaseDroplet {...this.props}>
				<div
					className={
						isLogged ? "send-coins-droplet" : "send-coins-droplet-notlogged"
					}
				>
					<div className="input-container">
						<div className="send-coins-label">Send to:</div>
						<div className="send-coins-input-inner-container">
							<div id="walletIcon" />
							<StandardInput
								value={this.state.recipient}
								className="form-field login-field"
								onChange={(e) => this.setState({ recipient: e.target.value })}
								placeholder="Recipient Address"
								maxLength="10"
								type="text"
							/>
						</div>
					</div>
					<div className="button-container">
						<StandardButton className="fee-button">
							{localeData.send.fees}
						</StandardButton>
						<StandardButton className="send-button">
							{localeData.send.send}
						</StandardButton>
						<StandardButton className="reset-button">
							{localeData.send.reset}
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

export const SendCoinsDroplet = connect(
	mapStateToProps,
	mapDispatchToProps,
)(SendCoinsDropletComponent);
