import { combineReducers } from 'redux';
import answer from './reducer-answer';
import auth from './reducer-auth';
// import authType from './reducer-userType';
import assignments from './reducer-assignment';
import courses from './reducer-course';
import comment from './reducer-comments';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
	auth,
	assignments,
	courses,
	answer,
	comment,	
	routing: routerReducer
});