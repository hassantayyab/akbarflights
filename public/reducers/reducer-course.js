import axios from 'axios';

const initialState = {
  status: '',
  num: false,
  courses: []
}

var x = []

export default (state = initialState, action) => {
  switch (action.type) {
    case 'COURSE_FETCH_REQUEST':
      // console.log('in COURSE_FETCH_REQUEST =>', action.payload);
      var requested = Object.assign({}, state, {
        status: action.status,
        num: action.payload.num,
        courses: action.payload.courses
      })
      if (action.payload) {
        x = action.payload.courses;
        return requested;
      }
      else
        return state;

    case 'COURSE_FETCH_SUCCESS':
      return Object.assign({}, state, {
        status: action.status,
        courses: action.courses
      })
      // console.log('successful', successful);

    case 'CREATE_COURSE':
      console.log('in CREATE_COURSE:', action.payload);
      x.push(action.payload);
      console.log('x =', x);      
      axios.post('api/courses', { c: x.length, course: x, id: action.id })
        .catch(err => console.log('in axios could not POST COURSES:', err));
        
      return Object.assign({}, state, {
        num: action.id,
        courses: [
          ...state.courses,
          action.payload
        ]
      })

    default:
      return state
  }
}
