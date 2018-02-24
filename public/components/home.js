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
				<Link to="/login"><div id="login"><button className="button"><span>Login as Student</span></button></div></Link>
				<Link to="/login"><div id="login"><button className="button"><span>Login as Instructor</span></button></div></Link>
			</div>
		);
	};
};

export default Login;
