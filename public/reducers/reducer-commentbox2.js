import axios from 'axios';

//define the initial state
const initialState = {
	status: "",
	num: 2,
	payload: [],
	error: ""
}
var x = [];
var y = [];

export default function (state = initialState, action) {
	switch (action.type) {
		case 'FETCH_REQUEST':
			const requested = Object.assign({}, state, {
				status: action.status
			})
			return requested
		case 'FETCH_SUCCESS':
			if (initialState.num === action.num) {
				console.log('in reducer:', action.payload);
				const successful = Object.assign({}, state, {
					status: action.status,
					payload: action.payload
				})
				x = action.payload;
				console.log('successful', successful);
				return successful
			}
			return state
		case 'FETCH_FAILURE':
			const failed = Object.assign({}, state, {
				status: action.status,
				error: action.error
			})
			return failed
		case 'USER_SUBMITTED':
			// console.log("LOGGGG:",action.num,initialState.num);
			if (initialState.num === action.num) {
				x.push(action.payload);
				const submit = Object.assign({}, state, {
					status: action.status,
					payload: x
				})
				console.log('com of assignment2:', x);
				axios.post('api/ninjas', { ident: 1, com: x, num: action.num }).catch(function (err) {
					console.log('Error');
				});
				return submit;
			}
			return state
		case 'USER_DELETED':
			console.log('user-deleted:', action.payload);
			return action.payload;
		default:
			// console.log('default state:',state);
			return state
	}
}
