import "./balance-droplet.scss";
import * as React from "react";
import { BaseDroplet } from "mele-web-wallet/app/common/data-droplet/base-droplet/base-droplet";
import { connect } from "react-redux";
import { mapDispatchToProps } from "mele-web-wallet/redux/methods/map-dispatch-to-props";
import ApplicationState from "mele-web-wallet/redux/application-state";
import { LanguageState } from "mele-web-wallet/redux/reducers/language-reducer";
import { MeleCalculator } from "mele-web-wallet/app/common/calculator/mele-calculator";
import { Calculator } from "mele-web-wallet/app/common/calculator/calculator";
import { StandardButton } from "mele-web-wallet/app/common/buttons/standard-button";
import { CalculatorExplanationWindow } from "mele-web-wallet/app/common/calculator/calculator-explanation-window";
import { WalletState } from "./../../../../redux/reducers/wallet-reducer";
import { StaticState } from "mele-web-wallet/redux/reducers/static-reducer";
import { Utils } from "mele-sdk";

interface BalanceDropletProps extends React.HTMLAttributes<HTMLDivElement> {
	languageState: LanguageState;
	walletState: WalletState;
	staticState: StaticState;
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
		const walletAddress = this.props.walletState.loadedWalletAddress;
		const wallet = this.props.walletState.loadedWallet;
		const localeData = languages[this.props.languageState.currentLanguage];
		let meleCoinPrice = "0";
		let priceOfGoldPerGram = "1";
		let melgPerGramOfGold = "1";

		if (this.props.staticState.loaded) {
			meleCoinPrice = this.props.staticState.staticInfo.melecPrice;
			priceOfGoldPerGram = this.props.staticState.staticInfo.priceOfGoldPerGram;
			melgPerGramOfGold = this.props.staticState.staticInfo.melgPerGramOfGold;
		}
		return (
			<BaseDroplet {...this.props}>
				<div
					className={
						walletAddress !== undefined && walletAddress !== ""
							? "balance-droplet"
							: "balance-droplet-notlogged"
					}
				>
					<div className="calculator-container">
						<div className="mele-calculator">
							<div className={"mele-display"}>
								<div className="mele-display-numbers">
									<div className="mele-coins-amount">
										<div className={"coin-count"}>
											{wallet !== undefined &&
											wallet.value.coins[0] !== undefined
												? Utils.fromUmelc(wallet.value.coins[0].amount, "melc")
												: "0"}
										</div>
									</div>
								</div>
								<div className="mele-display-notions">
									<div className="mele-notions">
										<div className={"coin-name mele-coin"}>MELC</div>
										<div className="coin-rate">
											${MeleCalculator.getMelCPrice(meleCoinPrice)}
										</div>
									</div>
								</div>
							</div>

							{this.getMelegoldPart(
								wallet !== undefined && wallet.value.coins[1] !== undefined
									? Utils.fromUmelg(wallet.value.coins[1].amount, "melg")
									: "0",
								melgPerGramOfGold,
								priceOfGoldPerGram,
							)}
						</div>
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

	getMelegoldPart(
		meleGold: string,
		melgPerGramOfGold: string,
		priceOfGoldPerGram: string,
	) {
		return (
			<CalculatorExplanationWindow
				rootComponent={
					<div className={"mele-display"}>
						<div className="mele-display-numbers">
							<div className="mele-coins-amount">
								<div className={"coin-count"}>{meleGold}</div>
							</div>
						</div>
						<div className="mele-display-notions">
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
		walletState: state.wallet,
		staticState: state.static,
	};
};

export const BalanceDroplet = connect(
	mapStateToProps,
	mapDispatchToProps,
)(BalanceDropletComponent);
