import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Assignments extends Component {
	renderContent() {
		const list = ['Assignment 1', 'Assignment 2', 'Assignment 3', 'Assignment 4']
		const assignents = list.map((assignment, index) =>
			<li>
				<Link id='google-btn' className="card-panel hoverable light-blue darken-4 btn" to={`/app${index + 1}`} key={index}><div>{assignment}</div></Link>
			</li>
		);

		return assignents;
	}

	render() {
		return (
			<div>
				{/* <h1 id="title2" ><img id='img' src="./img/logo.png"/><b>AutoGrader</b></h1>
				<div id="mainpagetitle">Your Assignments</div> */}
				<div id="sign-div">
					<div id='div-title'>
						<h4 id='h-title' className='cyan-text text-lighten-5'>
							Assignments
						</h4>
					</div>
					<ul id="content">
						{this.renderContent()}
					</ul>
				</div>

			</div>
		);
	};
};

export default Assignments;
