import * as React from "react";
import { AppRouter, AppRoute } from "./app-routes";
import { Route, Switch } from "react-router";

class ModuleRouterComponent extends React.Component {
	render() {
		return (
			<Switch>
				{AppRouter.getRoutesArray().map((route: AppRoute) => {
					return (
						<Route
							key={route.path}
							path={route.path}
							exact={route.exact}
							render={(props: any) => {
								const Component = route.component;
								return <Component {...props} />;
							}}
						/>
					);
				})}
			</Switch>
		);
	}
}

export const ModuleRouter = ModuleRouterComponent;
