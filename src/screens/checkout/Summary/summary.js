import React, { Component } from 'react'
import { Divider, Card, CardContent, CardHeader, Button, Typography, IconButton } from '@material-ui/core';
import './summary.css'

export class Summary extends Component {
	constructor(props) {
		super(props);
		this.state = {
				cartItems: [],
				quantity: "",
				totalCartaValue: "",
				resturantName: ""
		}

		this.clickCheckOutHandler = this.clickCheckOutHandler.bind(this);
	}
    
	componentDidMount() {
		const {cartItems, quantity, totalCartValue, resturantName, resturantId} = this.props.props.props.history.location.state;
		this.setState({
			cartItems,
			quantity,
			totalCartValue,
			resturantName,
			resturantId
		})
	}

	clickCheckOutHandler() {
		const { paymentId, addressId } = this.props;
		const { totalCartValue, cartItems, quantity, resturantId } = this.state;
		const itemQuantities = cartItems.map((item, index) => {
			return {
				item_id: item.id,
				price: item.price,
				quantity: quantity[index]
			}
		})

		console.log(cartItems)
		const payload = {
			address_id: addressId,
			payment_id: paymentId,
			bill: totalCartValue,
			coupon_id: "",
			discount: 0,
			item_quantities: itemQuantities,
			restaurant_id: resturantId
		}
		fetch(`${this.props.baseUrl}/order`, {
			method: 'POST',
			body: JSON.stringify(payload),
			headers: {
				'authorization': sessionStorage.getItem("access-token"), 
				'Content-Type': 'application/json'
			}
		})
		.then(res => res.json())
		.then(res => {
			this.setState({
				paymentMethods: res.paymentMethods
			})
		})
	}

	render() {
		const {cartItems, quantity, totalCartValue, resturantName} = this.state;
		return (
			<Card className="summary-main">
					<CardHeader title={"Summary"}
					></CardHeader>
					<CardContent className="card-content-checkout">
						<Typography variant="p" className="resturant-name">{resturantName}</Typography>
						{cartItems.map((itemObj, itemobjindex) => (
							<div className="cart-item" key={"cartcontent-" + itemobjindex}>
								<div className="item item-2">
								{itemObj.item_type === 'VEG' ? <i className="fa fa-stop-circle-o item item1" aria-hidden="true" style={{ color: 'green', marginRight: '15px' }}></i> :
											<i className="fa fa-stop-circle-o item" aria-hidden="true" style={{ color: 'red', marginRight: '15px' }}></i>}
								<Typography className="item" variant="span">{itemObj.item_name.toUpperCase()}</Typography>
								</div>
								<Typography className="item" variant="span">{quantity[itemobjindex]}</Typography>
								<Typography className="item" variant="span">{itemObj.price}</Typography>
							</div>
						))}
					</CardContent>
					<Divider style={{width: '90%', margin: "0 auto"}}/>
					<CardContent>
							<div className="total-amount">
									<span>NET AMOUNT</span>
								<span><i class="fa fa-rupee"></i>{totalCartValue}</span>
							</div>
					</CardContent>
					<CardContent>
							<Button variant="contained" color="primary" fullWidth='true' size='medium' onClick={this.clickCheckOutHandler}>
									Place Order
							</Button>
					</CardContent>
			</Card>
		)
	}
}

export default Summary
