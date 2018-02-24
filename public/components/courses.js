import React, {Component} from 'react';
import { Link } from 'react-router';

function reload() {
	window.location.reload();
}


class Courses extends Component {
	render(){
		return(
			<div>
				<h1 id="title2" ><img id='img' src="./img/logo.png"/><b>AutoGrader</b></h1>
				<div id="coursesTitle">Your Courses</div>
				<li><a href="/auth/logout">Log out</a></li>
				<Link to="/assignments"><div id="courses"><button className="button"><span>Course 1</span></button></div></Link>
				<Link to="/assignments"><div id="courses"><button className="button"><span>Course 2</span></button></div></Link>
			</div>
		);
	};
};

export default Courses;
