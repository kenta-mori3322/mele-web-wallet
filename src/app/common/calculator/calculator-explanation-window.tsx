import "./calculator-explanation-window.scss";
import * as React from "react";
import { connect } from "react-redux";
import { mapDispatchToProps } from "mele-web-wallet/redux/methods/map-dispatch-to-props";
import ApplicationState from "mele-web-wallet/redux/application-state";
import { LanguageState } from "mele-web-wallet/redux/reducers/language-reducer";
import Popup from "reactjs-popup";

interface CalculatorExplanationWindowProps {
	open?: boolean;
	languageState: LanguageState;
	onClose?: () => void;
	rootComponent: any;
}

const languages = {
	en: require("../../translations/en.json"),
	ar: require("../../translations/ar.json"),
};

class CalculatorExplanationWindowComponent extends React.Component<CalculatorExplanationWindowProps> {
	render() {
		const localeData = languages[this.props.languageState.currentLanguage];
		return (
			<Popup
				on={"hover"}
				trigger={this.props.rootComponent}
				contentStyle={{
					height: 333,
					width: 383,
				}}
				open={this.props.open}
				onClose={this.props.onClose}
				position={["top center", "bottom center"]}
				className="calculator-explanation-window" //the library adds "-content" to this class so don't remove it from the scss file
			>
				<div className="explanation-window-content">
					<div className="explanation-window-title">
						<div className="explanation-window-title-text">
							{localeData.calculator.title}
						</div>
						<div className="explanation-window-title-icon" />
					</div>
					<div className="explanation-window-text">
						{localeData.calculator.description}
					</div>
				</div>
			</Popup>
		);
	}
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		languageState: state.language,
	};
};

export const CalculatorExplanationWindow = connect(
	mapStateToProps,
	mapDispatchToProps,
)(CalculatorExplanationWindowComponent);
