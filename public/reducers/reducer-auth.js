import { FetchUser } from '../actions/fetchUser';

export default function (state = false, action) {
  // console.log('in reducer-auth:',action);
  switch (action.type) {
    case 'FETCH_USER':
      const requested = Object.assign({}, state, {
        status: action.status
      })
      return action.payload || false;

    default:
      return state;
  }
}