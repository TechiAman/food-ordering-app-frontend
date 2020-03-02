import React, { Component } from 'react'
import Header from "../../common/header/Header";
import Main from './PaymentSteps/Main/main';

export class checkout extends Component {
	render() {
		console.log(this.props.baseUrl)
		return (
			<div>
				<Main props={this.props} baseUrl={this.props.baseUrl}/>
			</div>
		)
	}
}

export default checkout
