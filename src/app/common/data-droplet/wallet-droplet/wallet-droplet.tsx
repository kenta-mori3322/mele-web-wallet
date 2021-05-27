import "./wallet-droplet.scss";
import * as React from "react";
import { BaseDroplet } from "mele-web-wallet/app/common/data-droplet/base-droplet/base-droplet";
import { connect } from "react-redux";
import { mapDispatchToProps } from "mele-web-wallet/redux/methods/map-dispatch-to-props";
import ApplicationState from "mele-web-wallet/redux/application-state";
import { LanguageState } from "mele-web-wallet/redux/reducers/language-reducer";
import { StandardButton } from "mele-web-wallet/app/common/buttons/standard-button";
import { StandardInput } from "../../standard-input/standard-input";
import { Utils } from "mele-sdk";

interface WalletDropletProps extends React.HTMLAttributes<HTMLDivElement> {
	languageState: LanguageState;
}

interface WalletDropletState {
	mnemonic: string[];
	state: number;
	open: boolean;
	copied: boolean;
	pin: string;
	pinOne: string;
	pinTwo: string;
	pinThree: string;
	pinFour: string;
	pinFive: string;
	pinSix: string;
	recoveryPhrase: string;
}

const languages = {
	en: require("../../../translations/en.json"),
	ar: require("../../../translations/ar.json"),
};

const isLogged = false;

class WalletDropletComponent extends React.Component<
	WalletDropletProps,
	WalletDropletState
> {
	constructor(props: WalletDropletProps) {
		super(props);
		this.state = {
			mnemonic: [],
			state: 0,
			open: false,
			copied: false,
			pin: "",
			pinOne: "",
			pinTwo: "",
			pinThree: "",
			pinFour: "",
			pinFive: "",
			pinSix: "",
			recoveryPhrase: "",
		};
	}

	componentDidMount() {
		if (!isLogged) {
			this.setState({ open: true });
		}
	}

	generateMnemonic = () => {
		return Utils.generateMnemonic().split(" ").slice(0, 12);
	};

	render() {
		const localeData = languages[this.props.languageState.currentLanguage];
		return (
			<BaseDroplet {...this.props} style={{ border: "none" }}>
				{this.state.open ? (
					<>
						<div className="wallet-droplet-opened">
							<div
								className="wallet-container"
								onClick={() =>
									this.setState({ open: false, state: 0, copied: false })
								}
								style={{
									marginTop:
										this.state.state === 1
											? "200%"
											: this.state.state === 3
											? "88%"
											: "82%",
									marginLeft: this.state.state === 2 ? "25%" : "20%",
								}}
							>
								<div id="walletIcon" />
								<div className="text-container">
									<div id="wallet-title">Test</div>
									<div id="wallet-subtitle">asf3fdsad23321...123</div>
								</div>
								<div id="wallet-arrow" />
							</div>
							{!isLogged && this.state.state === 0 && (
								<div id="wallet-creation-container">
									<div id="wallet-creation-title">
										{localeData.wallet.creationTitle}
									</div>
									<div id="wallet-creation-subtitle">
										{localeData.wallet.creationSubTitle}
									</div>
									<div id="wallet-creation-buttons-container">
										<div
											id="wallet-creation-button-create"
											onClick={() => this.setState({ state: 1 })}
										>
											<div id="createIcon" />
											<div id="create-text">
												{localeData.wallet.createButton}
											</div>
										</div>
										<div
											id="wallet-creation-button-import"
											onClick={() => this.setState({ state: 3 })}
										>
											<div id="importIcon" />
											<div id="import-text">
												{localeData.wallet.importButton}
											</div>
										</div>
									</div>
								</div>
							)}
							{!isLogged && this.state.state === 1 && (
								<div id="wallet-creation-container">
									<div id="wallet-creation-title">
										{localeData.wallet.creationTitleTwo}
									</div>
									<div id="wallet-creation-subtitle">
										{localeData.wallet.creationSubtitleTwo}
									</div>
									<div id="wallet-creation-mnemonic-container">
										<div
											className="mnemonic-cell"
											style={{ gridColumn: 1, gridRow: 1 }}
										>
											1 switch
										</div>
										<div
											className="mnemonic-cell"
											style={{ gridColumn: 2, gridRow: 1 }}
										>
											12 switch
										</div>
										<div
											className="mnemonic-cell"
											style={{ gridColumn: 1, gridRow: 2 }}
										>
											2 switch
										</div>
										<div
											className="mnemonic-cell"
											style={{ gridColumn: 2, gridRow: 2 }}
										>
											14 switch
										</div>
										<div
											className="mnemonic-cell"
											style={{ gridColumn: 1, gridRow: 3 }}
										>
											3 switch
										</div>
										<div
											className="mnemonic-cell"
											style={{ gridColumn: 2, gridRow: 3 }}
										>
											15 switch
										</div>
										<div
											className="mnemonic-cell"
											style={{ gridColumn: 1, gridRow: 4 }}
										>
											4 switch
										</div>
										<div
											className="mnemonic-cell"
											style={{ gridColumn: 2, gridRow: 4 }}
										>
											16 switch
										</div>
										<div
											className="mnemonic-cell"
											style={{ gridColumn: 1, gridRow: 5 }}
										>
											5 switch
										</div>
										<div
											className="mnemonic-cell"
											style={{ gridColumn: 2, gridRow: 5 }}
										>
											17 switch
										</div>
										<div
											className="mnemonic-cell"
											style={{ gridColumn: 1, gridRow: 6 }}
										>
											6 switch
										</div>
										<div
											className="mnemonic-cell"
											style={{ gridColumn: 2, gridRow: 6 }}
										>
											18 switch
										</div>
										<div
											className="mnemonic-cell"
											style={{ gridColumn: 1, gridRow: 7 }}
										>
											7 switch
										</div>
										<div
											className="mnemonic-cell"
											style={{ gridColumn: 2, gridRow: 7 }}
										>
											19 switch
										</div>
										<div
											className="mnemonic-cell"
											style={{ gridColumn: 1, gridRow: 8 }}
										>
											8 switch
										</div>
										<div
											className="mnemonic-cell"
											style={{ gridColumn: 2, gridRow: 8 }}
										>
											20 switch
										</div>
										<div
											className="mnemonic-cell"
											style={{ gridColumn: 1, gridRow: 9 }}
										>
											9 switch
										</div>
										<div
											className="mnemonic-cell"
											style={{ gridColumn: 2, gridRow: 9 }}
										>
											21 switch
										</div>
										<div
											className="mnemonic-cell"
											style={{ gridColumn: 1, gridRow: 10 }}
										>
											10 switch
										</div>
										<div
											className="mnemonic-cell"
											style={{ gridColumn: 2, gridRow: 10 }}
										>
											22 switch
										</div>
										<div
											className="mnemonic-cell"
											style={{ gridColumn: 1, gridRow: 11 }}
										>
											11 switch
										</div>
										<div
											className="mnemonic-cell"
											style={{ gridColumn: 2, gridRow: 11 }}
										>
											23 switch
										</div>
										<div
											className="mnemonic-cell"
											style={{ gridColumn: 1, gridRow: 12 }}
										>
											12 switch
										</div>
										<div
											className="mnemonic-cell"
											style={{ gridColumn: 2, gridRow: 12 }}
										>
											24 switch
										</div>
									</div>
									<StandardButton
										id={this.state.copied ? "copiedButton" : "copyButton"}
										onClick={() => {
											navigator.clipboard.writeText(
												JSON.stringify(this.state.mnemonic),
											);
											this.setState({ copied: true });
										}}
									>
										{this.state.copied
											? localeData.wallet.copied
											: localeData.wallet.copy}
									</StandardButton>
									<StandardButton
										id="savedButton"
										onClick={() => this.setState({ copied: false, state: 2 })}
									>
										{localeData.wallet.savedIt}
									</StandardButton>
								</div>
							)}
							{!isLogged && this.state.state === 2 && (
								<div id="wallet-pin-container">
									<div id="wallet-pin-title">{localeData.wallet.choosePIN}</div>
									<div id="wallet-pin-subtitle">
										{localeData.wallet.choosePINDesc}
									</div>
									<div id="pinContainer">
										<StandardInput
											value={this.state.pinOne}
											className="form-field login-field"
											onChange={(e) =>
												this.setState({ pinOne: e.target.value })
											}
											maxLength="1"
											type="text"
											id="pinOne"
										/>
										<StandardInput
											value={this.state.pinTwo}
											className="form-field login-field"
											onChange={(e) =>
												this.setState({ pinTwo: e.target.value })
											}
											maxLength="1"
											type="text"
											id="pinTwo"
										/>
										<StandardInput
											value={this.state.pinThree}
											className="form-field login-field"
											onChange={(e) =>
												this.setState({ pinThree: e.target.value })
											}
											maxLength="1"
											type="text"
											id="pinThree"
										/>
										<StandardInput
											value={this.state.pinFour}
											className="form-field login-field"
											onChange={(e) =>
												this.setState({ pinFour: e.target.value })
											}
											maxLength="1"
											type="text"
											id="pinFour"
										/>
										<StandardInput
											value={this.state.pinFive}
											className="form-field login-field"
											onChange={(e) =>
												this.setState({ pinFive: e.target.value })
											}
											maxLength="1"
											type="text"
											id="pinFive"
										/>
										<StandardInput
											value={this.state.pinSix}
											className="form-field login-field"
											onChange={(e) =>
												this.setState({ pinSix: e.target.value })
											}
											maxLength="1"
											type="text"
											id="pinSix"
										/>
									</div>
									<StandardButton
										id="finishButton"
										onClick={() => this.setState({ state: 0, open: false })}
									>
										{localeData.wallet.finish}
									</StandardButton>
								</div>
							)}
							{!isLogged && this.state.state === 3 && (
								<div id="wallet-creation-container">
									<div id="wallet-creation-title">
										{localeData.wallet.importTitle}
									</div>
									<div id="wallet-creation-subtitle">
										{localeData.wallet.importSubtitle}
									</div>
									<StandardInput
										value={this.state.recoveryPhrase}
										className="form-field recoveryContainer"
										placeholder={localeData.wallet.importPlaceholder}
										onChange={(e) =>
											this.setState({ recoveryPhrase: e.target.value })
										}
										maxLength="50"
										type="text"
									/>
									<StandardButton
										id="importButton"
										onClick={() => this.setState({ state: 0, open: false })}
									>
										{localeData.wallet.import}
									</StandardButton>
								</div>
							)}
						</div>
					</>
				) : (
					<div className="wallet-droplet">
						<div
							className="wallet-container"
							onClick={() => this.setState({ open: true })}
						>
							<div id="walletIcon" />
							<div className="text-container">
								<div id="wallet-title">Test</div>
								<div id="wallet-subtitle">asf3fdsad23321...123</div>
							</div>
							<div id="wallet-arrow" />
						</div>
					</div>
				)}
			</BaseDroplet>
		);
	}
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		languageState: state.language,
	};
};

export const WalletDroplet = connect(
	mapStateToProps,
	mapDispatchToProps,
)(WalletDropletComponent);
