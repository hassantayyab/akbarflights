import axios from 'axios';

var initialState = {
  status: 'empty',
  // comCount: [0, 0, 0, 0],
  comments: [[], [], [], []]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      const requested = Object.assign({}, state, {
        status: action.status
      })
      return requested

    case 'FETCH_SUCCESS':
      // console.log('in reducer:', action.comment);
      state.comments[action.id -1] = action.comment;
      return Object.assign({}, state, {
        status: action.status
      })

    case 'USER_SUBMITTED':
      state.comments[action.id - 1].push(action.comment);
      axios.post('api/ninjas', { com: state.comments[action.id - 1], id: action.id })
        .catch((err) => {
          console.log('Error');
        });
      // console.log("action.comment:", action.comment);
      return state

    default:
      return state
  }
}
