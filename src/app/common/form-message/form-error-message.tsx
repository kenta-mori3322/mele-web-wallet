import "./form-message.scss";
import * as React from "react";

interface FormErrorProps extends React.HTMLAttributes<HTMLDivElement> {
	message: string | React.ReactNode | undefined;
}

class FormErrorMessageComponent extends React.Component<FormErrorProps> {
	render() {
		const overrideProps = {
			...this.props,
			className: `form-message ${this.props.className || ""}`,
		};

		if (this.props.message) {
			return (
				<div {...overrideProps}>
					<div className="error-icon" />
					<div className="form-message-text form-message-error">
						{this.props.message}
					</div>
				</div>
			);
		} else {
			return "";
		}
	}
}

export const FormErrorMessage = FormErrorMessageComponent;
