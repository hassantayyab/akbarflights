var x = 0;

export const UserTypeRequest = (who) => {
  console.log('in userTypeRequest who =', who);
  const USER_TYPE_REQUEST = 'USER_TYPE_REQUEST'
  x = who;
  return function (dispatch) {
    dispatch({ type: USER_TYPE_REQUEST, status: false, payload: who });
  };
}

export const UserTypeFetch = () => {
  console.log('in userTypeFetch:');
  const USER_TYPE_FETCH = 'USER_TYPE_FETCH'
  return function (dispatch) {
    dispatch({ type: USER_TYPE_FETCH, status: true, payload: x });
  };
}