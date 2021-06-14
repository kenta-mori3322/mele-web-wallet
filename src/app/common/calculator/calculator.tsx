import "./calculator.scss";
import * as React from "react";
import { connect } from "react-redux";
import { mapDispatchToProps } from "mele-web-wallet/redux/methods/map-dispatch-to-props";
import ApplicationState from "mele-web-wallet/redux/application-state";
import { LanguageState } from "mele-web-wallet/redux/reducers/language-reducer";
import { StaticState } from "mele-web-wallet/redux/reducers/static-reducer";
import { MeleCalculator } from "mele-web-wallet/app/common/calculator/mele-calculator";
import { CalculatorExplanationWindow } from "./calculator-explanation-window";

interface CalculatorProps {
	centsAmount: string;
	isBlue?: boolean;
	languageState: LanguageState;
	staticState: StaticState;
	disableExplanationWindow?: boolean;
	onExplanationTriggerZoneMouseEnter?: () => void;
	onExplanationTriggerZoneMouseLeave?: () => void;
}

class CalculatorComponent extends React.Component<CalculatorProps> {
	render() {
		let melecUSD = MeleCalculator.CentsToUSDMeleCPortionFormatted(
			this.props.centsAmount || "0",
		);
		let meleCoins = "0";
		let meleCoinPrice = "0";
		let melegUSD = MeleCalculator.CentsToUSDMeleGPortionFormatted(
			this.props.centsAmount || "0",
		);
		let meleGold: any = "0";
		let priceOfGoldPerGram = "1";
		let melgPerGramOfGold = "1";

		if (this.props.staticState.loaded) {
			meleCoinPrice = this.props.staticState.staticInfo.melecPrice;
			meleCoins = MeleCalculator.CentsToMeleCFormatted(
				this.props.centsAmount,
				meleCoinPrice,
			);

			priceOfGoldPerGram = this.props.staticState.staticInfo.priceOfGoldPerGram;
			melgPerGramOfGold = this.props.staticState.staticInfo.melgPerGramOfGold;
			meleGold = MeleCalculator.CentsToMeleGFormatted(
				this.props.centsAmount,
				melgPerGramOfGold,
				priceOfGoldPerGram,
			);
		}

		return (
			<div className="mele-calculator">
				<div
					className={
						this.props.isBlue
							? "mele-display-blue mele-display"
							: "mele-display"
					}
				>
					<div className="mele-display-numbers">
						<div className="mele-coins-amount">
							<div
								className={
									this.props.isBlue ? "white coin-count" : "coin-count"
								}
							>
								{meleCoins}
							</div>
							<div
								className={this.props.isBlue ? "white usd-count" : "usd-count"}
							>
								${melecUSD}
							</div>
						</div>
					</div>
					<div className="mele-display-notions">
						<div className="mele-notions">
							<div
								className={
									this.props.isBlue
										? "coin-name mele-coin white"
										: "coin-name mele-coin"
								}
							>
								MELC
							</div>
							<div className="coin-rate">
								${MeleCalculator.getMelCPrice(meleCoinPrice)}
							</div>
						</div>
					</div>
				</div>

				{this.getMelegoldPart(
					meleGold,
					melegUSD,
					melgPerGramOfGold,
					priceOfGoldPerGram,
				)}
			</div>
		);
	}

	getMelegoldPart(
		meleGold: string,
		melegUSD: string,
		melgPerGramOfGold: string,
		priceOfGoldPerGram: string,
	) {
		return (
			<CalculatorExplanationWindow
				rootComponent={
					<div
						className={
							this.props.isBlue
								? "mele-display-blue mele-display"
								: "mele-display"
						}
					>
						<div className="mele-display-numbers">
							<div className="mele-coins-amount">
								<div
									className={
										this.props.isBlue ? "white coin-count" : "coin-count"
									}
								>
									{meleGold}
								</div>
								<div
									className={
										this.props.isBlue ? "white usd-count" : "usd-count"
									}
								>
									${melegUSD}
								</div>
							</div>
						</div>
						<div
							className="mele-display-notions"
							onMouseEnter={this.props.onExplanationTriggerZoneMouseEnter}
							onMouseLeave={this.props.onExplanationTriggerZoneMouseLeave}
						>
							<div className="notification-icon" />
							<div className="mele-notions">
								<div className="coin-name mele-gold">MELG</div>
								<div className="coin-rate">
									$
									{MeleCalculator.getMelGPrice(
										melgPerGramOfGold,
										priceOfGoldPerGram,
									)}
								</div>
							</div>
						</div>
					</div>
				}
			/>
		);
	}
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		languageState: state.language,
		staticState: state.static,
	};
};

export const Calculator = connect(
	mapStateToProps,
	mapDispatchToProps,
)(CalculatorComponent);
