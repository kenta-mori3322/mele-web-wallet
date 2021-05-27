import "./standard-button.scss";
import * as React from "react";
import { Button, ButtonProps } from "semantic-ui-react";
import { withRouter, RouteComponentProps } from "react-router";

interface StandardButtonProps extends ButtonProps, RouteComponentProps {
	to?: string;
	buttonColor?: "blue" | "grey" | "white";
}

class StandardButtonComponent extends React.Component<StandardButtonProps> {
	render() {
		const buttonColor = this.props.buttonColor || "blue";
		const overrideProps = {
			...this.props,
			className: `standard-button-${buttonColor} ${this.props.className || ""}`,
		};

		if (this.props.to) {
			overrideProps.onClick = () => {
				this.props.history.push(this.props.to!);
			};
		}
		delete overrideProps.to;
		delete overrideProps.buttonColor;
		delete overrideProps.history;
		delete overrideProps.location;
		delete overrideProps.match;
		delete overrideProps.staticContext;

		return <Button {...overrideProps} />;
	}
}

export const StandardButton = withRouter(StandardButtonComponent);
