import "./google-button.scss";
import * as React from "react";

import { ButtonProps } from "semantic-ui-react";
import { SocialMediaButton } from "./social-media-button";

class GoogleButtonComponent extends React.Component<ButtonProps> {
	render() {
		const overrideProps = {
			...this.props,
			className: `google-button ${this.props.className || ""}`,
		};
		return <SocialMediaButton {...overrideProps} />;
	}
}

export const GoogleButton = GoogleButtonComponent;
