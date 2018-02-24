import axios from 'axios';

var content = "There are three reasons why I prefer jogging to other sports. One reason is that jogging is a cheap sport. I can practise it anywhere at any time with no need for a ball or any other equipment. Another reason why I prefer jogging is that it is friendly to my heart. I don’t have to exhaust myself or do excessive efforts while jogging. Finally, I prefer this sport because it is safe. It isn’t as risky as other sports like gymnastics, racing or horseback riding. For all these reasons, I consider jogging the best sport of all.There are three reasons why Canada is one of the best countries in the world. First, Canada has an excellent health care system. All Canadians have access to medical services at a reasonable price. Second, Canada has a high standard of education. Students are taught by well-trained teachers and are encouraged to continue studying at university. Finally, Canada's cities are clean and efficiently managed. Canadian cities have many parks and lots of space for people to live. As a result, Canada is a desirable place to live.Aspirin can be a fatal poison. People are used to taking aspirin whenever they feel pain. It is true that aspirin is an efficacious pain-killer for example in headache cases. However, aspirin is like any other medicine can be dangerously harmful. Any unregulated use of it may result into the damage to the lining of the stomach, prolonged bleeding time, nausea, vomiting, ulcers, liver damage, and hepatitis. It is scientifically proven that excessive use of aspirin turns it into a toxin. Its toxic effects are Kidney Damage, severe metabolic derangements, respiratory and central nervous system effects, strokes, fatal haemorrhages of the brain, intestines & lungs and eventually death. Thus, the careful and regulated use of aspirin is most advisable so as not to turn into a deadly poison."

var initialState = {
	status: "",
  num: 2,
  content: content,
	numb: 1,
  error: ""
}

export default function(state=initialState,action){
	switch (action.type) {
		case 'ANSWER_FETCH_REQUEST':
	    const requested = Object.assign({}, state, {
	      status: action.status
	    })
	    return requested
	  case 'ANSWER_FETCH_SUCCESS':
      if(initialState.num===action.num) {
        //console.log('in reducer-A:',action.payload);
        const successful = Object.assign({}, state, {
          status: action.status,
					numb: action.numb,
          content: action.payload
        })
        // console.log('successful-A',successful);
        return successful
      }
      return state
	  case 'ANSWER_FETCH_FAILURE':
	    const failed = Object.assign({}, state, {
	      status: action.status,
	      error: action.error
	    })
	    return failed
    case 'USER_SELECTED':
			if(initialState.num===action.num) {
				var selected = Object.assign({}, state, {
					num: action.num,
					numb: action.numb,
					content: action.ans
				})
				// console.log('NUMB:', action.numb);
				axios.post('/api/answer',{
					ident:action.ident,
					numb:action.numb,
					ans:action.ans,
					num:action.num
				}).catch(function (err) {
					console.log('Error in Answer Post:',err);
				});
				return selected
			}
			return state
    case 'TR':
      return state
    default:
      return state
  }
}
