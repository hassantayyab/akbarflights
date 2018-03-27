import axios from 'axios';
// import { FETCH_USER } from './types';

export const FetchUser = () => {
  const FETCH_USER = 'FETCH_USER'
  // console.log('in fetchUser action')
  return function (dispatch) {
    axios
      .get('/auth/current_user')
      .then(res => dispatch({ type:'FETCH_USER', payload: res.data }))
      .catch(err => console.log('in axios could not fetch User:', err));
  };
}