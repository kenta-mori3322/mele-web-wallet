import * as React from "react";
import "./transactions.scss";
import ApplicationState from "mele-web-wallet/redux/application-state";
import { connect } from "react-redux";
import {
	IActionCreators,
	mapDispatchToProps,
} from "mele-web-wallet/redux/methods/map-dispatch-to-props";
import { History, Location } from "history";
import { LanguageState } from "mele-web-wallet/redux/reducers/language-reducer";
import { TransactionsState } from "mele-web-wallet/redux/reducers/transactions-reducer";
import { PaginatedList } from "react-paginated-list";
import { Utils } from "mele-sdk";
import { WalletState } from "mele-web-wallet/redux/reducers/wallet-reducer";

interface ITransactionsState {}

interface ITransactionsProps {
	location: Location;
	history: History;
	languageState: LanguageState;
	transactionsState: TransactionsState;
	actionCreators: IActionCreators;
	walletState: WalletState;
}

const languages = {
	en: require("../../translations/en.json"),
	ar: require("../../translations/ar.json"),
};

class TransactionsComponent extends React.Component<
	ITransactionsProps,
	ITransactionsState
> {
	componentDidMount() {
		if (this.props.walletState.loadedWalletAddress)
			this.props.actionCreators.transactions.searchTransactions(
				this.props.walletState.loadedWalletAddress,
			);
	}

	render() {
		const localeData = languages[this.props.languageState.currentLanguage];
		const walletAddress = this.props.walletState.loadedWalletAddress;
		const transactions = this.props.transactionsState.loadedTransactions;
		return (
			<div id="transactions-module">
				<div id="transactions-title">{localeData.transactions.title}</div>
				<div id="transactions-subTitle">{localeData.transactions.subtitle}</div>
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
						list={transactions}
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
						itemsPerPage={10}
						nextText={localeData.navigation.next}
						prevText={localeData.navigation.prev}
						renderList={(list: any) => (
							<>
								{list.map((data: any, id: number) => {
									const denom = data.msgs[0].data.amount.substr(
										data.msgs[0].data.amount.length - 5,
									);
									return (
										<div key={id} className="transactions-list-tr">
											<div className="transactions-list-td amountCell">
												{denom === "umelc"
													? `${Utils.fromUmelc(
															data.msgs[0].data.amount.substring(
																0,
																data.msgs[0].data.amount.length - 5,
															),
															"melc",
													  )} MELC`
													: `${Utils.fromUmelg(
															data.msgs[0].data.amount.substring(
																0,
																data.msgs[0].data.amount.length - 5,
															),
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
												{data.msgs[0].data.sender.substring(0, 15)}...
												{data.msgs[0].data.sender.substr(
													data.msgs[0].data.sender.length - 5,
												)}
											</div>
											<div className="transactions-list-td recipientHeader">
												{data.msgs[0].data.recipient.substring(0, 15)}...
												{data.msgs[0].data.recipient.substr(
													data.msgs[0].data.recipient.length - 5,
												)}
											</div>
											<div className="transactions-list-td feeHeader">
												{data.fee !== undefined
													? denom === "umelc"
														? `${Utils.fromUmelc(
																data.fee.total_fee.substring(
																	0,
																	data.fee.total_fee.length - 5,
																),
																"melc",
														  )} MELC`
														: `${Utils.fromUmelg(
																data.fee.total_fee.substring(
																	0,
																	data.fee.total_fee.length - 5,
																),
																"melg",
														  )} MELG`
													: ""}
											</div>
										</div>
									);
								})}
							</>
						)}
					/>
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

export const Transactions = connect(
	mapStateToProps,
	mapDispatchToProps,
)(TransactionsComponent);
