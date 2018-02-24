import axios from 'axios';

var content = "The school fair is right around the corner, and tickets have just gone on sale. Even though you may be busy, you will still want to reserve just one day out of an entire year to relax and have fun with us. Even if you don’t have much money, you don’t have to worry. The school fair is a community event, and therefore prices are kept low. Perhaps, you are still not convinced. Maybe you feel you are too old for fairs, or you just don’t like them. Well, that’s what my grandfather thought, but he came to last year’s school fair and had this to say about it: “I had the best time of my life!” While it’s true you may be able to think of a reason not to come, I’m also sure you can think of several reasons why you must come.  We look forward to seeing you at the school fair!Last week we installed a kitty door so that our cat could come and go as she pleases. Unfortunately, we ran into a problem. Our cat was afraid to use the kitty door. We tried pushing her through, and that caused her to be even more afraid. The kitty door was dark, and she couldn’t see what was on the other side. The first step we took in solving this problem was taping the kitty door open. After a couple of days, she was confidently coming and going through the open door. However, when we removed the tape and closed the door, once again, she would not go through. They say you catch more bees with honey, so we decided to use food as bait. We would sit next to the kitty door with a can of wet food and click the top of the can. When kitty came through the closed door, we would open the can and feed her. It took five days of doing this to make her unafraid of using the kitty door. Now we have just one last problem; our kitty controls our lives!People often install a kitty door, only to discover that they have a problem. The problem is their cat will not use the kitty door. There are several common reasons why cats won’t use kitty doors. First, they may not understand how a kitty door works. They may not understand that it is a little doorway just for them. Second, many kitty doors are dark and cats cannot see to the other side. As such, they can’t be sure of what is on the other side of the door, so they won’t take the risk. One last reason cats won’t use kitty doors is because some cats don’t like the feeling of pushing through and then having the door drag across their back. But don’t worry—there are solutions to this problem."

var initialState = {
	status: "",
  num: 4,
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
        // console.log('in reducer-A:',action.payload);
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
