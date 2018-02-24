import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


class TopHeading extends Component {

	render() {
		return (
			<div>
				<h1 id="title" ><img id="img" src="./img/logo.png"/><b>{this.props.title.heading}</b></h1>
			</div>
		);
	}
}

function mapStateToProps(state){
	return {
		title: state.title
	};
}

export default connect(mapStateToProps)(TopHeading);
