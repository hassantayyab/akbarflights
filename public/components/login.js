import React, {Component} from 'react';
import { Link } from 'react-router';

function reload() {
	window.location.reload();
}


class Login extends Component {
	render(){
		return(
			<div>
				<h1 id="title2" ><img id='img' src="./img/logo.png"/><b>AutoGrader</b></h1>
				<div id="loginTitle">Login</div>
				<h1>Choose Login Option</h1>
				<a class="google-btn" href="/auth/google">Google+</a>
			</div>
		);
	};
};

export default Login;
