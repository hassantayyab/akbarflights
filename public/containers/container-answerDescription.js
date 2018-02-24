import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


class AnswerDescription extends Component {

	render() {
		return (
			<div id="answer">
				<h2><b>{this.props.answerDescription.content}</b></h2>
			</div>
		);
	}
}



function mapStateToProps(state){
	return {
		answerDescription: state.answerDescription
	};
}

export default connect(mapStateToProps)(AnswerDescription);
