import "./standard-input.scss";
import * as React from "react";
import { Input, InputProps } from "semantic-ui-react";

class StandardInputComponent extends React.Component<InputProps> {
	constructor(props: InputProps) {
		super(props);
		this.state = {};
	}

	render() {
		const overrideProps = {
			...this.props,
			className: `standard-input ${this.props.className || ""}`,
		};
		return <Input {...overrideProps} />;
	}
}

export const StandardInput = StandardInputComponent;
