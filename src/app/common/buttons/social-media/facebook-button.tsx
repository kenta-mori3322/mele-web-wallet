import "./facebook-button.scss";
import * as React from "react";
import { ButtonProps } from "semantic-ui-react";
import { SocialMediaButton } from "./social-media-button";

class FacebookButtonComponent extends React.Component<ButtonProps> {
	render() {
		const overrideProps = {
			...this.props,
			className: `facebook-button ${this.props.className || ""}`,
		};
		return <SocialMediaButton {...overrideProps} />;
	}
}

export const FacebookButton = FacebookButtonComponent;
