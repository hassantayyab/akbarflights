import axios from 'axios';

var content = "Sunset is the time of day when our sky meets the outer space solar winds. There are blue, pink, and purple swirls, spinning and twisting, like clouds of balloons caught in a blender. The sun moves slowly to hide behind the line of horizon, while the moon races to take its place in prominence atop the night sky. People slow to a crawl, entranced, fully forgetting the deeds that still must be done. There is a coolness, a calmness, when the sun does set.The Blue Whales just played their first baseball game of the new season; I believe there is much to be excited about. Although they lost, it was against an excellent team that had won the championship last year. The Blue Whales fell behind early but showed excellent teamwork and came back to tie the game. The team had 15 hits and scored 8 runs. That’s excellent! Unfortunately, they had 5 fielding errors, which kept the other team in the lead the entire game. The game ended with the umpire making a bad call, and if the call had gone the other way, the Blue Whales might have actually won the game. It wasn’t a victory, but I say the Blue Whales look like they have a shot at the championship, especially if they continue to improve.The school fair is right around the corner, and tickets have just gone on sale. We are selling a limited number of tickets at a discount, so move fast and get yours while they are still available. This is going to be an event you will not want to miss! First off, the school fair is a great value when compared with other forms of entertainment. Also, your ticket purchase will help our school, and when you help the school, it helps the entire community. But that’s not all! Every ticket you purchase enters you in a drawing to win fabulous prizes. And don’t forget, you will have mountains of fun because there are acres and acres of great rides, fun games, and entertaining attractions! Spend time with your family and friends at our school fair. Buy your tickets now!"

var initialState = {
	status: "",
  num: 3,
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
