import "./send-coins-droplet.scss";
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
import { WalletState } from "./../../../../redux/reducers/wallet-reducer";
import { Dropdown, Select } from "semantic-ui-react";
import {
	LoadTransactionsStatus,
	TransactionsState,
} from "mele-web-wallet/redux/reducers/transactions-reducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StaticState } from "mele-web-wallet/redux/reducers/static-reducer";
import { Utils } from "mele-sdk";

interface SendCoinsDropletProps extends React.HTMLAttributes<HTMLDivElement> {
	languageState: LanguageState;
	walletState: WalletState;
	actionCreators: IActionCreators;
	transactionState: TransactionsState;
	staticState: StaticState;
}

interface SendCoinsDropletState {
	recipient: string;
	amount: string;
	denom: string;
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
			amount: "",
			denom: "melc",
		};
	}

	sendCoins = (localeData: any) => {
		if (this.state.amount !== "" && this.state.recipient !== "") {
			const amount = parseFloat(
				Utils.toUmelc(this.state.amount, this.state.denom),
			);
			const wallet = this.props.walletState.loadedWallet;
			if (amount <= 0) {
				toast.error(localeData.send.sendMoreThanZero, {
					position: "top-right",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			} else if (
				this.props.walletState.loadedWalletAddress === this.state.recipient
			) {
				toast.error(localeData.send.sameWallet, {
					position: "top-right",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			} else if (wallet === undefined) {
				toast.error(localeData.send.notEnough, {
					position: "top-right",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			} else if (
				(wallet.value.coins[0] !== undefined &&
					`u${this.state.denom}` === wallet.value.coins[0].denom &&
					amount > parseFloat(wallet.value.coins[0].amount)) ||
				(wallet.value.coins[1] !== undefined &&
					`u${this.state.denom}` === wallet.value.coins[1].denom &&
					amount > parseFloat(wallet.value.coins[1].amount))
			) {
				toast.error(localeData.send.notEnough, {
					position: "top-right",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			} else {
				this.props.actionCreators.transactions.sendTransaction(
					this.state.recipient,
					`u${this.state.denom}`,
					amount.toString(),
				);
			}
		}
	};

	componentDidUpdate(prevProps: any, prevState: any) {
		const localeData = languages[this.props.languageState.currentLanguage];

		if (
			prevProps.transactionState.loadTransactionsStatus !==
				this.props.transactionState.loadTransactionsStatus &&
			this.props.transactionState.loadTransactionsStatus ===
				LoadTransactionsStatus.SEND_SUCCESS
		) {
			toast.success(localeData.send.success, {
				position: "top-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			this.props.actionCreators.wallet.getWallet(
				this.props.staticState.mnemonic ? this.props.staticState.mnemonic : "",
			);
			this.props.actionCreators.transactions.searchTransactions(
				this.props.walletState.loadedWalletAddress,
			);
			this.setState({ amount: "", recipient: "" });
		} else if (
			prevProps.transactionState.loadTransactionsStatus !==
				this.props.transactionState.loadTransactionsStatus &&
			this.props.transactionState.loadTransactionsStatus ===
				LoadTransactionsStatus.SEND_ERROR
		) {
			toast.error(localeData.send.error, {
				position: "top-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	}

	handleChange = (e: any) =>
		this.setState({ denom: e.target.innerText.toString().toLowerCase() });

	render() {
		const wallet = this.props.walletState.loadedWalletAddress;
		const localeData = languages[this.props.languageState.currentLanguage];
		const coins: { key: string; text: string; value: string }[] = [
			{ key: "melc", text: "MELC", value: "melc" },
			{ key: "melg", text: "MELG", value: "melg" },
		];
		return (
			<BaseDroplet {...this.props}>
				<ToastContainer
					position="top-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
				<div
					className={
						wallet !== undefined && wallet !== ""
							? "send-coins-droplet"
							: "send-coins-droplet-notlogged"
					}
				>
					<div className="input-container">
						<div className="send-coins-label">{localeData.send.sendTo}</div>
						<div className="send-coins-input-inner-container">
							<Dropdown
								fluid
								selection
								options={coins}
								className="select-field"
								value={this.state.denom}
								onChange={(e) => this.handleChange(e)}
							/>
							<StandardInput
								value={this.state.amount}
								className="amount-field"
								onChange={(e) => {
									if (e.target.value === "" || e.target.value.length < 11) {
										this.setState({ amount: e.target.value });
									}
								}}
								placeholder={localeData.send.amount}
								maxLength="11"
								type="number"
								min="0"
							/>
							<StandardInput
								value={this.state.recipient}
								className="recipient-field"
								onChange={(e) => this.setState({ recipient: e.target.value })}
								placeholder={localeData.send.recipient}
								maxLength="100"
								type="text"
							/>
						</div>
					</div>
					<div className="button-container">
						<StandardButton className="fee-button">
							{localeData.send.fees}
						</StandardButton>
						<StandardButton
							className="send-button"
							onClick={() => this.sendCoins(localeData)}
						>
							{localeData.send.send}
						</StandardButton>
						<StandardButton
							className="reset-button"
							onClick={() => this.setState({ recipient: "", amount: "" })}
						>
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
		walletState: state.wallet,
		transactionState: state.transactions,
		staticState: state.static,
	};
};

export const SendCoinsDroplet = connect(
	mapStateToProps,
	mapDispatchToProps,
)(SendCoinsDropletComponent);
