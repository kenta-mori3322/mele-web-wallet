import "./form-message.scss";
import * as React from "react";

interface FormSuccessProps extends React.HTMLAttributes<HTMLDivElement> {
	message: string | React.ReactNode | undefined;
}

class FormSuccessMessageComponent extends React.Component<FormSuccessProps> {
	render() {
		const overrideProps = {
			...this.props,
			className: `form-message ${this.props.className || ""}`,
		};

		if (this.props.message) {
			return (
				<div {...overrideProps}>
					<div className="form-message-text form-message-success">
						{this.props.message}
					</div>
				</div>
			);
		} else {
			return "";
		}
	}
}

export const FormSuccessMessage = FormSuccessMessageComponent;
