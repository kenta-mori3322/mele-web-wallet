import { HeaderNonAuthenticated } from "mele-web-wallet/app/common/header/header-non-authenticated";
import { Dashboard } from "mele-web-wallet/app/modules/dashboard/dashboard";
import { NoMatch } from "mele-web-wallet/app/modules/no-match/no-match";
import { NoMatchAuthed } from "mele-web-wallet/app/modules/no-match/no-match-authed";
import { Transactions } from "mele-web-wallet/app/modules/transactions/transactions";
import { Navigation } from "../common/navigation/navigation";

export interface AppRoute {
	path: string;
	exact?: boolean;
	component: any;
	headerComponent: any;
	authType: "REQUIRED" | "NOT_REQUIRED" | "DENY_AUTHENTICATED";
	navigation?: {
		component: any;
		parameters?: {
			activeButton: "dashboard" | "transactions | profile";
		};
	};
}

export class AppRouter {
	public static ROUTES = {
		//DENY_AUTHENTICATED
		DASHBOARD: {
			path: "/:language/dashboard",
			exact: true,
			component: Dashboard,
			headerComponent: HeaderNonAuthenticated,
			authType: "NOT_REQUIRED",
			navigation: {
				component: Navigation,
				parameters: {
					activeButton: "dashboard",
				},
			},
		},
		TRANSACTIONS: {
			path: "/:language/transactions",
			exact: true,
			component: Transactions,
			headerComponent: HeaderNonAuthenticated,
			authType: "NOT_REQUIRED",
			navigation: {
				component: Navigation,
				parameters: {
					activeButton: "transactions",
				},
			},
		},
		//NO_MATCH
		NO_MATCH: {
			path: "*",
			component: NoMatch,
			authType: "NOT_REQUIRED",
		},
		NO_MATCH_AUTHED: {
			path: "*",
			component: NoMatchAuthed,
			authType: "REQUIRED",
		},
	};

	public static getRoutesArray() {
		const routers = Object.keys(AppRouter.ROUTES).map((key: string) => {
			return (AppRouter.ROUTES as any)[key];
		});

		return routers.filter((route: AppRoute) => {
			if (route.authType === "NOT_REQUIRED") {
				return true;
			}
			return null;
		});
	}
}
