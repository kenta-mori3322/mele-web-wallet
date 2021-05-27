import "./standard-loader.scss";
import * as React from "react";

interface IStandardLoaderComponentProps {}

class StandardLoaderComponent extends React.Component<
	IStandardLoaderComponentProps
> {
	constructor(props: IStandardLoaderComponentProps) {
		super(props);
	}

	render() {
		return (
			<div className="standard-loader">
				<div className="lds-ring">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		);
	}
}

export const StandardLoader = StandardLoaderComponent;
