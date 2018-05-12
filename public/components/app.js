import axios from 'axios';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Popup from './container-popup';
import { submit } from '../actions/submit';
import { form } from '../actions/form';
import { fetch } from '../actions/fetchUser';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isPopupOpen: false,
			username: null,
			password: null,
			multiply: null,
			n: 1,
			error: '',
			formError: ''
		};
	}

	componentDidMount() {
		this.setState({ n: 1 });
		this.handleClick(1);
		this.fetchUser();
	}

	fetchUser() {
		axios.get('api/user')
			.then(res => {
				const user = res.data;
				console.log('in api fetchUser:', user);
				if (!user) {
					this.openPopup();
				}
				// this.props.fetch(user);
				this.setState({
					username: user.username,
					password: user.password,
					multiply: user.multiplier
				})
			})
			.catch(e => {
				console.log('In axios.get:', e);
			})
	}

	handleClick(n) {
		this.setState({ 
			n: n,
			error: ''
		 })
		this.props.form(n);
	}

	handleUserSubmit(event, data) {
		console.log('in handleUserSubmit', data)
		event.preventDefault();

		if (data[0].length < 1 || data[1].length < 1 || data[2] == 0) {
			this.setState({
				formError: 'Missing Fields!'
			})
			return;
		}
		this.closePopup();

		axios.post('/api/user', data)
			.then(res => {
				// console.log('in home post .then:', res)
				// this.props.fetch(data)
				this.setState({
					username: data[0],
					password: data[1],
					multiply: data[2]
				})
			})
			.catch(err => {
				console.log('ERROR in Home post', err)
			});
	}

	handleSubmit(event, data) {
		event.preventDefault();
		switch (data[4]) {
			case 'Economy':
				data[4] = 'E'
				break;
			case 'Business':
				data[4] = 'B'
				break;
			case 'First Class':
				data[4] = 'F'
				break;
			case 'Premium Economy':
				data[4] = 'PE'
				break;
			default:
				break;
		}

		if (data[8] == 1 && (data[0].length < 1 || data[1].length < 1 || data[2].length < 9)) {
			this.setState({
				error: 'Missing Fields!'
			})
			return;
		}
		else if (data[8] == 2 && (data[0].length < 1 || data[1].length < 1 || data[2].length < 1 || data[3].length < 9)) {
			this.setState({
				error: 'Missing Fields!'
			})
			return;
		}
		this.setState({ error: '' })
		
		data.push(this.state.username, this.state.password);
		this.props.submit(null, null, data[0], data[1])

		axios.get('/api/submit' + '/' + data, {
			timeout: 9999999999999,
			maxContentLength: 9999999999,
		})
			.then(res => {
				// console.log('returned data from Python script in reducer = ', res.data);
				var flight = res.data;
				// console.log('DATA======>',res.data);
				const key1 = Object.keys(flight)[0];
				const key2 = Object.keys(flight)[1];
				if (data[8] == 1) {
					this.props.submit(null, flight[key1], data[0], data[1]);
				}
				else if (data[8] == 2) {
					this.props.submit(flight[key2], flight[key1], data[0], data[1]);
				}
			})
			.catch(err => {
				console.log('ERROR in get handleSubmit', err)
			});
	}

	getOptions(n) {
		let adults = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		let children = [0, 1, 2, 3, 4, 5, 6, 7, 8];
		let infant = [0, 1];

		switch (n) {
			case 1:
				var list = adults.map((el, index) => { return (<option key={index}>{el}</option>) })
				break;
			case 2:
				var list = children.map((el, index) => { return (<option key={index}>{el}</option>) })
				break;
			case 3:
				var list = infant.map((el, index) => { return (<option key={index}>{el}</option>) })
				break;
			default:
				break;
		}
		return list
	}

	getFlightsTo() {
		console.log('in getFlightsTo:', this.props.flightsTo);
		var list = [
			<li id="label-div" className="collection-item">
				{this.props.frm + ' to ' + this.props.to}
			</li>
		]
		if (this.props.status == 'empty' || this.props.status == 'loading') {
			console.log('in if')
			return null;
		}
		console.log('after if')
		this.props.flightsTo.forEach(element => {
			{
				list.push(
					element.map((el, index) =>
						<li id="results-div" key={index} className="collection-item avatar">
							<img src={String(el[1])} alt="" />
							<span className="title">	{el[0]}</span>
							<p>Departure: {el[2]}</p>
							<p>Flight Duration: {el[3]}</p>
							<p>Flight Arrival: {el[4]}</p>
							<p>Flight Fare: <span id='currency'>BDT {parseInt(Number(el[5].substr(4)) * this.state.multiply)}</span></p>
						</li>
					)
				)
			}
		});
		console.log('list=', list)
		return (
			<ul className="collection">
				{list}
			</ul>
		);
	}
	getFlightsFrm() {
		var list = [
			<li id="label-div" className="collection-item">
				{this.props.to + ' to ' + this.props.frm}
			</li>
		]
		if (this.props.status != 'two') {
			console.log('in flightsFrm if')
			return null;
		}
		console.log('after flightsFrm if')
		this.props.flightsFrm.forEach(element => {
			{
				list.push(
					element.map((el, index) =>
						<li id="results-div" key={index} className="collection-item avatar">
							<img src={String(el[1])} alt="" />
							<span className="title">	{el[0]}</span>
							<p>Departure: {el[2]}</p>
							<p>Flight Duration: {el[3]}</p>
							<p>Flight Arrival: {el[4]}</p>
							<p>Flight Fare: <span id='currency'>BDT {parseInt(Number(el[5].substr(4)) * this.state.multiply)}</span></p>
						</li>
					)
				)
			}
		});
		return (
			<ul className="collection">
				{list}
			</ul>
		);
	}

	getWay() {
		if (this.props.n == 1) {
			return false;
		}
		else {
			return false;
		}
	}

	getUserForm() {
		return (
			<div id='user-div'>
				<form className="col s12">
					{/* first row */}
					<div className="row">

						<div className="col s4">
							<label id='label' htmlFor="username">Username</label>
							<input id='username' ref='username' className="validate" type="text" required="required" />
						</div>
						<div className="col"></div>

						<div className="col s4">
							<label id='label' htmlFor="passwords">Password</label>
							<input id='passwords' ref='password' className="validate" type="password" required="required" />
						</div>
						<div className="col"></div>

						<div className="col s2">
							<label id='label' htmlFor="multiplier">Multiplier</label>
							<input id='multiplier' ref='multiplier' className="validate" type="text" required="required" />
						</div>

					</div>

					<div className="row">
						{/* submit button */}
						<div className="col s2">
							<input type='submit' value='submit' id='google-btn' className="card-panel hoverable purple darken-4 btn" onClick={(e) => { this.handleUserSubmit(e, [this.refs.username.value, this.refs.password.value, Number(this.refs.multiplier.value)]) }} />
						</div>
						<div className="col s2"></div>
						{/* Form Error */}
						<div className='col s4'>
							{this.getError(1)}
						</div>
						{/* change button */}
						{/* <div className="col s2">
							<input type='submit' value='change' id='google-btn' className="card-panel hoverable purple darken-4 btn" onClick={(e) => { this.closePopup(e); this.handleUserSubmit(e, [this.refs.username.value, this.refs.password.value, this.refs.multiplier.value]) }} />
						</div> */}
					</div>
				</form>
			</div>
		);
	}

	getLoading() {
		if (this.props.status == 'loading') {
			return (
				<div id='loading-contain'>
					{/* bar loading */}
					<div className="progress">
						<div className="indeterminate"></div>
					</div>	
				</div>
			);
		}
	}

	getError(n) {
		if (n == 2) {
			return (
				<p id='error'>{this.state.error}</p>
			);
		}
		else if (n == 1) {
			return (
				<p id='form-error'>{this.state.formError}</p>
			);
		}
	}

	render() {
		return (
			<div id='div-contain'>
				<Popup isOpen={this.state.isPopupOpen} onClose={() => this.closePopup(event)}>
					{this.getUserForm()}
				</Popup>
				<div id='form-div'>
					<form className="col s12">
						{/* options row */}
						<div className="row">
							<div className="col s2">
								<button onClick={() => this.handleClick(1)} className="btn waves-effect waves-light btn-small" value="oneway" type="button">One Way</button>
							</div>

							<div className="col s2">
								<button onClick={() => this.handleClick(2)} className="btn waves-effect waves-light btn-small" value="twoway" type="button">Two Way</button>
							</div>

							<div className="col s2">
								<button onClick={() => this.openPopup()} className="btn waves-effect waves-light btn-small" value="twoway" type="button">User Info</button>
							</div>
						</div>
						<br />
						{/* first row */}
						<div className="row">
							<div className="col s3">
								<label id='label' htmlFor="frm">Flying From</label>
								<input id='frm' ref='frm' className="validate" type="text" />
							</div>
							<div className="col"></div>

							<div className="col s3">
								<label id='label' htmlFor="to">Flying To</label>
								<input id='to' ref='to' className="validate" type="text" />
							</div>
							<div className="col"></div>

							{/* DropDowns */}
							<div className='pure-form pure-form-stacked'>
								<div className="col s2">
									<label id='label' htmlFor="travelClass">Travel Class</label>
									<select id="travelClass">
										<option>Economy</option>
										<option>Business</option>
										<option>First Class</option>
										<option>Premium Economy</option>
									</select>
								</div>
								<div className="col"></div>

								<div className="col s1">
									<label id='label' htmlFor="adult">Adult</label>
									<select id="adult">
										{this.getOptions(1)}
									</select>
								</div>

								<div className="col s1">
									<label id='label' htmlFor="children">Childen</label>
									<select id="children">
										{this.getOptions(2)}
									</select>
								</div>

								<div className="col s1">
									<label id='label' htmlFor="infant">Infant</label>
									<select id="infant">
										{this.getOptions(3)}
									</select>
								</div>
							</div>
						</div>
						{/* second row */}
						<div className="row">
							<div className="col s3">
								<label id='label' htmlFor="departDate">Departs on</label>
								<input className="validate" id='departDate' ref='departDate' type='date' label='Departs on' />
							</div>
							<div className="col"></div>

							<div className="col s3">
								<label id='label' htmlFor="returnDate">Returns on</label>
								<input disabled={this.props.way.n === 1 ? true : false} className="validate" id='returnDate' ref='returnDate' type='date' label='Returns on' />
							</div>
							<div className="col"></div>

							<div className="col">
								<input type='submit' id='google-btn' className="card-panel hoverable purple darken-4 btn" value='search' onClick={(e) => { this.handleSubmit(e, [this.refs.frm.value, this.refs.to.value, this.refs.departDate.value, this.refs.returnDate.value, document.getElementById('travelClass').value, document.getElementById('adult').value, document.getElementById('children').value, document.getElementById('infant').value, this.props.way.n]) }} />
							</div>
							<div className="col"></div>
							{/* Form Error */}
							<div className='col s2'>
								{this.getError(2)}
							</div>
						</div>

					</form>
				</div>

				{/* loading animation */}
				{this.getLoading()}
				{/* Display Searched Results */}
				<div className="row">
					<div className="col s6">
						{this.getFlightsTo()}
					</div>
					<div className="col s6">
						{this.getFlightsFrm()}
					</div>
				</div>

			</div>
		);
	}

	openPopup() {
		this.setState({ isPopupOpen: true })
	}

	closePopup() {
		// event.preventDefault();
		this.setState({ 
			isPopupOpen: false,
			formError: '' 
		})
	}

};

function mapStateToProps(state) {
	console.log('in mapStateToProps:', state.query.flightsTo);
	return {
		status: state.query.status,
		frm: state.query.frm,
		to: state.query.to,
		flightsTo: state.query.flightsTo,
		flightsFrm: state.query.flightsFrm,
		way: state.way,
		multiply: state.user.multiplier
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		submit,
		form,
		fetch,
	}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(App);
