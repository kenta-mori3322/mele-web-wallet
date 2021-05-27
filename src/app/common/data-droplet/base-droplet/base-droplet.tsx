import "./base-droplet.scss";
import * as React from "react";

interface BaseDropletProps extends React.HTMLAttributes<HTMLDivElement> {
	padded?: boolean;
}

class BaseDropletComponent extends React.Component<BaseDropletProps> {
	render() {
		const overrideProps = {
			...this.props,
			className: `base-data-droplet ${this.props.className || ""}`,
		} as any;

		delete overrideProps.actionCreators;
		delete overrideProps.transactionState;
		delete overrideProps.languageState;
		delete overrideProps.padded;

		return (
			<div {...overrideProps}>
				<div
					className={`base-data-droplet-content ${
						this.props.padded ? "padded" : ""
					}`}
				>
					{this.props.children}
				</div>
			</div>
		);
	}
}

export const BaseDroplet = BaseDropletComponent;
