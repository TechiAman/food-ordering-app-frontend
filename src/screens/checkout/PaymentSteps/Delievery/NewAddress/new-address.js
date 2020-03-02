import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { MenuItem, IconButton, Snackbar, Select, Button, 
	InputLabel, Input, FormHelperText, FormControl } from '@material-ui/core';
import './new-address.css';

export default class NewAddress extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			states: [],
			stateValue: "",
			show: false,
			value:'',
			char :'',
			flatNo: '',
			locality: '',
			city:'',
			pinCode: '',
			pinErrorMessage: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.getStates = this.getStates.bind(this);
		this.handleSaveBtn = this.handleSaveBtn.bind(this);
		this.handleValueChange = this.handleValueChange.bind(this)
	}

	handleSaveBtn() {
		if (this.state.pinCode) {
			if (this.state.pinCode.length !== 6) {
				this.setState({
					pinErrorMessage: "Pincode must only contain numbers and must be 6 digits long."
				})
			}
		}
		this.setState({
			show: true
		})
		const { baseUrl } = this.props;
		const newAddress = {
			city: this.state.city,
			flat_building_name: this.state.flatNo,
			locality: this.state.locality,
			pincode: this.state.pinCode,
			state_uuid: this.state.stateValue
		}
		let canSubmit = true;
		Object.keys(newAddress).forEach(key => {
			if (!newAddress[key]) {
				canSubmit = false
			}
		})

		if (!canSubmit) return;


		fetch(`${baseUrl}/address`, {
			method: 'POST',
			headers: {
				'authorization': sessionStorage.getItem("access-token"), 
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newAddress)
		})
		.then(res => {
			if (res.status === 201) {
				this.setState({
					open: true,
					message: 'Address Saved Successfully'
				})
				let e;
				this.props.handleChange(e, 0);
			}
			return res.json()
		})
	}

	componentDidMount() {
		this.getStates(this.props.baseUrl);
		this.props.handleSteps(false);
	}

	handleChange(event) {
		this.setState({
			stateValue: event.target.value
		})
	}
	handleValueChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	getStates(baseUrl) {
		fetch(`${baseUrl}/states`, {
			method: 'GET'
		})
		.then(res => res.json())
		.then(res => {
			this.setState({
				states: res.states
			})
		})
	} 



	render() {
		const {stateValue, city, locality,flatNo, show, drpdwn, pinCode, states, value, pinErrorMessage} = this.state;
		return (
			<>
			<form className="root-main"  autoComplete="off">

			<FormControl>
        <InputLabel htmlFor="flatNumber">Flat/Building No.<sup>*</sup></InputLabel>
        <Input
          id="flatNumber"
          value={flatNo}
          onChange={this.handleValueChange}
					aria-describedby="error"
					name="flatNo"
        />
        {(show && !flatNo) && <FormHelperText id="error">required</FormHelperText>}
      </FormControl>
			<FormControl>
        <InputLabel htmlFor="locality">Locality<sup>*</sup></InputLabel>
        <Input
          id="locality"
          value={locality}
          onChange={this.handleValueChange}
					aria-describedby="error"
					name="locality"
        />
        {(show && !locality) && <FormHelperText id="error" className="field">required</FormHelperText>}
      </FormControl>
			<FormControl>
        <InputLabel htmlFor="city">City<sup>*</sup></InputLabel>
        <Input
          id="city"
          value={city}
          onChange={this.handleValueChange}
					aria-describedby="error"
					name="city"
        />
        {(show && !city) && <FormHelperText id="error">required</FormHelperText>}
      </FormControl>

			<FormControl>
        <InputLabel id="label">State<sup>*</sup></InputLabel>
					<Select
						labelId="label"
						id="select"
						value={stateValue}
						onChange={this.handleChange}>  
					{states.length > 0 && states.map((state, index) => 
			<MenuItem value={state.id} name={state.state_name} key={index}>{state.state_name}</MenuItem>)}
					</Select>
					{(show && !stateValue) && <FormHelperText id="error">required</FormHelperText>}
      </FormControl>
			<FormControl>
        <InputLabel htmlFor="pinCode">Pin code<sup>*</sup></InputLabel>
        <Input
          id="pinCode"
          value={pinCode}
          onChange={this.handleValueChange}
					aria-describedby="pinCode"
					name="pinCode"
        />
        {((show && !pinCode) || pinErrorMessage)  && <FormHelperText id="error">{pinErrorMessage ? pinErrorMessage : 'required'}</FormHelperText>}
      </FormControl>
				<Button variant="contained" color="secondary" className="action-btn" onClick={this.handleSaveBtn}>
					Save Address
				</Button>
			</form>
			<Snackbar
				anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left',
				}}
				open={this.state.open}
				autoHideDuration={60000}
				onClose={this.handleClose}
				message={this.state.message}
				action={
						<IconButton size="small" ariaLabel="close" color="inherit" onClick={this.handleClose}>
								<CloseIcon fontSize="small" />
						</IconButton>
				}></Snackbar>
			</>
		);
	}
}