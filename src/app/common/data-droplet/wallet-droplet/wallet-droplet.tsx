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
	setPINError: boolean;
	pinOneConfirm: string;
	pinTwoConfirm: string;
	pinThreeConfirm: string;
	pinFourConfirm: string;
	pinFiveConfirm: string;
	pinSixConfirm: string;
	confirmError: boolean;
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
			setPINError: false,
			pinOneConfirm: "",
			pinTwoConfirm: "",
			pinThreeConfirm: "",
			pinFourConfirm: "",
			pinFiveConfirm: "",
			pinSixConfirm: "",
			confirmError: false,
			recoveryPhrase: "",
		};
	}

	componentDidMount() {
		if (!isLogged) {
			this.setState({ open: true });
			this.setState({ mnemonic: this.generateMnemonic() });
		}
	}

	generateMnemonic = () => {
		return Utils.generateMnemonic().split(" ").slice(0, 12);
	};

	setPIN = () => {
		if (
			this.state.pinOne !== "" &&
			this.state.pinTwo !== "" &&
			this.state.pinThree !== "" &&
			this.state.pinFour !== "" &&
			this.state.pinFive !== "" &&
			this.state.pinSix !== ""
		) {
			this.setState({
				pin: `${this.state.pinOne},${this.state.pinTwo},${this.state.pinThree},${this.state.pinFour},${this.state.pinFive},${this.state.pinSix}`,
				state: 3,
				setPINError: false,
			});
		} else {
			this.setState({ setPINError: true });
		}
	};

	checkPIN = () => {
		const pin = `${this.state.pinOneConfirm},${this.state.pinTwoConfirm},${this.state.pinThreeConfirm},${this.state.pinFourConfirm},${this.state.pinFiveConfirm},${this.state.pinSixConfirm}`;
		if (this.state.pin === pin) {
			this.setState({ state: 0, open: false, confirmError: false });
		} else {
			this.setState({ confirmError: true });
		}
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
									this.setState({
										open: false,
										state: 0,
										copied: false,
										confirmError: false,
										setPINError: false,
									})
								}
								style={{
									marginTop:
										this.state.state === 1
											? "162%"
											: this.state.state === 4
											? "88%"
											: this.state.state === 2 && this.state.setPINError
											? "75%"
											: this.state.state === 3 && this.state.confirmError
											? "75%"
											: this.state.state === 3 && !this.state.confirmError
											? "68%"
											: "82%",
									marginLeft:
										this.state.state === 2 && !this.state.setPINError
											? "25%"
											: this.state.state === 2 && this.state.setPINError
											? "25%"
											: this.state.state === 3
											? "25%"
											: "20%",
								}}
							>
								<div id="walletIcon" />
								<div className="text-container">
									<div id="wallet-title">
										{!isLogged ? "No Wallet" : "Test"}
									</div>
									<div id="wallet-subtitle">
										{!isLogged
											? "Create/Import your Wallet"
											: "asf3fdsad23321...123"}
									</div>
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
											onClick={() => this.setState({ state: 4 })}
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
											1 {this.state.mnemonic[0]}
										</div>
										<div
											className="mnemonic-cell"
											style={{ gridColumn: 2, gridRow: 1 }}
										>
											7 {this.state.mnemonic[6]}
										</div>
										<div
											className="mnemonic-cell"
											style={{ gridColumn: 1, gridRow: 2 }}
										>
											2 {this.state.mnemonic[1]}
										</div>
										<div
											className="mnemonic-cell"
											style={{ gridColumn: 2, gridRow: 2 }}
										>
											8 {this.state.mnemonic[7]}
										</div>
										<div
											className="mnemonic-cell"
											style={{ gridColumn: 1, gridRow: 3 }}
										>
											3 {this.state.mnemonic[2]}
										</div>
										<div
											className="mnemonic-cell"
											style={{ gridColumn: 2, gridRow: 3 }}
										>
											9 {this.state.mnemonic[8]}
										</div>
										<div
											className="mnemonic-cell"
											style={{ gridColumn: 1, gridRow: 4 }}
										>
											4 {this.state.mnemonic[3]}
										</div>
										<div
											className="mnemonic-cell"
											style={{ gridColumn: 2, gridRow: 4 }}
										>
											10 {this.state.mnemonic[9]}
										</div>
										<div
											className="mnemonic-cell"
											style={{ gridColumn: 1, gridRow: 5 }}
										>
											5 {this.state.mnemonic[4]}
										</div>
										<div
											className="mnemonic-cell"
											style={{ gridColumn: 2, gridRow: 5 }}
										>
											11 {this.state.mnemonic[10]}
										</div>
										<div
											className="mnemonic-cell"
											style={{ gridColumn: 1, gridRow: 6 }}
										>
											6 {this.state.mnemonic[5]}
										</div>
										<div
											className="mnemonic-cell"
											style={{ gridColumn: 2, gridRow: 6 }}
										>
											12 {this.state.mnemonic[11]}
										</div>
									</div>
									<StandardButton
										id={this.state.copied ? "copiedButton" : "copyButton"}
										onClick={() => {
											navigator.clipboard.writeText(
												JSON.stringify(this.state.mnemonic)
													.replace(/[\[\]']+/g, "")
													.replace(/['"]+/g, ""),
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
									<div
										id={
											this.state.setPINError
												? "wallet-pin-subtitle-error"
												: "wallet-pin-subtitle"
										}
									>
										{this.state.setPINError
											? localeData.wallet.choosePINError
											: localeData.wallet.choosePINDesc}
									</div>
									<div id="pinContainer">
										<StandardInput
											value={this.state.pinOne}
											className="form-field login-field"
											onChange={(e) => {
												const reg = new RegExp("^[0-9]+$");

												if (reg.test(e.target.value) || e.target.value == "") {
													this.setState({ pinOne: e.target.value });
												}
											}}
											maxLength="1"
											type="text"
											id="pinOne"
										/>
										<StandardInput
											value={this.state.pinTwo}
											className="form-field login-field"
											onChange={(e) => {
												const reg = new RegExp("^[0-9]+$");

												if (reg.test(e.target.value) || e.target.value == "") {
													this.setState({ pinTwo: e.target.value });
												}
											}}
											maxLength="1"
											type="text"
											id="pinTwo"
										/>
										<StandardInput
											value={this.state.pinThree}
											className="form-field login-field"
											onChange={(e) => {
												const reg = new RegExp("^[0-9]+$");

												if (reg.test(e.target.value) || e.target.value == "") {
													this.setState({ pinThree: e.target.value });
												}
											}}
											maxLength="1"
											type="text"
											id="pinThree"
										/>
										<StandardInput
											value={this.state.pinFour}
											className="form-field login-field"
											onChange={(e) => {
												const reg = new RegExp("^[0-9]+$");

												if (reg.test(e.target.value) || e.target.value == "") {
													this.setState({ pinFour: e.target.value });
												}
											}}
											maxLength="1"
											type="text"
											id="pinFour"
										/>
										<StandardInput
											value={this.state.pinFive}
											className="form-field login-field"
											onChange={(e) => {
												const reg = new RegExp("^[0-9]+$");

												if (reg.test(e.target.value) || e.target.value == "") {
													this.setState({ pinFive: e.target.value });
												}
											}}
											maxLength="1"
											type="text"
											id="pinFive"
										/>
										<StandardInput
											value={this.state.pinSix}
											className="form-field login-field"
											onChange={(e) => {
												const reg = new RegExp("^[0-9]+$");

												if (reg.test(e.target.value) || e.target.value == "") {
													this.setState({ pinSix: e.target.value });
												}
											}}
											maxLength="1"
											type="text"
											id="pinSix"
										/>
									</div>
									<StandardButton
										id="finishButton"
										onClick={() => this.setPIN()}
									>
										{localeData.wallet.continue}
									</StandardButton>
								</div>
							)}
							{!isLogged && this.state.state === 3 && (
								<div id="wallet-pin-container">
									<div id="wallet-pin-title">
										{localeData.wallet.confirmPIN}
									</div>
									<div id="wallet-pin-subtitle-error">
										{this.state.confirmError &&
											localeData.wallet.choosePINError}
									</div>
									<div id="pinContainer">
										<StandardInput
											value={this.state.pinOneConfirm}
											className="form-field login-field"
											onChange={(e) => {
												const reg = new RegExp("^[0-9]+$");

												if (reg.test(e.target.value) || e.target.value == "") {
													this.setState({ pinOneConfirm: e.target.value });
												}
											}}
											maxLength="1"
											type="text"
											id="pinOne"
										/>
										<StandardInput
											value={this.state.pinTwoConfirm}
											className="form-field login-field"
											onChange={(e) => {
												const reg = new RegExp("^[0-9]+$");

												if (reg.test(e.target.value) || e.target.value == "") {
													this.setState({ pinTwoConfirm: e.target.value });
												}
											}}
											maxLength="1"
											type="text"
											id="pinTwo"
										/>
										<StandardInput
											value={this.state.pinThreeConfirm}
											className="form-field login-field"
											onChange={(e) => {
												const reg = new RegExp("^[0-9]+$");

												if (reg.test(e.target.value) || e.target.value == "") {
													this.setState({ pinThreeConfirm: e.target.value });
												}
											}}
											maxLength="1"
											type="text"
											id="pinThree"
										/>
										<StandardInput
											value={this.state.pinFourConfirm}
											className="form-field login-field"
											onChange={(e) => {
												const reg = new RegExp("^[0-9]+$");

												if (reg.test(e.target.value) || e.target.value == "") {
													this.setState({ pinFourConfirm: e.target.value });
												}
											}}
											maxLength="1"
											type="text"
											id="pinFour"
										/>
										<StandardInput
											value={this.state.pinFiveConfirm}
											className="form-field login-field"
											onChange={(e) => {
												const reg = new RegExp("^[0-9]+$");

												if (reg.test(e.target.value) || e.target.value == "") {
													this.setState({ pinFiveConfirm: e.target.value });
												}
											}}
											maxLength="1"
											type="text"
											id="pinFive"
										/>
										<StandardInput
											value={this.state.pinSixConfirm}
											className="form-field login-field"
											onChange={(e) => {
												const reg = new RegExp("^[0-9]+$");

												if (reg.test(e.target.value) || e.target.value == "") {
													this.setState({ pinSixConfirm: e.target.value });
												}
											}}
											maxLength="1"
											type="text"
											id="pinSix"
										/>
									</div>
									<StandardButton
										id="finishButton"
										onClick={() => this.checkPIN()}
									>
										{localeData.wallet.finish}
									</StandardButton>
								</div>
							)}
							{!isLogged && this.state.state === 4 && (
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
								<div id="wallet-title">{!isLogged ? "No Wallet" : "Test"}</div>
								<div id="wallet-subtitle">
									{!isLogged
										? "Create/Import your Wallet"
										: "asf3fdsad23321...123"}
								</div>
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
