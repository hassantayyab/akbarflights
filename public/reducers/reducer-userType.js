// import { UserType } from '../actions/userType';
// import { FetchUser } from '../actions/fetchUser';

const initialState = {
  payload: null,
  status: false
}

export default function (state = initialState, action) {
  console.log('in reducer-userType:', action);
  switch (action.type) {
    case 'USER_TYPE_REQUEST':
      console.log('in USER_TYPE_REQUEST:', action);
      // state.payload = action.payload;
      console.log('***payload*** =>', state.payload)
      return Object.assign({}, state, {
        status: action.status,
        payload: action.payload
      })

    case 'USER_TYPE_FETCH':
      console.log('in USER_TYPE_FETCH:', state);
      const data = Object.assign({}, state, {
        status: action.status,
        payload: action.payload
      })
      console.log('***data*** =>', data);
      return data;

    default:
      return state;
  }
}