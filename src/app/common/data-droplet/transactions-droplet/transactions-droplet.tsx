import "react-circular-progressbar/dist/styles.css";
import "./transactions-droplet.scss";
import * as React from "react";
import { BaseDroplet } from "mele-web-wallet/app/common/data-droplet/base-droplet/base-droplet";
import ApplicationState from "mele-web-wallet/redux/application-state";
import { connect } from "react-redux";
import Moment from "react-moment";
import Tooltip from "react-tooltip-lite";
import { History } from "history";
import { mapDispatchToProps } from "mele-web-wallet/redux/methods/map-dispatch-to-props";
import { LanguageState } from "mele-web-wallet/redux/reducers/language-reducer";
import { StandardButton } from "../../buttons/standard-button";
import { IActionCreators } from "./../../../../redux/methods/map-dispatch-to-props";
import { TransactionsState } from "mele-web-wallet/redux/reducers/transactions-reducer";
import { PaginatedList } from "react-paginated-list";

interface TransactionsDropletProps
	extends React.HTMLAttributes<HTMLDivElement> {
	languageState: LanguageState;
	actionCreators: IActionCreators;
	transactionsState: TransactionsState;
}

const languages = {
	en: require("../../../translations/en.json"),
	ar: require("../../../translations/ar.json"),
};

class TransactionsDropletComponent extends React.Component<
	TransactionsDropletProps
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
		const isLogged = false;
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
						list={transactions}
						isLoading={true}
						loadingItem={() => (
							<div id="loadingTransactions">
								{isLogged
									? localeData.transactions.loading
									: localeData.transactions.loadingNoLogged}
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

export const TransactionsDroplet = connect(
	mapStateToProps,
	mapDispatchToProps,
)(TransactionsDropletComponent);
