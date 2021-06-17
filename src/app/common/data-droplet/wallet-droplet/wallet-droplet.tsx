import "./wallet-droplet.scss";
import * as React from "react";
import { BaseDroplet } from "mele-web-wallet/app/common/data-droplet/base-droplet/base-droplet";
import { connect } from "react-redux";
import {
	IActionCreators,
	mapDispatchToProps,
} from "mele-web-wallet/redux/methods/map-dispatch-to-props";
import ApplicationState from "mele-web-wallet/redux/application-state";
import { LanguageState } from "mele-web-wallet/redux/reducers/language-reducer";
import { StandardButton } from "mele-web-wallet/app/common/buttons/standard-button";
import { StandardInput } from "../../standard-input/standard-input";
import { MnemonicSigner, Utils } from "mele-sdk";
import { WalletState } from "mele-web-wallet/redux/reducers/wallet-reducer";
import Cookies from "universal-cookie";
import { StaticState } from "mele-web-wallet/redux/reducers/static-reducer";

interface WalletDropletProps extends React.HTMLAttributes<HTMLDivElement> {
	languageState: LanguageState;
	actionCreators: IActionCreators;
	walletState: WalletState;
	staticState: StaticState;
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
	updateWallet: boolean;
	loginPinOne: string;
	loginPinTwo: string;
	loginPinThree: string;
	loginPinFour: string;
	loginPinFive: string;
	loginPinSix: string;
}

const languages = {
	en: require("../../../translations/en.json"),
	ar: require("../../../translations/ar.json"),
};

const cookies = new Cookies();

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
			updateWallet: false,
			loginPinOne: "",
			loginPinTwo: "",
			loginPinThree: "",
			loginPinFour: "",
			loginPinFive: "",
			loginPinSix: "",
		};
	}

	componentDidMount() {
		const address = cookies.get("address");
		if (
			this.props.walletState.loadedWallet === undefined ||
			this.props.walletState.loadedWalletAddress === "" ||
			address === undefined
		) {
			this.setState({ open: true });
			this.setState({ mnemonic: this.generateMnemonic() });
		}
		if (
			(this.props.walletState.loadedWallet === undefined ||
				this.props.walletState.loadedWalletAddress === "") &&
			address !== undefined &&
			address !== ""
		) {
			this.setState({ state: 0 });
		}
	}

	resetPIN = () => {
		this.setState({
			pinOne: "",
			pinTwo: "",
			pinThree: "",
			pinFour: "",
			pinFive: "",
			pinSix: "",
			pinOneConfirm: "",
			pinTwoConfirm: "",
			pinThreeConfirm: "",
			pinFourConfirm: "",
			pinFiveConfirm: "",
			pinSixConfirm: "",
		});
	};

	generateMnemonic = () => {
		const mnemonic = Utils.generateMnemonic();
		return mnemonic.split(" ").slice(0, 12);
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

	loginPIN = async () => {
		const pin = `${this.state.loginPinOne},${this.state.loginPinTwo},${this.state.loginPinThree},${this.state.loginPinFour},${this.state.loginPinFive},${this.state.loginPinSix}`;
		const cachedPin = cookies.get("pin");
		if (pin === cachedPin) {
			const address = cookies.get("address");
			const mnemonic = cookies.get("mnemonic");
			this.props.actionCreators.wallet.getWallet(mnemonic);
			this.props.actionCreators.transactions.searchTransactions(address);

			this.setState({
				state: 0,
				open: false,
				confirmError: false,
				updateWallet: false,
			});
			this.resetPIN();
		}
	};

	checkPIN = async () => {
		const pin = `${this.state.pinOneConfirm},${this.state.pinTwoConfirm},${this.state.pinThreeConfirm},${this.state.pinFourConfirm},${this.state.pinFiveConfirm},${this.state.pinSixConfirm}`;
		if (this.state.pin === pin) {
			await this.props.actionCreators.static.setMnemonicAndPin(
				JSON.stringify(this.state.mnemonic)
					.replace(/[\[\]']+/g, "")
					.replace(/['"]+/g, "")
					.replace(/,/g, " "),
				pin,
			);
			await this.props.actionCreators.wallet.getWalletAddress(
				JSON.stringify(this.state.mnemonic)
					.replace(/[\[\]']+/g, "")
					.replace(/['"]+/g, "")
					.replace(/,/g, " "),
			);

			this.setState({
				state: 0,
				open: false,
				confirmError: false,
				updateWallet: true,
			});
			this.resetPIN();
		} else {
			this.setState({ confirmError: true });
		}
	};

	restoreWallet = async (mnemonic: string) => {
		await this.props.actionCreators.static.setMnemonicAndPin(
			mnemonic.replace(/,/g, " "),
			"",
		);
		await this.props.actionCreators.wallet.getWalletAddress(
			mnemonic.replace(/,/g, " "),
		);

		this.setState({
			state: 0,
			open: false,
			confirmError: false,
			updateWallet: true,
			recoveryPhrase: "",
		});
		this.resetPIN();
	};

	componentDidUpdate(prevProps: any) {
		if (
			this.props.walletState.loadedWalletAddress !== "" &&
			this.state.updateWallet
		) {
			this.props.actionCreators.wallet.getWallet(
				this.props.staticState.mnemonic ? this.props.staticState.mnemonic : "",
			);
			this.props.actionCreators.transactions.searchTransactions(
				this.props.walletState.loadedWalletAddress,
			);
			this.setState({ updateWallet: false });
		}
	}

	logout = async () => {
		this.props.actionCreators.wallet.logout();
		this.props.actionCreators.transactions.cleanTransactions();
		this.setState({ state: 0, open: true, confirmError: false });
		this.resetPIN();
		cookies.remove("address", { path: "/en" });
		cookies.remove("pin", { path: "/en" });
		cookies.remove("mnemonic", { path: "/en" });
	};

	render() {
		const localeData = languages[this.props.languageState.currentLanguage];
		const wallet = this.props.walletState.loadedWallet;
		const walletAddress = this.props.walletState.loadedWalletAddress;
		return (
			<BaseDroplet {...this.props} style={{ border: "none" }}>
				{this.state.open ? (
					<>
						<div className="wallet-droplet-opened">
							<div
								className="wallet-container"
								onClick={() => {
									this.setState({
										open: false,
										state: 0,
										copied: false,
										confirmError: false,
										setPINError: false,
									});
									this.resetPIN();
								}}
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
											: this.state.state === 5
											? "40%"
											: this.state.state === 6
											? "68%"
											: "82%",
									marginLeft:
										this.state.state === 2 && !this.state.setPINError
											? "25%"
											: this.state.state === 2 && this.state.setPINError
											? "25%"
											: this.state.state === 3
											? "25%"
											: this.state.state === 5
											? "24.5%"
											: "20%",
								}}
							>
								<div id="walletIcon" />
								<div className="text-container">
									<div id="wallet-title">
										{/* {walletAddress === undefined || wallet === ""
											? localeData.wallet.noWallet
											: wallet === undefined ? "" : wallet.value.account_number} */}
									</div>
									<div id="wallet-subtitle">
										{walletAddress === undefined || walletAddress === ""
											? localeData.wallet.createOrImport
											: `${walletAddress.substring(
													0,
													15,
											  )}...${walletAddress.substr(walletAddress.length - 5)}`}
									</div>
								</div>
								<div id="wallet-arrow" />
							</div>
							{(walletAddress === undefined || walletAddress === "") &&
								this.state.state === 0 && (
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
							{(wallet === undefined || wallet === "") &&
								this.state.state === 1 && (
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
							{(walletAddress === undefined || walletAddress === "") &&
								this.state.state === 2 && (
									<div id="wallet-pin-container">
										<div id="wallet-pin-title">
											{localeData.wallet.choosePIN}
										</div>
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

													if (
														reg.test(e.target.value) ||
														e.target.value == ""
													) {
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

													if (
														reg.test(e.target.value) ||
														e.target.value == ""
													) {
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

													if (
														reg.test(e.target.value) ||
														e.target.value == ""
													) {
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

													if (
														reg.test(e.target.value) ||
														e.target.value == ""
													) {
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

													if (
														reg.test(e.target.value) ||
														e.target.value == ""
													) {
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

													if (
														reg.test(e.target.value) ||
														e.target.value == ""
													) {
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
							{(walletAddress === undefined || walletAddress === "") &&
								this.state.state === 3 && (
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

													if (
														reg.test(e.target.value) ||
														e.target.value == ""
													) {
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

													if (
														reg.test(e.target.value) ||
														e.target.value == ""
													) {
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

													if (
														reg.test(e.target.value) ||
														e.target.value == ""
													) {
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

													if (
														reg.test(e.target.value) ||
														e.target.value == ""
													) {
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

													if (
														reg.test(e.target.value) ||
														e.target.value == ""
													) {
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

													if (
														reg.test(e.target.value) ||
														e.target.value == ""
													) {
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
							{(walletAddress === undefined || walletAddress === "") &&
								this.state.state === 4 && (
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
											type="text"
										/>
										<StandardButton
											id="importButton"
											onClick={() =>
												this.restoreWallet(this.state.recoveryPhrase)
											}
										>
											{localeData.wallet.import}
										</StandardButton>
									</div>
								)}
							{this.state.state === 5 && (
								<div
									id="wallet-creation-container"
									style={{ marginLeft: "25%" }}
								>
									<div id="wallet-creation-buttons-logout-container">
										<div id="wallet-pin-subtitle-address">{walletAddress}</div>
										<StandardButton
											id="logoutButton"
											onClick={() => this.logout()}
										>
											{localeData.wallet.logout}
										</StandardButton>
									</div>
								</div>
							)}
							{this.state.state === 6 && (
								<div id="wallet-pin-container-login">
									<div id="wallet-pin-title">{localeData.wallet.login}</div>
									<div id="wallet-pin-subtitle-error">
										{this.state.confirmError && localeData.wallet.insertPIN}
									</div>
									<div id="pinContainer">
										<StandardInput
											value={this.state.loginPinOne}
											className="form-field login-field"
											onChange={(e) => {
												const reg = new RegExp("^[0-9]+$");

												if (reg.test(e.target.value) || e.target.value == "") {
													this.setState({ loginPinOne: e.target.value });
												}
											}}
											maxLength="1"
											type="text"
											id="pinOne"
										/>
										<StandardInput
											value={this.state.loginPinTwo}
											className="form-field login-field"
											onChange={(e) => {
												const reg = new RegExp("^[0-9]+$");

												if (reg.test(e.target.value) || e.target.value == "") {
													this.setState({ loginPinTwo: e.target.value });
												}
											}}
											maxLength="1"
											type="text"
											id="pinTwo"
										/>
										<StandardInput
											value={this.state.loginPinThree}
											className="form-field login-field"
											onChange={(e) => {
												const reg = new RegExp("^[0-9]+$");

												if (reg.test(e.target.value) || e.target.value == "") {
													this.setState({ loginPinThree: e.target.value });
												}
											}}
											maxLength="1"
											type="text"
											id="pinThree"
										/>
										<StandardInput
											value={this.state.loginPinFour}
											className="form-field login-field"
											onChange={(e) => {
												const reg = new RegExp("^[0-9]+$");

												if (reg.test(e.target.value) || e.target.value == "") {
													this.setState({ loginPinFour: e.target.value });
												}
											}}
											maxLength="1"
											type="text"
											id="pinFour"
										/>
										<StandardInput
											value={this.state.loginPinFive}
											className="form-field login-field"
											onChange={(e) => {
												const reg = new RegExp("^[0-9]+$");

												if (reg.test(e.target.value) || e.target.value == "") {
													this.setState({ loginPinFive: e.target.value });
												}
											}}
											maxLength="1"
											type="text"
											id="pinFive"
										/>
										<StandardInput
											value={this.state.loginPinSix}
											className="form-field login-field"
											onChange={(e) => {
												const reg = new RegExp("^[0-9]+$");

												if (reg.test(e.target.value) || e.target.value == "") {
													this.setState({ loginPinSix: e.target.value });
												}
											}}
											maxLength="1"
											type="text"
											id="pinSix"
										/>
									</div>
									<StandardButton
										id="finishButton"
										onClick={() => this.loginPIN()}
									>
										{localeData.wallet.login}
									</StandardButton>
								</div>
							)}
						</div>
					</>
				) : (
					<div className="wallet-droplet">
						<div
							className="wallet-container"
							onClick={() => {
								walletAddress !== ""
									? this.setState({ open: true, state: 5 })
									: this.setState({ open: true, state: 0 });
							}}
						>
							<div id="walletIcon" />
							<div className="text-container">
								{/* <div id="wallet-title">
									{walletAddress === undefined || walletAddress === ""
										? localeData.wallet.noWallet
										: wallet === undefined ? "" : wallet.value.account_number}
								</div> */}
								<div id="wallet-subtitle">
									{walletAddress === undefined || walletAddress === ""
										? localeData.wallet.createOrImport
										: `${walletAddress.substring(
												0,
												15,
										  )}...${walletAddress.substr(walletAddress.length - 5)}`}
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
		walletState: state.wallet,
		staticState: state.static,
	};
};

export const WalletDroplet = connect(
	mapStateToProps,
	mapDispatchToProps,
)(WalletDropletComponent);
