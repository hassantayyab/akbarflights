import axios from 'axios';

const initialState = {
  assignments: [
    ['Assignment 1', 'Assignment 2'],
    ['Assignment 1', 'Assignment 2', 'Assignment 3']
  ]
}

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}
