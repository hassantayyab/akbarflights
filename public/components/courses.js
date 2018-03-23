import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class Courses extends Component {
	renderContent() {
		const list = ['Physics', 'Biology']
		const courses = list.map((course, index) =>
			<li key={index}>
				<Link id='google-btn' onClick={console.log('you clicked!')} className="card-panel hoverable light-blue darken-4 btn" to={`/assignments${index+1}`}>
					{course}
				</Link>
			</li>
		);

		return courses;
	}

	render() {
		return (
			<div>

				<div id="sign-div">
					<div id='div-title'>
						<h4 id='h-title' className='cyan-text text-lighten-5'>
							Courses
						</h4>
					</div>
					<ul id="content">
						{this.renderContent()}
					</ul>
				</div>

				{/* <div id="coursesTitle">Your Courses</div>
				<div>
					{this.renderContent()}
				</div> */}

			</div>
		);
	};
};

export default Courses;
