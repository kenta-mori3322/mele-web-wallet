import "./social-media-button.scss";
import * as React from "react";
import { Button, ButtonProps } from "semantic-ui-react";

class SocialMediaButtonComponent extends React.Component<ButtonProps> {
	render() {
		const overrideProps = {
			...this.props,
			className: `social-media-button ${this.props.className || ""}`,
		};
		return <Button {...overrideProps} />;
	}
}

export const SocialMediaButton = SocialMediaButtonComponent;
