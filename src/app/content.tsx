import "./app.scss";
import * as React from "react";
import { connect } from "react-redux";
import { History, Location } from "history";

import ApplicationState from "mele-web-wallet/redux/application-state";
import { ModuleRouter } from "mele-web-wallet/app/routes/module-router";
import { NavigationRouter } from "mele-web-wallet/app/routes/navigation-router";
import { HeaderRouter } from "mele-web-wallet/app/routes/header-router";
import { withRouter } from "react-router";
import {
	mapDispatchToProps,
	IActionCreators,
} from "mele-web-wallet/redux/methods/map-dispatch-to-props";
import { LanguageState } from "mele-web-wallet/redux/reducers/language-reducer";
import { MatchProp } from "mele-web-wallet/app/common/utils/match-props/match-prop";
import { PathUtil } from "mele-web-wallet/app/common/utils/path-util/path-util";
import { StandardLoader } from "mele-web-wallet/app/common/standard-loader/standard-loader";

interface IContentComponentProps {
	history: History;
	location: Location;
	actionCreators: IActionCreators;
	languageState: LanguageState;
	match: MatchProp<{
		language: number;
	}>;
}

class ContentComponent extends React.Component<IContentComponentProps> {
	constructor(props: IContentComponentProps) {
		super(props);
	}

	componentDidMount(): void {
		this.checkLanguage();
	}

	componentDidUpdate(prevProps: IContentComponentProps) {
		this.checkLanguage();
	}

	checkLanguage = () => {
		const languageParam = PathUtil.GetLanguage(this.props.location.pathname);
		const languages = this.props.languageState.languages;
		let language = languages.find((lang) => {
			return lang.value == languageParam;
		});

		if (!language) {
			return this.props.history.push("/en");
		}

		if (language!.value !== this.props.languageState.currentLanguage) {
			return this.props.actionCreators.language.changeLanguage(
				language!.value as any,
			);
		}
	};

	render() {
		if (!this.props.languageState.currentLanguage) {
			return <StandardLoader />;
		}
		return (
			<div id="content" className="page-background-color">
				<header>
					<HeaderRouter />
				</header>
				<div id="main-body">
					<nav>
						<NavigationRouter />
					</nav>
					<main>
						<ModuleRouter />
					</main>
				</div>
				<footer>
					<div></div>
				</footer>
			</div>
		);
	}
}

const ContentComponentWithRouter = withRouter(ContentComponent);

const mapStateToProps = (state: ApplicationState) => {
	return {
		languageState: state.language,
	};
};

export const Content = connect(
	mapStateToProps,
	mapDispatchToProps,
)(ContentComponentWithRouter);
