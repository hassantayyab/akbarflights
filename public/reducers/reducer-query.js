const initialState = {
  status: 'empty',
  frm: '',
  to: '',
  flightsFrm: null,
  flightsTo: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SUBMIT':
    // console.log('action in reducer-query:', action)
      return Object.assign({}, state, {
        status: action.status,
        frm: action.frm,
        to: action.to,
        flightsFrm: [action.payloadf],
        flightsTo: action.payloadt!=null? [action.payloadt] : null
      })

    default:
      return state
  }
}
