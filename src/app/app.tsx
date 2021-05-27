import "./app.scss";
import "semantic-ui-css/semantic.min.css";
import * as React from "react";
import { Provider } from "react-redux";
import { getApplicationStateStore } from "mele-web-wallet/redux/application-state-store";
import ApplicationState from "mele-web-wallet/redux/application-state";
import { Content } from "./content";
import { PersistGate } from "redux-persist/integration/react";

const { store, persister } = getApplicationStateStore();

class AppComponent extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<PersistGate loading={null} persistor={persister}>
					<Content />
				</PersistGate>
			</Provider>
		);
	}
}

export const App = AppComponent;
