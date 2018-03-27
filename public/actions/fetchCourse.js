import axios from 'axios';

//define action within an action creator
export const CourseFetchRequest = (user) => {
  const FETCH_REQUEST = 'COURSE_FETCH_REQUEST'
  // console.log('in COURSE_FETCH_REQUEST');
  return (dispatch) => {
    axios
      .get('/api/courses' + '/' + user.googleId)
      .then(res => dispatch({ type: FETCH_REQUEST, status: "loading", payload: res.data }))
      .catch(err => console.log('ERROR in axios.get courses:', err));
  };
}

export const CourseFetchSuccess = (courses, c, id) => {
  const FETCH_SUCCESS = 'COURSE_FETCH_SUCCESS'
  // console.log('in COURSEFetchSuccess');
  return {
    type: FETCH_SUCCESS,
    status: "success",
    id,
    c,
    courses
  }
}

export const CourseFetchFailure = (error) => {
  const FETCH_FAILURE = 'COURSE_FETCH_FAILURE'
  return {
    type: FETCH_FAILURE,
    status: "error",
    error
  }
}