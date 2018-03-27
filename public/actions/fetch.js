//define action within an action creator
export const FetchRequest = () => {
  const FETCH_REQUEST = 'FETCH_REQUEST'
  // console.log('in FETCH_REQUEST');
  return {
    type: FETCH_REQUEST,
    status: "loading"
  }
}

export const FetchSuccess = (comment, id) => {
  const FETCH_SUCCESS = 'FETCH_SUCCESS'
  // console.log('in FetchSuccess');
  return {
    type: FETCH_SUCCESS,
    status: "success",
    // num: n,
    id,
    comment
  }
}

export const FetchFailure = (error) => {
  const FETCH_FAILURE = 'FETCH_FAILURE'
  return {
    type: FETCH_FAILURE,
    status: "error",
    error
  }
}
