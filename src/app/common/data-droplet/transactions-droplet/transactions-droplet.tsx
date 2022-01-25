import "react-circular-progressbar/dist/styles.css";
import "./transactions-droplet.scss";
import * as React from "react";
import ApplicationState from "mele-web-wallet/redux/application-state";
import { connect } from "react-redux";
import { mapDispatchToProps } from "mele-web-wallet/redux/methods/map-dispatch-to-props";
import { LanguageState } from "mele-web-wallet/redux/reducers/language-reducer";
import { StandardButton } from "../../buttons/standard-button";
import { IActionCreators } from "./../../../../redux/methods/map-dispatch-to-props";
import { TransactionsState } from "mele-web-wallet/redux/reducers/transactions-reducer";
import { PaginatedList } from "react-paginated-list";
import { WalletState } from "./../../../../redux/reducers/wallet-reducer";
import { Utils } from "mele-sdk";
import { History } from "history";

interface TransactionsDropletProps
	extends React.HTMLAttributes<HTMLDivElement> {
	languageState: LanguageState;
	actionCreators: IActionCreators;
	transactionsState: TransactionsState;
	walletState: WalletState;
	history: History;
}

const languages = {
	en: require("../../../translations/en.json"),
	ar: require("../../../translations/ar.json"),
};

class TransactionsDropletComponent extends React.Component<TransactionsDropletProps> {
	componentDidMount() {
		if (this.props.walletState.loadedWalletAddress)
			this.props.actionCreators.transactions.searchTransactions(
				this.props.walletState.loadedWalletAddress,
			);
	}

	goToTransactions = () => {
		this.props.history.push(
			`/${this.props.languageState.currentLanguage}/transactions`,
		);
	};

	render() {
		const localeData = languages[this.props.languageState.currentLanguage];
		const walletAddress = this.props.walletState.loadedWalletAddress;
		const transactions = this.props.transactionsState.loadedTransactions;
		return (
			<div id="transactions-droplet-module">
				<div id="transactions-content">
					<div className="transactions-list-th">
						<div className="transactions-header-cell" id="amountHeader">
							{localeData.transactions.amount}
						</div>
						<div className="transactions-header-cell" id="typeHeader">
							{localeData.transactions.type}
						</div>
						<div className="transactions-header-cell" id="senderCell">
							{localeData.transactions.sender}
						</div>
						<div className="transactions-header-cell" id="recipientHeader">
							{localeData.transactions.recipient}
						</div>
						<div className="transactions-header-cell" id="feeCell">
							{localeData.transactions.fee}
						</div>
					</div>
					<PaginatedList
						list={transactions !== undefined ? transactions.slice(0, 5) : []}
						isLoading={
							walletAddress === undefined ||
							walletAddress === "" ||
							transactions === undefined ||
							transactions.length === 0
						}
						loadingItem={() => (
							<div id="loadingTransactions">
								{walletAddress !== undefined || walletAddress !== ""
									? localeData.transactions.loading
									: localeData.transactions.loadingNoLogged}
							</div>
						)}
						itemsPerPage={5}
						showPrev={false}
						showNext={false}
						displayNumbers={false}
						renderList={(list: any) => (
							<>
								{list.map((data: any, id: number) => {
									const denom = data.msgs[0].data.amount.substr(
										data.msgs[0].data.amount.length - 5,
									);
									const amount =
											data.msgs[0] !== undefined &&
											data.msgs[0].data !== undefined
												? data.msgs[0].data.amount
												: "";
									const correctAmount =
											amount !== undefined
												? amount.includes(",")
													? amount
															.substring(amount.indexOf(",") + 1)
															.slice(0, -5)
													: amount.slice(0, -5)
												: "0";
									return (
										<div key={id} className="transactions-list-tr">
											<div className="transactions-list-td amountCell">
												{denom === "umelc"
													? `${Utils.fromUmelc(
															correctAmount,
															"melc",
													  )} MELX`
													: `${Utils.fromUmelg(
															correctAmount,
															"melg",
													  )} MELG`}
											</div>
											<div className="transactions-list-td typeCell">
												<div
													className={
														data.msgs[0].data.recipient ===
														this.props.walletState.loadedWalletAddress
															? "pill-green"
															: "pill-orange"
													}
												>
													{data.msgs[0].data.recipient ===
													this.props.walletState.loadedWalletAddress
														? localeData.transactions.receive
														: localeData.transactions.send}
												</div>
											</div>
											<div className="transactions-list-td senderCell">
												{data.msgs[0].data.sender !== undefined &&
													data.msgs[0].data.sender.substring(0, 15)}
												...
												{data.msgs[0].data.sender !== undefined &&
													data.msgs[0].data.sender.substr(
														data.msgs[0].data.sender.length - 5,
													)}
											</div>
											<div className="transactions-list-td recipientHeader">
												{data.msgs[0].data.recipient !== undefined &&
													data.msgs[0].data.recipient.substring(0, 15)}
												...
												{data.msgs[0].data.recipient !== undefined &&
													data.msgs[0].data.recipient.substr(
														data.msgs[0].data.recipient.length - 5,
													)}
											</div>
											<div className="transactions-list-td feeHeader">
												{data.fee !== undefined
													? `${Utils.fromUmelc(
															data.fee.system_fee.substring(
																0,
																data.fee.system_fee.length - 5,
															),
															"melc",
													  )} MELX`
													: ""}
											</div>
										</div>
									);
								})}
							</>
						)}
					/>
					<div
						id="transactions-droplet-more"
						onClick={() => this.goToTransactions()}
					>
						{localeData.transactions.seeMore}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: ApplicationState) => {
	return {
		languageState: state.language,
		transactionsState: state.transactions,
		walletState: state.wallet,
	};
};

export const TransactionsDroplet = connect(
	mapStateToProps,
	mapDispatchToProps,
)(TransactionsDropletComponent);
