const initialState = {
  status: 'empty',
  username: null,
  password: null,
  multiplier: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH':
      // console.log('action in reducer-user:', action)
      return Object.assign({}, state, {
        status: action.status,
        username: action.username,
        password: action.password,
        multiplier: action.multiplier
      })

    default:
      return state
  }
}
