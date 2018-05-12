import { combineReducers } from 'redux';
import assignments from './reducer-assignment';
import courses from './reducer-course';
import comment from './reducer-comments';
import query from './reducer-query';
import way from './reducer-form';
import user from './reducer-user';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
	assignments,
	courses,
	comment,
	query,
	way,
	user,
	routing: routerReducer
});