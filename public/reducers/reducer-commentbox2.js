import axios from 'axios';

//define the initial state
const initialState = {
	status: "",
	id: 2,
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
			if (initialState.id === action.id) {
				// console.log('in reducer:', action.payload);
				const successful = Object.assign({}, state, {
					status: action.status,
					payload: action.payload
				})
				x = action.payload;
				// console.log('successful', successful);
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
			// console.log("LOGGGG:",action.id,initialState.id);
			if (initialState.id === action.id) {
				x.push(action.payload);
				const submit = Object.assign({}, state, {
					status: action.status,
					payload: x
				})
				// console.log('com of assignment2:', x);
				axios.post('api/ninjas', { ident: 1, com: x, id: action.id }).catch(function (err) {
					console.log('Error');
				});
				return submit;
			}
			return state

		default:
			// console.log('default state:',state);
			return state
	}
}
