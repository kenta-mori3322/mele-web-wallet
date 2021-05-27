import * as React from "react";
import { AppRouter, AppRoute } from "./app-routes";
import { Route, Switch } from "react-router";

interface NavigationRouterComponentProps {}

class NavigationRouterComponent extends React.Component<
	NavigationRouterComponentProps
> {
	render() {
		return (
			<Switch>
				{AppRouter.getRoutesArray()
					.filter((route: AppRoute) => {
						if (route.navigation && route.navigation.component) {
							return route.navigation.component;
						}
					})
					.map((route: AppRoute) => {
						return (
							<Route
								key={route.path}
								path={route.path}
								exact={route.exact}
								render={(props: any) => {
									const NavigationComponent = route.navigation!.component;
									const combineProps = {
										...props,
										...route.navigation!.parameters,
									};
									return <NavigationComponent {...combineProps} />;
								}}
							/>
						);
					})}
			</Switch>
		);
	}
}

export const NavigationRouter = NavigationRouterComponent;
