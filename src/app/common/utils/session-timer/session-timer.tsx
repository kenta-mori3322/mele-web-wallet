import React, { useState, useEffect } from "react";
import "./session-timer.scss";
import Modal from "react-modal";
import Cookies from "universal-cookie";
import { StandardInput } from "../../standard-input/standard-input";
import { StandardButton } from "../../buttons/standard-button";
import { LanguageState } from "mele-web-wallet/redux/reducers/language-reducer";
import {
	IActionCreators,
	mapDispatchToProps,
} from "mele-web-wallet/redux/methods/map-dispatch-to-props";
import ApplicationState from "mele-web-wallet/redux/application-state";
import { connect } from "react-redux";
import IdleTimer from "react-idle-timer";
import { WalletState } from "./../../../../redux/reducers/wallet-reducer";

interface TimerProps extends React.HTMLAttributes<HTMLDivElement> {
	languageState: LanguageState;
	actionCreators: IActionCreators;
	walletState: WalletState;
}

interface TimerState {
	idleModal: boolean;
	confirmError: boolean;
	pinOne: string;
	pinTwo: string;
	pinThree: string;
	pinFour: string;
	pinFive: string;
	pinSix: string;
}

const languages = {
	en: require("../../../translations/en.json"),
	ar: require("../../../translations/ar.json"),
};

const cookies = new Cookies();

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		width: "30%",
	},
};

class TimerComponent extends React.Component<TimerProps, TimerState> {
	idleTimer: null;

	constructor(props: TimerProps) {
		super(props);
		this.idleTimer = null;
		this.handleOnAction = this.handleOnAction.bind(this);
		this.handleOnActive = this.handleOnActive.bind(this);
		this.handleOnIdle = this.handleOnIdle.bind(this);
		this.state = {
			idleModal: false,
			confirmError: false,
			pinOne: "",
			pinTwo: "",
			pinThree: "",
			pinFour: "",
			pinFive: "",
			pinSix: "",
		};
	}

	loginPIN = () => {
		const pin = `${this.state.pinOne},${this.state.pinTwo},${this.state.pinThree},${this.state.pinFour},${this.state.pinFive},${this.state.pinSix}`;
		const cachedPin = atob(cookies.get("pin"));
		if (pin === cachedPin) {
			const address = atob(cookies.get("address"));
			const mnemonic = atob(cookies.get("mnemonic"));
			this.props.actionCreators.wallet.getWallet(mnemonic);
			this.props.actionCreators.transactions.searchTransactions(address);

			this.setState({
				pinOne: "",
				pinTwo: "",
				pinThree: "",
				pinFour: "",
				pinFive: "",
				pinSix: "",
				confirmError: false,
				idleModal: false,
			});
		} else {
			this.setState({
				confirmError: true,
			});
		}
	};
	handleOnAction(event: any) {}

	handleOnActive(event: any) {}

	handleOnIdle(event: any) {
		if (this.props.walletState.loadedWallet !== undefined)
			this.setState({ idleModal: true });
	}
	render() {
		const localeData = languages[this.props.languageState.currentLanguage];
		return (
			<>
				<IdleTimer
					ref={(ref: any) => {
						this.idleTimer = ref;
					}}
					timeout={60000}
					onActive={this.handleOnActive}
					onIdle={this.handleOnIdle}
					onAction={this.handleOnAction}
					debounce={250}
				/>
				<Modal isOpen={this.state.idleModal} style={customStyles}>
					<div id="wallet-pin-title">{localeData.wallet.insertPIN}</div>
					<div id="wallet-pin-subtitle-error">
						{this.state.confirmError && localeData.wallet.errorPIN}
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
					<StandardButton id="finishButton" onClick={() => this.loginPIN()}>
						{localeData.wallet.login}
					</StandardButton>
				</Modal>
			</>
		);
	}
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		languageState: state.language,
		walletState: state.wallet,
	};
};

export const Timer = connect(
	mapStateToProps,
	mapDispatchToProps,
)(TimerComponent);
