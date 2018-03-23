import axios from 'axios';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectText } from '../actions/select';
import Popup from './container-popup';
import { submit } from '../actions/submit3';
import { deleteComment } from '../actions/delete';
import { FetchSuccess, FetchRequest, FetchFailure } from '../actions/fetch';
import { AnswerFetchSuccess, AnswerFetchRequest, AnswerFetchFailure } from '../actions/fetchAnswer';

var count = 0;
var n = 3;
// var n2 = 'third';
var numb = 1;
var id = 1;

class AnswerBox extends Component {
	constructor(props) {
		super(props)
		this.state = {
			able: true,
			isPopupOpen: false,
			value: this.props.answer.content,
			data: []
		};
	}
	redraw() {
		return { __html: this.state.value };
	}

	apiRequest() {
		axios.get('/api/answer' + '/' + n + '/' + id)
			.then(res => {
				var answer = res.data.answer;
				// 	console.log('in api RequestA:',answer);
				if (answer) {
					numb = res.data.numb;
					this.setState({ value: answer });
					this.props.AnswerFetchSuccess(answer, numb, n, id);
				}
			})
			.catch(e => {
				console.log('In axios.getA:', e);
			});

		axios.get('/api/ninjas' + '/' + n)
			.then(res => {
				var comments = res.data;
				console.log('in api Request:', comments);
				count = comments.length;
				this.props.FetchSuccess(comments, n, id);
			})
			.catch(e => {
				console.log('In axios.get:', e);
			});
	}
	dispatchFetchRequest() {
		this.props.FetchRequest();
		this.props.AnswerFetchRequest();
	}

	componentWillMount() {
		this.apiRequest();
		this.dispatchFetchRequest();
	}

	getList() {
		if (this.props.comments.status != 'error') {
			var comments = this.props.comments.payload
			count = comments.length
			console.log('in getList:', comments);
			var list = comments.map((comment, index) => {
				return (
					<div key={index}>
						<div className="comments">
							<span className="item-name"><b>{comment}</b></span>
						</div>
					</div>
				);
			});
			return list;
		}
		return (
			<div></div>
		);
	}

	render() {
		return (
			<div>
				<button id="addcomment" disabled={this.state.able} onClick={() => this.openPopup()}>Add<br />Comment</button>
				<div id="div" dangerouslySetInnerHTML={this.redraw()} onMouseUp={() => { this.enable(); this.props.selectText(document.getElementById("div"), numb, n, id) }} />
				<Popup isOpen={this.state.isPopupOpen} onClose={() => this.closePopup()}>
					<h1 id="popup-comment">Enter Comment</h1>
					<form>
						<input id="submit-text" type="text" required ref="newItem" autoFocus />
						<input id="submit" type="submit" value="Add Comment" onClick={() => { this.closePopup(event); this.props.submit(this.refs.newItem.value, count, n) }} />
					</form>
				</Popup>
				<div style={{ float: 'right', display: 'inline-block' }}>
					{this.getList()}
				</div>
			</div>
		);
	}

	enable() {
		this.setState({ able: false })
	}

	openPopup() {
		this.setState({ isPopupOpen: true })
	}
	closePopup(event) {
		event.preventDefault();
		this.setState({ isPopupOpen: false, able: true })
	}
}

//<button style={{textAlign:'right', display:'inline-block', float:'right', borderRadius:'50%', backgroundColor:'red'}}>X</button>

function mapStateToProps(state) {
	//console.log('in container:',state.CommentBox3);
	// console.log('in container-A:',state.answer3);
	numb = state.answer3.numb;
	return {
		comments: state.CommentBox3,
		answer: state.answer3
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		selectText: selectText,
		submit: submit,
		deleteComment: deleteComment,
		FetchRequest: FetchRequest,
		FetchSuccess: FetchSuccess,
		FetchFailure: FetchFailure,
		AnswerFetchRequest: AnswerFetchRequest,
		AnswerFetchSuccess: AnswerFetchSuccess,
		AnswerFetchFailure: AnswerFetchFailure
	}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(AnswerBox);
