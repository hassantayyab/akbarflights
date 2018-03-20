import axios from 'axios';
// import { FETCH_USER } from './types';

export const FetchUser = () => async dispatch => {
  const FETCH_USER = 'FETCH_USER'
  const res = await axios.get('/auth/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
}