import "./standard-checkbox.scss";
import * as React from "react";
import { Checkbox, CheckboxProps } from "semantic-ui-react";

class StandardCheckboxComponent extends React.Component<CheckboxProps> {
	constructor(props: CheckboxProps) {
		super(props);
		this.state = {};
	}

	render() {
		const overrideProps = {
			...this.props,
			className: `standard-checkbox ${this.props.className || ""}`,
		};
		return <Checkbox {...overrideProps} />;
	}
}

export const StandardCheckbox = StandardCheckboxComponent;
