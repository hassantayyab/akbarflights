//define action within an action creator
export const AnswerFetchRequest = () => {
  const FETCH_REQUEST = 'ANSWER_FETCH_REQUEST'
  // console.log('in ANSWER_FETCH_REQUEST');
  return {
    type: FETCH_REQUEST,
    status: "loading"
  }
}

export const AnswerFetchSuccess = (payload,numb,n,id) => {
  const FETCH_SUCCESS = 'ANSWER_FETCH_SUCCESS'
  // console.log('in AnswerFetchSuccess');
  return {
    type: FETCH_SUCCESS,
    status: "success",
    ident: id,
    numb:numb,
    num: n,
    payload
  }
}

export const AnswerFetchFailure = (error) => {
  const FETCH_FAILURE = 'ANSWER_FETCH_FAILURE'
  return {
    type: FETCH_FAILURE,
    status: "error",
    error
  }
}
