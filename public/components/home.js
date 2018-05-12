import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { fetch } from '../actions/fetchUser';
import axios from 'axios';

class Home extends Component {
	handleSubmit(event, data) {
		console.log('in handleSubmit')
		event.preventDefault();

		axios.post('/api/user', data)
			.then(res => {
				// console.log('in home post .then:', res)
				this.props.fetch(data)
			})
			.catch(err => {
				console.log('ERROR in Home post', err)
			});
	}

	render() {
		return (
			<div id='div-contain'>
				<div id='form-div'>
					<form className="col s12">
						{/* first row */}
						<div className="row">

							<div className="col s3">
								<label id='label' htmlFor="username">Username</label>
								<input id='username' ref='username' className="validate" type="text" required="required" />
							</div>
							<div className="col"></div>

							<div className="col s3">
								<label id='label' htmlFor="passwords">Password</label>
								<input id='passwords' ref='password' className="validate" type="password" required="required" />
							</div>
							<div className="col"></div>

							<div className="col s1">
								<label id='label' htmlFor="multiplier">Multiplier</label>
								<input id='multiplier' ref='multiplier' className="validate" type="number" required="required" />
							</div>
							<div className="col"></div>

							{/* submit button */}
							<div className="col">
								<input type='submit' value='submit' id='google-btn' className="card-panel hoverable purple darken-4 btn" onClick={(e) => { this.handleSubmit(e, [this.refs.username.value, this.refs.password.value, this.refs.multiplier.value]) }} />
							</div>

						</div>
					</form>
				</div>
			</div>
		);
	};
};

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		fetch,
	}, dispatch);
}

export default connect(null, matchDispatchToProps)(Home);