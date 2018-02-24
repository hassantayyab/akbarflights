import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


class CommentDescription extends Component {
	
	render() {
		return (
			<div>
				<h2 style= {{color: 'red'}}><b><u>{this.props.commentDescription.content}</u></b></h2>
			</div>
		);
	}
}



function mapStateToProps(state){
	return {
		commentDescription: state.commentDescription
	};
}

export default connect(mapStateToProps)(CommentDescription);