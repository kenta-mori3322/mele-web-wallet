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
import Moment from "react-moment";
import Tooltip from "react-tooltip-lite";

interface ITransactionsState {}

interface ITransactionsProps {
	location: Location;
	history: History;
	languageState: LanguageState;
	transactionsState: TransactionsState;
	actionCreators: IActionCreators;
}

const languages = {
	en: require("../../translations/en.json"),
	ar: require("../../translations/ar.json"),
};

class TransactionsComponent extends React.Component<
	ITransactionsProps,
	ITransactionsState
> {
	render() {
		const localeData = languages[this.props.languageState.currentLanguage];
		const transactions = [
			{
				amount: "21,600 MELC",
				type: "Send",
				sender: "52CAA058...B8EC8A0A",
				recipient: "52CAA058...B8EC8A0A",
				fee: "0.02 MELC",
			},
			{
				amount: "21,600 MELC",
				type: "Receive",
				sender: "52CAA058...B8EC8A0A",
				recipient: "52CAA058...B8EC8A0A",
				fee: "0.02 MELC",
			},
			{
				amount: "21,600 MELC",
				type: "Send",
				sender: "52CAA058...B8EC8A0A",
				recipient: "52CAA058...B8EC8A0A",
				fee: "0.02 MELC",
			},
			{
				amount: "21,600 MELC",
				type: "Receive",
				sender: "52CAA058...B8EC8A0A",
				recipient: "52CAA058...B8EC8A0A",
				fee: "0.02 MELC",
			},
		];
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
						isLoading={false}
						loadingItem={() => (
							<div id="loadingTransactions">
								{localeData.transactions.loading}
							</div>
						)}
						itemsPerPage={20}
						nextText={localeData.navigation.next}
						prevText={localeData.navigation.prev}
						renderList={(list: any) => (
							<>
								{list.map((data: any, id: number) => {
									return (
										<div key={id} className="transactions-list-tr">
											<div className="transactions-list-td amountCell">
												{data.amount}
											</div>
											<div className="transactions-list-td typeCell">
												<div
													className={
														data.type === "Send" ? "pill-orange" : "pill-green"
													}
												>
													{data.type}
												</div>
											</div>
											<div className="transactions-list-td senderCell">
												{data.sender}
											</div>
											<div className="transactions-list-td recipientHeader">
												{data.recipient}
											</div>
											<div className="transactions-list-td feeHeader">
												{data.fee}
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
	};
};

export const Transactions = connect(
	mapStateToProps,
	mapDispatchToProps,
)(TransactionsComponent);
