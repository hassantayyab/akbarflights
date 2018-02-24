import axios from 'axios';

var content = 'On July 16, 1969, the Apollo 11 spacecraft launched from the Kennedy Space Center in Florida. Its mission was to go where no human being had gone before\u2014the moon! The crew consisted of Neil Armstrong, Michael Collins, and Buzz Aldrin. The spacecraft landed on the moon in the Sea of Tranquility, a basaltic flood plain, on July 20, 1969. The moonwalk took place the following day. On July 21, 1969, at precisely 10:56 EDT, Commander Neil Armstrong emerged from the Lunar Module and took his famous first step onto the moon\u2019s surface. He declared, \u201CThat\u2019s one small step for man, one giant leap for mankind.\u201D It was a monumental moment in human history!It was July 21, 1969, and Neil Armstrong awoke with a start. It was the day he would become the first human being to ever walk on the moon. The journey had begun several days earlier, when on July 16th, the Apollo 11 launched from Earth headed into outer space. On board with Neil Armstrong were Michael Collins and Buzz Aldrin. The crew landed on the moon in the Sea of Tranquility a day before the actual walk. Upon Neil\u2019s first step onto the moon\u2019s surface, he declared, \u201CThat\u2019s one small step for man, one giant leap for mankind.\u201D It sure was!Here is the perfect system for cleaning your room. First, move all of the items that do not have a proper place to the center of the room. Get rid of at least five things that you have not used within the last year. Take out all of the trash, and place all of the dirty dishes in the kitchen sink. Now find a location for each of the items you had placed in the center of the room. For any remaining items, see if you can squeeze them in under your bed or stuff them into the back of your closet. See, that was easy!Oceans and lakes have much in common, but they are also quite different. Both are bodies of water, but oceans are very large bodies of salt water, while lakes are much smaller bodies of fresh water. Lakes are usually surrounded by land, while oceans are what surround continents. Both have plants and animals living in them. The ocean is home to the largest animals on the planet, whereas lakes support much smaller forms of life. When it is time for a vacation, both will make a great place to visit and enjoy.The Blue Whales just played their first baseball game of the new season; I believe there is much to be excited about. Although they lost, it was against an excellent team that had won the championship last year. The Blue Whales fell behind early but showed excellent teamwork and came back to tie the game. The team had 15 hits and scored 8 runs. That\u2019s excellent! Unfortunately, they had 5 fielding errors, which kept the other team in the lead the entire game. The game ended with the umpire making a bad call, and if the call had gone the other way, the Blue Whales might have actually won the game. It wasn\u2019t a victory, but I say the Blue Whales look like they have a shot at the championship, especially if they continue to improve.'

var initialState = {
	status: "",
  num: 1,
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
