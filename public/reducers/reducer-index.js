import { combineReducers } from 'redux';
import query from './reducer-query';
import way from './reducer-form';
import user from './reducer-user';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
	query,
	way,
	user,
	routing: routerReducer
});