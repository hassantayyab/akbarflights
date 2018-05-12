const initialState = {
  status: 'empty',
  n: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FORM':
      // console.log('action in reducer-form:', action)
      return Object.assign({}, state, {
        status: action.status,
        n: action.payload
      })

    default:
      return state
  }
}
