import { combineReducers } from 'redux';
import AnswerReducer from './reducer-answer';
import authReducer from './reducer-auth';
import assignments from './reducer-assignment';
import commentReducer from './reducer-comments';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
	auth: authReducer,
	assignments: assignments,	
	answer: AnswerReducer,
	comment: commentReducer,	
	routing: routerReducer
});