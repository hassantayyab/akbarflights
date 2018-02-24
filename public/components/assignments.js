import React, {Component} from 'react';
import { Link } from 'react-router';

function reload() {
	window.location.reload();
}


class Assignments extends Component {
	render(){
		return(
			<div>
				<h1 id="title2" ><img id='img' src="./img/logo.png"/><b>AutoGrader</b></h1>
				<div id="mainpagetitle">Your Assignments</div>
				<li><a href="/auth/logout">Log out</a></li>
				<Link to="/app"><div id="mainpage"><button className="button"><span>Assignment 1</span></button></div></Link>
				<Link to="/app2"><div id="mainpage"><button className="button"><span>Assignment 2</span></button></div></Link>
				<Link to="/app3"><div id="mainpage"><button className="button"><span>Assignment 3</span></button></div></Link>
				<Link to="/app4"><div id="mainpage"><button className="button"><span>Assignment 4</span></button></div></Link>
			</div>
		);
	};
};

export default Assignments;
