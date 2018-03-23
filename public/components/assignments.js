import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Assignments extends Component {
	renderContent() {
		// console.log('ownProps:', this.props.id);
		// console.log('assignments:', this.props.assignments);
		const list = this.props.assignments[this.props.id-1].map((assignment, index) =>
			<li key={index}>
				<Link id='google-btn' className="card-panel hoverable light-blue darken-4 btn" to={`/app${index + 1}`}>{assignment}</Link>
			</li>
		);

		return list;
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

function mapStateToProps(state, ownProps) {
	// console.log('ownProps:', ownProps.match.params.filter);
	
	return {
		assignments:state.assignments.assignments,
		id: ownProps.match.params.filter
	};
}

export default connect(mapStateToProps)(Assignments);
