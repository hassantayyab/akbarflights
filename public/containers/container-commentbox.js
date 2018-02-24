import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {submit} from '../actions/submit'
import {deleteComment} from '../actions/delete'

class CommentBox extends Component {

	render() {
		if(!this.props.comments) {
			return (<div style={{border: '4px solid black', height : '500px', padding: '10px', color:"green", fontSize:"30px"}}><b><u>No Comments</u></b></div>);
		}
		return (
			<div>

	     	 	<input style={{width:"60%", padding:"8px 0px 8px 8px"}} type="text" required ref="newItem" autoFocus/>
	      		<button style={{padding:"8px 0px 8px 8px", width:"120px", backgroundColor:"red"}} 
	      		onClick={()=>this.props.submit(this.refs.newItem.value)}>Add Comment</button>
	     		<div style={{border: '4px solid black', height : '500px', padding: '10px', margin:"10px 10px 10px 0px"}}>
	      			<ol>
						{this.props.comments}
					</ol>
				</div>
			</div>

		);
	}
}

//Custom functions
function matchDispatchToProps(dispatch){
    return bindActionCreators({
			deleteComment:deleteComment,
			submit: submit
		}, dispatch);
}

function mapStateToProps(state){
	if (state.comments===null) {
		return{
			comments:state.comments
		};
	}
	var list = state.comments.map((comment,index) => {
							return (
								<li key={index}>
									<div className="todo-item">
					          <span style={{color:'green', fontSize:"25px"}} className="item-name"><b>{comment}</b></span>
					          <span style={{color:"red", fontSize:"30px"}} className="item-delete" 
					          onClick={()=>deleteComment(state.comments,comment)}><u> x </u></span>
					        </div>
								</li>
							);
						});
	return {
		comments: list
	};
}

export default connect(mapStateToProps, matchDispatchToProps)(CommentBox);
