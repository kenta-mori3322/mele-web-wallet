import * as React from "react";
import { AppRouter, AppRoute } from "./app-routes";
import { Route, Switch } from "react-router";
import ApplicationState from "../../redux/application-state";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../redux/methods/map-dispatch-to-props";
interface HeaderRouterComponentProps {}

class HeaderRouterComponent extends React.Component<
	HeaderRouterComponentProps
> {
	render() {
		return (
			<Switch>
				{AppRouter.getRoutesArray()
					.filter((route: AppRoute) => {
						return route.headerComponent;
					})
					.map((route: AppRoute) => {
						return (
							<Route
								key={route.path}
								path={route.path}
								exact={route.exact}
								render={(props: any) => {
									const HeaderComponent = route.headerComponent;
									return <HeaderComponent {...props} />;
								}}
							/>
						);
					})}
			</Switch>
		);
	}
}

export const HeaderRouter = HeaderRouterComponent;
