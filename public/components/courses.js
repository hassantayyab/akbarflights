import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';


class Courses extends Component {
	renderContent() {
		console.log('userType:', this.props.userType)
		const list = ['Physics', 'Biology']
		const courses = list.map((course, index) =>
			<li key={index}>
				<Link id='google-btn' className="card-panel hoverable light-blue darken-4 btn" to={`/assignments${index + 1}`}>
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

			</div>
		);
	};
};

function mapStateToProps(state) {
	console.log('state in courses:', state)
	return {
		user: state.auth.payload
	};
}

export default connect(mapStateToProps, null)(Courses);
